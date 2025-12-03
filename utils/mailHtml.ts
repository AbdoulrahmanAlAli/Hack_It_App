export const html = (otp: string) => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>رمز التحقق - هكرها</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f8;
      direction: rtl;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
    }
    
    .container {
      max-width: 600px;
      width: 100%;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0,0,0,0.07);
      margin: 20px auto;
    }
    
    .header {
      background-color: #073b74;
      padding: 0px 10px;
      text-align: center;
    }
    
    .logo-container {
      width: 290px;
      height: 290px;
      margin: 0 auto;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 12px;
    }
    
    .content {
      padding: 32px;
    }
    
    /* Media Queries معدلة */
    @media only screen and (max-width: 650px) {
      .container {
        width: 95% !important;
        margin: 10px auto !important;
        border-radius: 16px !important;
      }
      
      .header {
        padding: 0px 15px !important;
      }
      
      .logo-container {
        width: 220px !important;
        height: 220px !important;
        padding: 8px !important;
      }
      
      .content {
        padding: 24px 20px !important;
      }
      
      .code-number {
        font-size: 28px !important;
        letter-spacing: 5px !important;
        min-width: 200px !important;
        padding: 14px 20px !important;
      }
      
      .title {
        font-size: 20px !important;
      }
      
      .description {
        font-size: 14px !important;
        margin-bottom: 25px !important;
      }
      
      .verification-box {
        padding: 20px !important;
        margin: 20px 0 !important;
      }
      
      .verification-label {
        font-size: 15px !important;
        margin-bottom: 18px !important;
      }
    }
    
    @media only screen and (max-width: 480px) {
      .header {
        padding: 0px 12px !important;
      }
      
      .logo-container {
        width: 200px !important;
        height: 200px !important;
        padding: 6px !important;
      }
      
      .content {
        padding: 20px 16px !important;
      }
      
      .title {
        font-size: 18px !important;
        margin-bottom: 12px !important;
      }
      
      .description {
        font-size: 13.5px !important;
        line-height: 1.7 !important;
        margin-bottom: 20px !important;
      }
      
      .code-number {
        font-size: 24px !important;
        letter-spacing: 4px !important;
        min-width: 180px !important;
        padding: 12px 18px !important;
      }
      
      .verification-box {
        padding: 18px !important;
        margin: 18px 0 !important;
      }
      
      .verification-label {
        font-size: 14px !important;
        margin-bottom: 16px !important;
      }
      
      .time-info {
        font-size: 13px !important;
        margin-top: 20px !important;
      }
      
      .warning-box {
        margin-top: 20px !important;
        padding: 14px !important;
      }
      
      .warning-text {
        font-size: 12.5px !important;
        line-height: 1.6 !important;
      }
      
      .footer {
        padding: 15px 16px !important;
        font-size: 11px !important;
      }
    }
    
    @media only screen and (max-width: 360px) {
      .logo-container {
        width: 100px !important;
        height: 100px !important;
      }
      
      .code-number {
        font-size: 22px !important;
        letter-spacing: 3px !important;
        min-width: 160px !important;
        padding: 10px 16px !important;
      }
      
      .verification-code {
        min-width: 180px !important;
        padding: 12px 16px !important;
      }
      
      .content {
        padding: 18px 14px !important;
      }
    }
    
    /* تحسين مظهر رمز التحقق */
    .verification-code {
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 16px 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 10px auto;
      text-align: center;
      min-width: 220px;
    }

    .code-number {
      color: #073b74;
      font-size: 32px;
      font-weight: bold;
      font-family: 'Courier New', monospace;
      letter-spacing: 6px;
      background-color: #f0f7ff;
      border: 2px solid #073b74;
      padding: 16px 24px;
      border-radius: 10px;
      display: block;
      margin: 0;
    }
    
    .copy-success {
      color: #2ecc71;
      font-size: 13px;
      margin-top: 8px;
      text-align: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      height: 0;
      overflow: hidden;
      font-weight: bold;
    }
    
    .copy-success.show {
      opacity: 1;
      height: auto;
      margin-top: 12px;
    }
    
    /* تلميح عند التحويم على الرمز */
    .verification-code::after {
      content: "انقر لنسخ الرمز";
      position: absolute;
      bottom: -35px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0,0,0,0.85);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 10;
    }
    
    .verification-code:hover::after {
      opacity: 1;
    }
    
    .title {
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 16px;
    }
    
    .description {
      text-align: center;
      font-size: 15px;
      line-height: 1.8;
      color: #555c67;
      margin-bottom: 30px;
    }
    
    .verification-box {
      border: 1px solid #e1e5eb;
      border-radius: 16px;
      padding: 24px;
      margin: 25px 0;
      background-color: #f9fafc;
    }
    
    .verification-label {
      font-size: 16px;
      color: #222b35;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      display: block;
    }
    
    .time-info {
      font-size: 14px;
      color: #7b8491;
      text-align: center;
      margin-top: 24px;
      line-height: 1.6;
    }
    
    .warning-box {
      margin-top: 24px;
      background-color: #f3f4f8;
      border-top: 3px solid #073b74;
      border-radius: 10px;
      padding: 16px;
    }
    
    .warning-content {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    
    .warning-icon {
      font-size: 20px;
      color: #073b74;
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .warning-text {
      font-size: 13px;
      color: #444c58;
      text-align: right;
      line-height: 1.7;
    }
    
    .alert {
      color: #073b74;
      font-weight: bold;
    }
    
    .footer {
      background-color: #f7f7fb;
      padding: 18px 20px;
      text-align: center;
      font-size: 12px;
      color: #818896;
      line-height: 1.7;
    }
    
    .link {
      color: #0066cc;
      text-decoration: none;
    }
    
    .link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <!-- الحاوية الرئيسية -->
  <div class="container">
    
    <!-- الهيدر مع صورة اللوجو -->
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
        
        <!-- رمز التحقق فقط - يمكن نسخه بالنقر -->
        <div id="verificationCode" 
             class="verification-code">
          <span class="code-number">${otp}</span>
        </div>
        
        <!-- رسالة نجاح النسخ -->
        <div id="copySuccessMessage" class="copy-success">
          ✓ تم نسخ الرمز بنجاح إلى الحافظة
        </div>
        
        <!-- معلومات الصلاحية -->
        <div class="time-info">
          <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 18px;">⏱️</span>
            <span>هذا الرمز صالح لمدة <strong style="color:#073b74;">10 دقائق</strong> فقط</span>
          </div>
          <div style="font-size: 13px; color: #9aa1ab; margin-top: 4px;">
            (انقر على الرمز أعلاه لنسخه)
          </div>
        </div>
      </div>

      <!-- فقرة التنبيه الأمني -->
      <p style="font-size: 14px; line-height: 1.8; color: #555c67; text-align: right; margin-top: 24px;">
        إن لم تكن أنت من طلب تسجيل الدخول، ننصحك بتسجيل الدخول فوراً والتحقق من أمان حسابك،
        أو
        <a href="https://example.com/support" class="link">
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
            يمكنك نسخ الرمز بالنقر عليه أعلاه.
          </div>
        </div>
      </div>
    </div>

    <!-- الفوتر -->
    <div class="footer">
      فريق <strong style="color:#073b74;">هكرها</strong> – كلية الهندسة المعلوماتية، جامعة حلب<br>
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
  <title>كود دفع الكورس - هكرها</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f8;
      direction: rtl;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
    }
    
    .container {
      max-width: 600px;
      width: 100%;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0,0,0,0.07);
      margin: 20px auto;
    }
    
    .header {
      background-color: #073b74;
      padding: 0px 10px;
      text-align: center;
    }
    
    .logo-container {
      width: 290px;
      height: 290px;
      margin: 0 auto;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 12px;
    }
    
    .content {
      padding: 32px;
    }

    /* صندوق معلومات الطالب */
    .student-box {
      border: 1px solid #e1e5eb;
      border-radius: 16px;
      padding: 20px;
      margin: 20px 0;
      background-color: #f9fafc;
    }

    .student-line {
      font-size: 15px;
      color: #444c58;
      margin-bottom: 10px;
      font-weight: bold;
    }

    /* صندوق الكود */
    .verification-box {
      border: 1px solid #e1e5eb;
      border-radius: 16px;
      padding: 24px;
      margin: 25px 0;
      background-color: #f9fafc;
    }

    .verification-label {
      font-size: 16px;
      color: #222b35;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      display: block;
    }

    .verification-code {
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 16px 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 10px auto;
      text-align: center;
      min-width: 220px;
    }

    .code-number {
      color: #073b74;
      font-size: 32px;
      font-weight: bold;
      font-family: 'Courier New', monospace;
      letter-spacing: 6px;
      background-color: #f0f7ff;
      border: 2px solid #073b74;
      padding: 16px 24px;
      border-radius: 10px;
      display: block;
      margin: 0;
    }

    .title {
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 16px;
    }

    .description {
      text-align: center;
      font-size: 15px;
      line-height: 1.8;
      color: #555c67;
      margin-bottom: 24px;
    }

    .footer {
      background-color: #f7f7fb;
      padding: 18px 20px;
      text-align: center;
      font-size: 12px;
      color: #818896;
      line-height: 1.7;
    }

    .link {
      color: #0066cc;
      text-decoration: none;
    }
    
    .link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    
    <div class="header">
      <div class="logo-container">
        <img src="https://i.postimg.cc/MZ7d9pD5/Frame-1261154840.png"
             alt="Hackerha Logo"
             class="logo-img">
      </div>
    </div>

    <div class="content">
      
      <h1 class="title">كود دفع كورس ${courseName}</h1>

      <p class="description">
        تم إنشاء كود الدفع الخاص بك لإتمام الاشتراك في هذا الكورس.
      </p>

      <!-- صندوق معلومات الطالب -->
      <div class="student-box">
        <div class="student-line">اسم الطالب: ${studentName}</div>
        <div class="student-line">الرقم الجامعي: ${universityNumber}</div>
      </div>

      <!-- صندوق الكود -->
      <div class="verification-box">
        <span class="verification-label">كود الدفع</span>
        
        <div class="verification-code">
          <span class="code-number">${code}</span>
        </div>
      </div>

      <p style="font-size: 14px; line-height: 1.8; color: #555c67; text-align: right; margin-top: 24px;">
        بعد الدفع سيتم تفعيل اشتراكك في الكورس.  
        في حال وجود أي مشكلة يمكنك <a href="https://example.com/support" class="link">التواصل مع الدعم</a>.
      </p>

    </div>

    <div class="footer">
      فريق <strong style="color:#073b74;">هكرها</strong> – كلية الهندسة المعلوماتية، جامعة حلب<br>
      جميع الحقوق محفوظة © 2025<br>
      هذه رسالة آلية، الرجاء عدم الرد.
    </div>

  </div>
</body>
</html>`;

export const resetPasswordHtml = (otp: string) => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>إعادة تعيين كلمة المرور - هكرها</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f8;
      direction: rtl;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
    }
    
    .container {
      max-width: 600px;
      width: 100%;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0,0,0,0.07);
      margin: 20px auto;
    }
    
    .header {
      background-color: #073b74;
      padding: 0px 10px;
      text-align: center;
    }
    
    .logo-container {
      width: 290px;
      height: 290px;
      margin: 0 auto;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 12px;
    }
    
    .content {
      padding: 32px;
    }
    
    /* Media Queries */
    @media only screen and (max-width: 650px) {
      .container {
        width: 95% !important;
        margin: 10px auto !important;
        border-radius: 16px !important;
      }
      
      .header {
        padding: 0px 15px !important;
      }
      
      .logo-container {
        width: 220px !important;
        height: 220px !important;
        padding: 8px !important;
      }
      
      .content {
        padding: 24px 20px !important;
      }
      
      .code-number {
        font-size: 28px !important;
        letter-spacing: 5px !important;
        min-width: 200px !important;
        padding: 14px 20px !important;
      }
      
      .title {
        font-size: 20px !important;
      }
      
      .description {
        font-size: 14px !important;
        margin-bottom: 25px !important;
      }
      
      .verification-box {
        padding: 20px !important;
        margin: 20px 0 !important;
      }
      
      .verification-label {
        font-size: 15px !important;
        margin-bottom: 18px !important;
      }
    }
    
    @media only screen and (max-width: 480px) {
      .header {
        padding: 0px 12px !important;
      }
      
      .logo-container {
        width: 200px !important;
        height: 200px !important;
        padding: 6px !important;
      }
      
      .content {
        padding: 20px 16px !important;
      }
      
      .title {
        font-size: 18px !important;
        margin-bottom: 12px !important;
      }
      
      .description {
        font-size: 13.5px !important;
        line-height: 1.7 !important;
        margin-bottom: 20px !important;
      }
      
      .code-number {
        font-size: 24px !important;
        letter-spacing: 4px !important;
        min-width: 180px !important;
        padding: 12px 18px !important;
      }
      
      .verification-box {
        padding: 18px !important;
        margin: 18px 0 !important;
      }
      
      .verification-label {
        font-size: 14px !important;
        margin-bottom: 16px !important;
      }
      
      .time-info {
        font-size: 13px !important;
        margin-top: 20px !important;
      }
      
      .warning-box {
        margin-top: 20px !important;
        padding: 14px !important;
      }
      
      .warning-text {
        font-size: 12.5px !important;
        line-height: 1.6 !important;
      }
      
      .footer {
        padding: 15px 16px !important;
        font-size: 11px !important;
      }
    }
    
    @media only screen and (max-width: 360px) {
      .logo-container {
        width: 180px !important;
        height: 180px !important;
      }
      
      .code-number {
        font-size: 22px !important;
        letter-spacing: 3px !important;
        min-width: 160px !important;
        padding: 10px 16px !important;
      }
      
      .verification-code {
        min-width: 180px !important;
        padding: 12px 16px !important;
      }
      
      .content {
        padding: 18px 14px !important;
      }
    }
    
    /* تحسين مظهر رمز التحقق */
    .verification-code {
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 16px 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 10px auto;
      text-align: center;
      min-width: 220px;
    }

    .code-number {
      color: #073b74;
      font-size: 32px;
      font-weight: bold;
      font-family: 'Courier New', monospace;
      letter-spacing: 6px;
      background-color: #fef2f2;
      border: 2px solid #073b74;
      padding: 16px 24px;
      border-radius: 10px;
      display: block;
      margin: 0;
    }
    
    .copy-success {
      color: #2ecc71;
      font-size: 13px;
      margin-top: 8px;
      text-align: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      height: 0;
      overflow: hidden;
      font-weight: bold;
    }
    
    .copy-success.show {
      opacity: 1;
      height: auto;
      margin-top: 12px;
    }
    
    /* تلميح عند التحويم على الرمز */
    .verification-code::after {
      content: "انقر لنسخ الرمز";
      position: absolute;
      bottom: -35px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0,0,0,0.85);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 10;
    }
    
    .verification-code:hover::after {
      opacity: 1;
    }
    
    .title {
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 16px;
    }
    
    .description {
      text-align: center;
      font-size: 15px;
      line-height: 1.8;
      color: #555c67;
      margin-bottom: 30px;
    }
    
    .verification-box {
      border: 1px solid #e1e5eb;
      border-radius: 16px;
      padding: 24px;
      margin: 25px 0;
      background-color: #fefafb;
    }
    
    .verification-label {
      font-size: 16px;
      color: #222b35;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      display: block;
    }
    
    .time-info {
      font-size: 14px;
      color: #7b8491;
      text-align: center;
      margin-top: 24px;
      line-height: 1.6;
    }
    
    .warning-box {
      margin-top: 24px;
      background-color: #fef2f2;
      border-top: 3px solid #073b74;
      border-radius: 10px;
      padding: 16px;
    }
    
    .warning-content {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    
    .warning-icon {
      font-size: 20px;
      color: #073b74;
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .warning-text {
      font-size: 13px;
      color: #444c58;
      text-align: right;
      line-height: 1.7;
    }
    
    .alert {
      color: #0066cc;
      font-weight: bold;
    }
    
    .footer {
      background-color: #f7f7fb;
      padding: 18px 20px;
      text-align: center;
      font-size: 12px;
      color: #818896;
      line-height: 1.7;
    }
    
    .link {
      color: #0066cc;
      text-decoration: none;
    }
    
    .link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <!-- الحاوية الرئيسية -->
  <div class="container">
    
    <!-- الهيدر مع صورة اللوجو -->
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
        طلب إعادة تعيين كلمة المرور 🔒
      </h1>

      <!-- فقرة الشرح -->
      <p class="description">
        لقد تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك. 
        يرجى استخدام رمز التحقق التالي لإتمام عملية إعادة التعيين.
      </p>

      <!-- صندوق الرمز -->
      <div class="verification-box">
        <span class="verification-label">رمز التحقق لإعادة تعيين كلمة المرور</span>
        
        <!-- رمز التحقق فقط - يمكن نسخه بالنقر -->
        <div id="verificationCode" 
             class="verification-code">
          <span class="code-number">${otp}</span>
        </div>
        
        <!-- رسالة نجاح النسخ -->
        <div id="copySuccessMessage" class="copy-success">
          ✓ تم نسخ الرمز بنجاح إلى الحافظة
        </div>
        
        <!-- معلومات الصلاحية -->
        <div class="time-info">
          <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 18px;">⏱️</span>
            <span>هذا الرمز صالح لمدة <strong style="color:#d93c3c;">10 دقائق</strong> فقط</span>
          </div>
          <div style="font-size: 13px; color: #9aa1ab; margin-top: 4px;">
            (انقر على الرمز أعلاه لنسخه)
          </div>
        </div>
      </div>

      <!-- التعليمات -->
      <p style="font-size: 14px; line-height: 1.8; color: #555c67; text-align: right; margin-top: 24px;">
        بعد نسخ الرمز، الرجاء العودة إلى التطبيق وإدخال الرمز في الحقل المخصص، 
        ثم إنشاء كلمة مرور جديدة لحسابك.
      </p>

      <!-- مربع الملاحظة -->
      <div class="warning-box">
        <div class="warning-content">
          <div class="warning-icon">⚠️</div>
          <div class="warning-text">
            <span class="alert">مهم:</span>
            إذا لم تكن أنت من طلب إعادة تعيين كلمة المرور، 
            يمكنك تجاهل هذا البريد الإلكتروني بشكل آمن. 
            لا تشارك هذا الرمز مع أي شخص.
          </div>
        </div>
      </div>
    </div>

    <!-- الفوتر -->
    <div class="footer">
      فريق <strong style="color:#d93c3c;">هكرها</strong> – كلية الهندسة المعلوماتية، جامعة حلب<br>
      جميع الحقوق محفوظة © 2025<br>
      هذه رسالة آلية، الرجاء عدم الرد على هذا البريد.
    </div>
  </div>
</body>
</html>
`;
