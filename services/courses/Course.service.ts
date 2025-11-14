import { BadRequestError, NotFoundError } from "../../middlewares/handleErrors";
import { ICourse } from "../../models/courses/dtos";
import {
  Course,
  validateCreateCourse,
  validateUpdateCourse,
} from "../../models/courses/Course.model";
import { ICloudinaryFile } from "../../utils/types";
import { Comment } from "../../models/courses/comment/Comment.model";
import { Session } from "../../models/courses/session/Session.model";
import { Teacher } from "../../models/users/teachers/Teacher.model";
import { Exam } from "../../models/courses/exam/Exam.model";
import mongoose from "mongoose";
import { Student } from "../../models/users/students/Student.model";

class CtrlCourseService {
  // ~ POST /api/hackit/ctrl/course - Create a new course
  static async createCourse(courseData: ICourse, file: ICloudinaryFile) {
    // Validate course data
    const { error } = validateCreateCourse(courseData);
    if (error) throw new BadRequestError(error.details[0].message);

    if (!file) {
      throw new BadRequestError("صورة الكورس مطلوبة");
    }

    const existingCourse = await Course.findOne({ name: courseData.name });
    if (existingCourse) {
      throw new BadRequestError("الكورس موجود بالفعل");
    }

    if (courseData.free) {
      courseData.price = 0;
    }

    const teacherHave = await Teacher.findById(courseData.teacher);
    if (!teacherHave) {
      throw new NotFoundError("المعلم غير موجود");
    }

    // Create new course
    const course = await Course.create({
      ...courseData,
      discount: {
        dis: courseData.discount.dis,
        rate: courseData.discount.dis ? courseData.discount.rate : 0,
      },
      image: file.path,
    });

    if (!course) throw new NotFoundError("فشل إنشاء الكورس");

    return {
      message: "تم إنشاء الكورس بنجاح",
    };
  }

  // ~ GET /api/hackit/ctrl/course/:id - Get course by ID
  static async getCourseById(id: string, studentId: string, role: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundError("معرف الكورس غير صالح");
    }

    const course = await Course.findById(id)
      .populate("teacher", "name specialization profilePhoto")
      .populate({
        path: "sessions",
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "exams",
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "comments",
        populate: {
          path: "studentId",
          select: "userName profilePhoto",
        },
        options: { sort: { createdAt: -1 } },
      })
      .populate("students", "userName profilePhoto")
      .lean();

    if (!course) throw new NotFoundError("الكورس غير موجود");

    // Check if student is enrolled in the course
    let isEnrolled = false;

    if (role === "student") {
      if (!studentId) {
        throw new BadRequestError("معرف الطالب مطلوب");
      }

      const student = await Student.findById(studentId).select(
        "enrolledCourses"
      );
      if (!student) {
        throw new NotFoundError("الطالب غير موجود");
      }

      // Check if the course ID exists in student's enrolledCourses array
      isEnrolled = student.enrolledCourses.some(
        (enrolledCourseId) => enrolledCourseId.toString() === id
      );

      if (!isEnrolled) {
        throw new BadRequestError(
          "عذراً، يجب شراء الكورس أولاً للوصول إلى المحتوى"
        );
      }
    }

    const sessions = course.sessions || [];
    const exams = course.exams || [];

    const teacherId =
      (course.teacher as any)._id?.toString() ||
      (course.teacher as any).toString();

    const teacherStats = await this.calculateTeacherStats(teacherId);

    // إصلاح الخطأ والترتيب من الأقدم للأحدث
    const allActivities = [
      ...sessions.map((session) => ({
        ...session,
        type: "session" as const,
      })),
      ...exams.map((exam) => ({
        ...exam,
        type: "exam" as const,
      })),
    ].sort((a, b) => {
      // التحقق من وجود createdAt واستخدامه للترتيب
      const dateA = new Date((a as any).createdAt).getTime();
      const dateB = new Date((b as any).createdAt).getTime();
      return dateA - dateB; // من الأقدم إلى الأحدث
    });

    // إزالة sessions و exams من النتيجة
    const { sessions: _, exams: __, ...courseWithoutArrays } = course as any;

    const courseWithStats = {
      ...courseWithoutArrays,
      studentsCount: course.students?.length || 0,
      sessionsCount: sessions.length,
      examsCount: exams.length,
      commentsCount: course.comments?.length || 0,
      teacherRating: teacherStats.averageRating,
      discountedPrice:
        course.discount?.dis && course.discount?.rate
          ? course.price * (1 - course.discount.rate / 100)
          : course.price,
      isDiscounted: course.discount?.dis || false,
      sessionsAndExams: allActivities,
    };

    return courseWithStats;
  }

  // ~ GET /api/hackit/ctrl/course - Get all courses
  static async getAllCourses(queryParams: {
    name?: string;
    type?: "نظري" | "عملي";
    hasDiscount?: boolean;
    year?: number;
    semester?: number;
    createdLessThanDays?: number;
  }) {
    const { name, type, hasDiscount, year, semester, createdLessThanDays } =
      queryParams;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (type) filter.type = type;
    if (hasDiscount !== undefined) filter["discount.dis"] = hasDiscount;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;

    if (createdLessThanDays) {
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - createdLessThanDays);
      filter.createdAt = { $gte: dateThreshold };
    }

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .select("-__v")
      .populate("teacher");

    return courses;
  }

  // ~ PUT /api/hackit/ctrl/course/:id - Update course
  static async updateCourse(id: string, courseData: Partial<ICourse>) {
    const { error } = validateUpdateCourse(courseData);
    if (error) throw new BadRequestError(error.details[0].message);

    if (courseData.free === true) {
      courseData.price = 0;
    } else if (courseData.free === false && courseData.price === 0) {
      throw new BadRequestError("لا يمكن أن يكون الكورس مدفوعاً وسعره صفر");
    }

    if (courseData.discount?.dis && !courseData.discount.rate) {
      throw new BadRequestError("نسبة التخفيض مطلوبة عندما يكون هناك تخفيض");
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, courseData, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!updatedCourse) throw new NotFoundError("فشل تحديث الكورس");

    return {
      message: "تم تحديث الكورس بنجاح",
    };
  }

  // ~ DELETE /api/hackit/ctrl/course/:id - Delete course
  static async deleteCourse(id: string) {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) throw new NotFoundError("فشل حذف الكورس");
    return { message: "تم حذف الكورس بنجاح" };
  }

  // ~ PUT /api/hackit/ctrl/course/imagecourse/:id - Update course image
  static async updateCourseImage(file: ICloudinaryFile, id: string) {
    if (!file) throw new BadRequestError("صورة الكورس مطلوبة");

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: { image: file.path } },
      { new: true }
    );

    if (!updatedCourse) throw new NotFoundError("فشل تحديث صورة الكورس");

    return { message: "تم تحديث صورة الكورس بنجاح" };
  }

  // Calculate Teacher Stats
  static async calculateTeacherStats(teacherId: string) {
    const teacherCourses = await Course.find({ teacher: teacherId });

    if (teacherCourses.length === 0) {
      return {
        averageRating: 0,
      };
    }

    const totalRating = teacherCourses.reduce(
      (sum, course) => sum + (course.rating || 0),
      0
    );
    const averageRating = totalRating / teacherCourses.length;

    return {
      averageRating: Math.round(averageRating * 10) / 10,
    };
  }
}

export { CtrlCourseService };
