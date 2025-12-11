export const html = (otp: string) => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>رمز التحقق - هكرها</title>
  <style>
    /* إعادة تعيين CSS للأمان في البريد الإلكتروني */
    * {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      direction: rtl;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      background-color: #f3f4f8;
      -webkit-font-smoothing: antialiased;
    }
    
    table {
      border-spacing: 0;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    
    a {
      color: #073b74;
      text-decoration: none;
    }
    
    /* الألوان */
    :root {
      --primary-color: #073b74;
      --secondary-color: #f0f7ff;
      --text-dark: #222b35;
      --text-medium: #444c58;
      --text-light: #555c67;
      --text-muted: #818896;
      --border-color: #e1e5eb;
      --background-light: #f9fafc;
      --background-page: #f3f4f8;
    }
    
    /* الحاوية الرئيسية */
    .email-container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0,0,0,0.07);
    }
    
    /* الهيدر */
    .header {
      background-color: #073b74;
      padding: 5px 0 15px;
      text-align: center;
    }
    
    .logo-container {
      width: 290px;
      height: 290px;
      margin: 0 auto;
      padding: 10px;
    }
    
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }
    
    /* المحتوى */
    .content {
      padding: 35px 30px;
    }
    
    .title {
      text-align: center;
      font-size: 26px;
      font-weight: 700;
      color: #222b35;
      margin-bottom: 16px;
      line-height: 1.4;
    }
    
    .description {
      text-align: center;
      font-size: 15.5px;
      line-height: 1.7;
      color: #555c67;
      margin-bottom: 32px;
      padding: 0 10px;
    }
    
    /* صندوق التحقق */
    .verification-box {
      border: 1px solid #e1e5eb;
      border-radius: 16px;
      padding: 28px 20px;
      margin: 30px 0;
      background-color: #f9fafc;
      text-align: center;
    }
    
    .verification-label {
      font-size: 18px;
      color: #222b35;
      font-weight: 700;
      margin-bottom: 22px;
      display: block;
    }
    
    .verification-code {
      cursor: pointer;
      margin: 10px auto;
      text-align: center;
      width: 100%;
      max-width: 320px;
    }
    
    .code-number {
      color: #073b74;
      font-size: 24px;
      font-weight: 800;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      background-color: #f0f7ff;
      border: 2px dashed #073b74;
      padding: 22px 30px;
      border-radius: 14px;
      display: inline-block;
      margin: 0 auto;
      direction: ltr;
      text-align: center;
      min-width: 250px;
    }
    
    .copy-note {
      font-size: 13px;
      color: #9aa1ab;
      text-align: center;
      margin-top: 8px;
    }
    
    /* الوقت */
    .time-info {
      font-size: 14.5px;
      color: #555c67;
      text-align: center;
      margin-top: 26px;
      line-height: 1.7;
    }
    
    .timer {
      display: inline-block;
      margin-bottom: 8px;
      background: #fff9e6;
      padding: 8px 16px;
      border-radius: 25px;
      border: 1px solid #ffeaa7;
    }
    
    .timer-text {
      color: #222b35;
    }
    
    .highlight {
      color: #073b74;
      font-weight: 700;
    }
    
    /* التحذير */
    .warning-box {
      margin-top: 28px;
      background-color: #fff9e6;
      border-right: 4px solid #f39c12;
      border-radius: 12px;
      padding: 18px;
    }
    
    .warning-content {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    
    .warning-icon {
      font-size: 20px;
      color: #f39c12;
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .warning-text {
      font-size: 13.5px;
      color: #444c58;
      text-align: right;
      line-height: 1.7;
    }
    
    .alert {
      color: #f39c12;
      font-weight: 700;
    }
    
    /* الملاحظة الأمنية */
    .security-note {
      font-size: 14px;
      line-height: 1.7;
      color: #555c67;
      text-align: right;
      margin-top: 26px;
      padding: 0 5px;
    }
    
    /* الفوتر */
    .footer {
      background-color: #f7f7fb;
      padding: 22px 30px;
      text-align: center;
      font-size: 13px;
      color: #7e8796;
      line-height: 1.7;
      border-top: 1px solid #eee;
    }
    
    .brand {
      color: #073b74;
      font-weight: 700;
    }
    
    /* دعم الشاشات الصغيرة */
    @media only screen and (max-width: 600px) {
      .email-container {
        border-radius: 16px;
        width: 100% !important;
      }
      
      .header {
        padding: 12px 0 20px;
      }
      
      .logo-container {
        width: 120px;
        height: 120px;
        padding: 12px;
      }
      
      .content {
        padding: 26px 22px;
      }
      
      .title {
        font-size: 23px;
        margin-bottom: 14px;
      }
      
      .description {
        font-size: 14.5px;
        margin-bottom: 26px;
        padding: 0 5px;
      }
      
      .verification-box {
        padding: 22px 18px;
        margin: 22px 0;
      }
      
      .verification-label {
        font-size: 15px;
        margin-bottom: 18px;
      }
      
      .code-number {
        font-size: 22px;
        letter-spacing: 4px;
        padding: 18px 20px;
        min-width: 200px;
      }
      
      .timer {
        padding: 6px 14px;
      }
      
      .security-note {
        font-size: 13.5px;
        margin-top: 22px;
      }
      
      .warning-box {
        margin-top: 22px;
        padding: 16px;
      }
      
      .footer {
        padding: 18px 22px;
        font-size: 12px;
      }
    }
    
    @media only screen and (max-width: 480px) {
      .content {
        padding: 22px 18px;
      }
      
      .title {
        font-size: 21px;
      }
      
      .description {
        font-size: 14px;
      }
      
      .code-number {
        font-size: 20px;
        letter-spacing: 3px;
        padding: 16px 18px;
        min-width: 180px;
      }
      
      .verification-box {
        padding: 20px 16px;
      }
      
      .timer {
        font-size: 13.5px;
      }
    }
    
    @media only screen and (max-width: 360px) {
      .logo-container {
        width: 100px;
        height: 100px;
      }
      
      .content {
        padding: 20px 16px;
      }
      
      .title {
        font-size: 20px;
      }
      
      .code-number {
        font-size: 18px;
        letter-spacing: 2px;
        padding: 14px 16px;
        min-width: 160px;
      }
      
      .verification-label {
        font-size: 14.5px;
      }
    }
  </style>
</head>
<body>
  <!-- حاوية البريد الإلكتروني -->
  <div class="email-container">
    
    <!-- الهيدر -->
    <div class="header">
      <div class="logo-container">
        <img src="https://i.postimg.cc/MZ7d9pD5/Frame-1261154840.png"
             alt="Hackerha Logo"
             class="logo-img">
      </div>
    </div>

    <!-- المحتوى -->
    <div class="content">
      <!-- العنوان -->
      <h1 class="title">
        مرحباً بك في تطبيق هكرها 👋
      </h1>

      <!-- فقرة الترحيب -->
      <p class="description">
        شكراً لمحاولتك تسجيل الدخول إلى حسابك، يرجى استخدام رمز التحقق التالي لإتمام
        عملية تسجيل الدخول.
      </p>

      <!-- صندوق الرمز -->
      <div class="verification-box">
        <span class="verification-label">رمز التحقق الخاص بك</span>
        
        <!-- رمز التحقق -->
        <div class="verification-code">
          <span class="code-number">${otp}</span>
        </div>
        
        <div class="copy-note">
          (يمكنك نسخ الرمز يدوياً)
        </div>
        
        <!-- معلومات الصلاحية -->
        <div class="time-info">
          <div class="timer">
            <span style="font-size: 18px; margin-left: 8px;">⏱️</span>
            <span class="timer-text">
              هذا الرمز صالح لمدة <span class="highlight">10 دقائق</span> فقط
            </span>
          </div>
        </div>
      </div>

      <!-- فقرة التنبيه الأمني -->
      <p class="security-note">
        إن لم تكن أنت من طلب تسجيل الدخول، ننصحك بتسجيل الدخول فوراً والتحقق من أمان حسابك،
        أو
        <a href="https://example.com/support" style="color: #073b74; text-decoration: none;">
          التواصل مع الدعم
        </a>.
      </p>

      <!-- مربع الملاحظة -->
      <div class="warning-box">
        <div class="warning-content">
          <div class="warning-icon">⚠️</div>
          <div class="warning-text">
            <span class="alert">تنبيه:</span>
            لا تشارك هذا الرمز مع أي شخص، فريق هكرها لن يطلب منك أبداً مشاركة رمز التحقق.
            يمكنك نسخ الرمز يدوياً.
          </div>
        </div>
      </div>
    </div>

    <!-- الفوتر -->
    <div class="footer">
      فريق <span class="brand">هكرها</span> – كلية الهندسة المعلوماتية، جامعة حلب<br>
      جميع الحقوق محفوظة © 2025<br>
      هذه رسالة آلية، الرجاء عدم الرد على هذا البريد.
    </div>
  </div>
</body>
</html>
`;

export const paymentHtml = (
  code: string,
  courseName: string,
  studentName: string,
  universityNumber: string | number
) => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>كود دفع الكورس - هكرها</title>
  <style>
    /* إعادة تعيين CSS للأمان في البريد الإلكتروني */
    * {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      direction: rtl;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      background-color: #f3f4f8;
      -webkit-font-smoothing: antialiased;
    }
    
    table {
      border-spacing: 0;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    
    a {
      color: #0066cc;
      text-decoration: none;
      font-weight: 600;
    }
    
    a:hover {
      text-decoration: underline;
      color: #0052a3;
    }
    
    /* الحاوية الرئيسية */
    .email-container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0,0,0,0.07);
    }
    
    /* الهيدر */
    .header {
      background-color: #073b74;
      padding: 5px 0 15px;
      text-align: center;
    }
    
    .logo-container {
      width: 290px;
      height: 290px;
      margin: 0 auto;
      padding: 10px;
    }
    
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }
    
    /* المحتوى */
    .content {
      padding: 30px;
    }

    .title {
      text-align: center;
      font-size: 26px;
      font-weight: 800;
      color: #222b35;
      margin: 0 0 20px 0;
      line-height: 1.4;
    }

    .description {
      text-align: center;
      font-size: 16px;
      line-height: 1.7;
      color: #555c67;
      margin-bottom: 30px;
      padding: 0 5px;
    }

    /* صندوق معلومات الطالب */
    .student-box {
      border: 1px solid #e1e5eb;
      border-radius: 16px;
      padding: 22px;
      margin: 25px 0;
      background-color: #f9fafc;
    }

    .student-line {
      font-size: 15px;
      color: #444c58;
      margin-bottom: 10px;
      font-weight: bold;
      text-align: right;
    }
    
    .student-line:last-child {
      margin-bottom: 0;
    }
    
    .student-label {
      color: #555c67;
      font-weight: 500;
    }
    
    .student-value {
      color: #073b74;
      font-weight: 700;
    }

    /* صندوق الكود */
    .verification-box {
      border: 1px solid #e1e5eb;
      border-radius: 16px;
      padding: 28px 20px;
      margin: 30px 0;
      background-color: #f9fafc;
      text-align: center;
    }

    .verification-label {
      font-size: 18px;
      color: #222b35;
      text-align: center;
      font-weight: 700;
      margin-bottom: 22px;
      display: block;
    }

    .verification-code {
      margin: 10px auto;
      text-align: center;
      width: 100%;
      max-width: 320px;
    }

    .code-number {
      color: #073b74;
      font-size: 24px;
      font-weight: 800;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      background-color: #f0f7ff;
      border: 2px dashed #073b74;
      padding: 22px 30px;
      border-radius: 14px;
      display: inline-block;
      margin: 0 auto;
      direction: ltr;
      text-align: center;
      min-width: 250px;
    }

    .instructions {
      font-size: 15px;
      line-height: 1.8;
      color: #555c67;
      text-align: right;
      margin-top: 30px;
      padding: 0 5px;
    }

    .footer {
      background-color: #f7f7fb;
      padding: 22px 30px;
      text-align: center;
      font-size: 13px;
      color: #818896;
      line-height: 1.7;
      border-top: 1px solid #eee;
    }
    
    .brand {
      color: #073b74;
      font-weight: 800;
      font-size: 15px;
    }
    
    /* دعم الشاشات الصغيرة */
    @media only screen and (max-width: 600px) {
      .email-container {
        border-radius: 20px;
        width: 100% !important;
      }
      
      .content {
        padding: 24px;
      }
      
      .title {
        font-size: 22px;
      }
      
      .description, .instructions {
        font-size: 15px;
      }
      
      .student-box, .verification-box {
        padding: 18px;
      }
      
      .code-number {
        font-size: 20px;
        padding: 18px 20px;
        min-width: 200px;
      }
      
      .logo-container {
        width: 150px;
        height: 150px;
      }
      
      .footer {
        padding: 18px 20px;
        font-size: 12px;
      }
    }
    
    @media only screen and (max-width: 480px) {
      .content {
        padding: 20px;
      }
      
      .student-line {
        font-size: 14px;
        margin-bottom: 8px;
      }
      
      .code-number {
        font-size: 18px;
        padding: 16px;
        letter-spacing: 1px;
        min-width: 180px;
      }
      
      .verification-label {
        font-size: 16px;
        margin-bottom: 18px;
      }
    }
    
    @media only screen and (max-width: 360px) {
      .logo-container {
        width: 120px;
        height: 120px;
      }
      
      .content {
        padding: 18px 16px;
      }
      
      .title {
        font-size: 20px;
      }
      
      .description, .instructions {
        font-size: 14px;
      }
      
      .student-box {
        padding: 16px;
      }
      
      .verification-box {
        padding: 16px;
      }
      
      .code-number {
        font-size: 16px;
        padding: 14px 16px;
        min-width: 160px;
      }
    }
  </style>
</head>
<body>
  <!-- حاوية البريد الإلكتروني -->
  <div class="email-container">
    
    <!-- الهيدر -->
    <div class="header">
      <div class="logo-container">
        <img src="https://i.postimg.cc/MZ7d9pD5/Frame-1261154840.png"
             alt="Hackerha Logo"
             class="logo-img">
      </div>
    </div>

    <!-- المحتوى -->
    <div class="content">
      
      <h1 class="title">كود دفع الكورس</h1>

      <p class="description">
        تم إنشاء كود الدفع الخاص بك لإتمام الاشتراك في هذا الكورس
      </p>

      <!-- صندوق معلومات الطالب -->
      <div class="student-box">
        <div class="student-line">
          <span class="student-label">اسم الطالب:</span>
          <span class="student-value">${studentName}</span>
        </div>
        <div class="student-line">
          <span class="student-label">الرقم الجامعي:</span>
          <span class="student-value">${universityNumber}</span>
        </div>
        <div class="student-line">
          <span class="student-label">اسم الكورس:</span>
          <span class="student-value">${courseName}</span>
        </div>
      </div>

      <!-- صندوق الكود -->
      <div class="verification-box">
        <span class="verification-label">كود الدفع</span>
        
        <div class="verification-code">
          <span class="code-number">${code}</span>
        </div>
      </div>

      <p class="instructions">
        بعد الدفع سيتم تفعيل اشتراكك في الكورس تلقائياً.<br>
        في حال وجود أي مشكلة يمكنك <a href="https://example.com/support">التواصل مع الدعم</a>.
      </p>

    </div>

    <!-- الفوتر -->
    <div class="footer">
      فريق <span class="brand">هكرها</span> – كلية الهندسة المعلوماتية، جامعة حلب<br>
      جميع الحقوق محفوظة © 2025<br>
      هذه رسالة آلية، الرجاء عدم الرد على هذا البريد.
    </div>

  </div>
</body>
</html>`;

export const resetPasswordHtml = (otp: string) => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إعادة تعيين كلمة المرور - هكرها</title>
  <style>
    /* إعادة تعيين CSS للأمان في البريد الإلكتروني */
    * {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      direction: rtl;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      background-color: #f3f4f8;
      -webkit-font-smoothing: antialiased;
    }
    
    table {
      border-spacing: 0;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    
    a {
      color: #073b74;
      text-decoration: none;
      font-weight: 500;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    /* الحاوية الرئيسية */
    .email-container {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0,0,0,0.07);
    }
    
    /* الهيدر */
    .header {
      background-color: #073b74;
      padding: 5px 0 15px;
      text-align: center;
    }
    
    .logo-container {
      width: 290px;
      height: 290px;
      margin: 0 auto;
      padding: 10px;
    }
    
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }
    
    /* المحتوى */
    .content {
      padding: 35px 30px;
    }
    
    .title {
      text-align: center;
      font-size: 26px;
      font-weight: 700;
      color: #222b35;
      margin-bottom: 16px;
      line-height: 1.4;
    }
    
    .description {
      text-align: center;
      font-size: 15.5px;
      line-height: 1.7;
      color: #555c67;
      margin-bottom: 32px;
      padding: 0 10px;
    }
    
    /* صندوق التحقق */
    .verification-box {
      border: 1px solid #e1e5eb;
      border-radius: 16px;
      padding: 28px 20px;
      margin: 30px 0;
      background-color: #f9fafc;
      text-align: center;
    }
    
    .verification-label {
      font-size: 18px;
      color: #222b35;
      text-align: center;
      font-weight: 700;
      margin-bottom: 22px;
      display: block;
    }
    
    .verification-code {
      margin: 10px auto;
      text-align: center;
      width: 100%;
      max-width: 320px;
    }
    
    .code-number {
      color: #073b74;
      font-size: 24px;
      font-weight: 800;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      background-color: #f0f7ff;
      border: 2px dashed #073b74;
      padding: 22px 30px;
      border-radius: 14px;
      display: inline-block;
      margin: 0 auto;
      direction: ltr;
      text-align: center;
      min-width: 250px;
    }
    
    .copy-note {
      font-size: 13px;
      color: #c97a7a;
      text-align: center;
      margin-top: 8px;
    }
    
    /* الوقت */
    .time-info {
      font-size: 14.5px;
      color: #555c67;
      text-align: center;
      margin-top: 26px;
      line-height: 1.7;
    }
    
    .timer {
      display: inline-block;
      margin-bottom: 8px;
      background: #fff9e6;
      padding: 8px 16px;
      border-radius: 25px;
      border: 1px solid #ffeaa7;
    }
    
    .timer-text {
      color: #222b35;
    }
    
    .highlight {
      color: #073b74;
      font-weight: 700;
    }
    
    /* التعليمات */
    .instructions {
      font-size: 14px;
      line-height: 1.7;
      color: #444c58;
      text-align: right;
      margin-top: 26px;
      padding: 16px;
      background: #f9f9f9;
      border-radius: 12px;
      border-right: 4px solid #073b74;
    }
    
    .instruction-title {
      font-weight: 600;
      color: #073b74;
      margin-bottom: 8px;
      text-align: right;
    }
    
    .instruction-steps {
      margin-top: 10px;
    }
    
    .step {
      margin-bottom: 8px;
      text-align: right;
      padding-right: 24px;
      position: relative;
    }
    
    .step-number {
      background: #073b74;
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: inline-block;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      font-weight: bold;
      position: absolute;
      right: 0;
      top: 0;
    }
    
    /* التحذير */
    .warning-box {
      margin-top: 28px;
      background-color: #fff9e6;
      border-right: 4px solid #f39c12;
      border-radius: 12px;
      padding: 18px;
    }
    
    .warning-content {
      text-align: right;
    }
    
    .warning-icon {
      font-size: 20px;
      color: #f39c12;
      margin-left: 8px;
      vertical-align: middle;
    }
    
    .warning-text {
      font-size: 13.5px;
      color: #444c58;
      text-align: right;
      line-height: 1.7;
      display: inline-block;
      width: calc(100% - 30px);
    }
    
    .alert {
      color: #f39c12;
      font-weight: 700;
    }
    
    /* الفوتر */
    .footer {
      background-color: #fef5f5;
      padding: 20px 28px;
      text-align: center;
      font-size: 12.5px;
      color: #888;
      line-height: 1.7;
      border-top: 1px solid #ffeaea;
    }
    
    .brand {
      color: #073b74;
      font-weight: 700;
    }
    
    /* دعم الشاشات الصغيرة */
    @media only screen and (max-width: 600px) {
      .email-container {
        border-radius: 16px;
        width: 100% !important;
      }
      
      .header {
        padding: 10px 0 18px;
      }
      
      .logo-container {
        width: 100px;
        height: 100px;
        padding: 12px;
      }
      
      .content {
        padding: 24px 20px;
      }
      
      .title {
        font-size: 22px;
      }
      
      .description {
        font-size: 14.5px;
        margin-bottom: 24px;
      }
      
      .verification-box {
        padding: 22px 18px;
        margin: 22px 0;
      }
      
      .verification-label {
        font-size: 15px;
        margin-bottom: 16px;
      }
      
      .code-number {
        font-size: 22px;
        letter-spacing: 3px;
        padding: 16px 20px;
        min-width: 200px;
      }
      
      .timer {
        padding: 6px 14px;
      }
      
      .instructions {
        font-size: 13.5px;
        margin-top: 22px;
        padding: 14px;
      }
      
      .warning-box {
        margin-top: 22px;
        padding: 16px;
      }
      
      .footer {
        padding: 16px 20px;
        font-size: 12px;
      }
    }
    
    @media only screen and (max-width: 480px) {
      .content {
        padding: 20px 16px;
      }
      
      .title {
        font-size: 20px;
      }
      
      .description {
        font-size: 14px;
      }
      
      .code-number {
        font-size: 20px;
        letter-spacing: 2px;
        padding: 14px 16px;
        min-width: 180px;
      }
      
      .verification-box {
        padding: 20px 16px;
      }
      
      .step {
        padding-right: 20px;
      }
    }
    
    @media only screen and (max-width: 360px) {
      .logo-container {
        width: 80px;
        height: 80px;
      }
      
      .content {
        padding: 18px 14px;
      }
      
      .title {
        font-size: 18px;
      }
      
      .description {
        font-size: 13.5px;
      }
      
      .verification-label {
        font-size: 14px;
      }
      
      .code-number {
        font-size: 18px;
        padding: 12px 14px;
        min-width: 160px;
      }
      
      .instructions {
        font-size: 13px;
      }
    }
  </style>
</head>
<body>
  <!-- حاوية البريد الإلكتروني -->
  <div class="email-container">
    
    <!-- الهيدر -->
    <div class="header">
      <div class="logo-container">
        <img src="https://i.postimg.cc/MZ7d9pD5/Frame-1261154840.png"
             alt="Hackerha Logo"
             class="logo-img">
      </div>
    </div>

    <!-- المحتوى -->
    <div class="content">
      <!-- العنوان -->
      <h1 class="title">
        🔒 طلب إعادة تعيين كلمة المرور
      </h1>

      <!-- فقرة الشرح -->
      <p class="description">
        لقد تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك. 
        يرجى استخدام رمز التحقق التالي لإتمام عملية إعادة التعيين.
      </p>

      <!-- صندوق الرمز -->
      <div class="verification-box">
        <span class="verification-label">رمز التحقق لإعادة تعيين كلمة المرور</span>
        
        <!-- رمز التحقق -->
        <div class="verification-code">
          <span class="code-number">${otp}</span>
        </div>
        
        <div class="copy-note">
          (يمكنك نسخ الرمز يدوياً)
        </div>
        
        <!-- معلومات الصلاحية -->
        <div class="time-info">
          <div class="timer">
            <span style="font-size: 18px; margin-left: 8px;">⏱️</span>
            <span class="timer-text">
              هذا الرمز صالح لمدة <span class="highlight">10 دقائق</span> فقط
            </span>
          </div>
        </div>
      </div>

      <!-- التعليمات -->
      <div class="instructions">
        <div class="instruction-title">📝 تعليمات الاستخدام:</div>
        <div class="instruction-steps">
          <div class="step">
            <span class="step-number">1</span>
            <span>انسخ الرمز أعلاه</span>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <span>ارجع إلى التطبيق وأدخل الرمز في الحقل المخصص</span>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <span>أنشئ كلمة مرور جديدة قوية لحسابك</span>
          </div>
        </div>
      </div>

      <!-- مربع الملاحظة -->
      <div class="warning-box">
        <div class="warning-content">
          <span class="warning-icon">⚠️</span>
          <span class="warning-text">
            <span class="alert">مهم:</span>
            إذا لم تكن أنت من طلب إعادة تعيين كلمة المرور، 
            يمكنك تجاهل هذا البريد الإلكتروني بشكل آمن. 
            لا تشارك هذا الرمز مع أي شخص.
          </span>
        </div>
      </div>
    </div>

    <!-- الفوتر -->
    <div class="footer">
      فريق <span class="brand">هكرها</span> – كلية الهندسة المعلوماتية، جامعة حلب<br>
      جميع الحقوق محفوظة © 2025<br>
      هذه رسالة آلية، الرجاء عدم الرد على هذا البريد.<br>
      <small style="color: #aaa; font-size: 11px;">
        للحصول على المساعدة، <a href="https://example.com/support">اتصل بالدعم</a>
      </small>
    </div>
  </div>
</body>
</html>`;
