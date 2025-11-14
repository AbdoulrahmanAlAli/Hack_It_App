import {
  BadRequestError,
  UnauthorizedError,
} from "../../../middlewares/handleErrors";
import { IAdmin } from "../../../models/users/admins/dtos";
import {
  Admin,
  validateLoginAdmin,
} from "../../../models/users/admins/Admin.model";
import { generateJWT } from "../../../utils/generateToken";
import bcrypt from "bcrypt";

class AuthAdminService {
  // ~ Post => /api/hackit/ctrl/admin/login ~ Login Admin
  static async loginAdmin(loginData: { email: string; password: string }) {
    const { error } = validateLoginAdmin(loginData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const admin = await Admin.findOne({
      email: loginData.email,
    });
    if (!admin) {
      throw new UnauthorizedError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      admin.password
    );
    console.log(isPasswordValid);
    console.log({ loginData: loginData.password });
    console.log({ admin: admin.password });

    if (!isPasswordValid) {
      throw new UnauthorizedError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    const token = generateJWT({
      id: admin.id,
      role: "admin",
    });

    return {
      message: "تم تسجيل الدخول بنجاح",
      token,
    };
  }
}

export { AuthAdminService };
