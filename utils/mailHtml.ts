export const html = (otp: string) => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>رمز التحقق - هكرها</title>
  <style>
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
      --shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
      --radius: 16px;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      margin: 0;
      padding: 20px;
      background-color: var(--background-page);
      direction: rtl;
      font-family: 'Segoe UI', 'Tahoma', 'Arial', sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
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
      background-color: var(--primary-color);
      padding: 5px 0 15px;
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
      border-radius: 8px;
    }
    
    .content {
      padding: 35px 30px;
    }
    
    .title {
      text-align: center;
      font-size: 26px;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 16px;
      line-height: 1.4;
    }
    
    .description {
      text-align: center;
      font-size: 15.5px;
      line-height: 1.7;
      color: var(--text-light);
      margin-bottom: 32px;
      padding: 0 10px;
    }
    
    .verification-box {
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 28px 20px;
      margin: 30px 0;
      background-color: var(--background-light);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .verification-label {
      font-size: 18px;
      color: var(--text-dark);
      text-align: center;
      font-weight: 700;
      margin-bottom: 22px;
      display: block;
    }
    
    .verification-code {
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px auto;
      text-align: center;
      width: 100%;
      max-width: 320px;
    }
    
    .verification-code:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(7, 59, 116, 0.15);
    }
    
    .code-number {
      color: var(--primary-color);
      font-size: 24px;
      font-weight: 800;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      background-color: var(--secondary-color);
      border: 2px dashed var(--primary-color);
      padding: 22px 30px;
      border-radius: 14px;
      display: block;
      margin: 0;
      width: 100%;
      user-select: all;
    }
    
    .copy-success {
      color: var(--success);
      font-size: 13.5px;
      margin-top: 12px;
      text-align: center;
      opacity: 0;
      height: 0;
      overflow: hidden;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .copy-success.show {
      opacity: 1;
      height: 22px;
    }
    
    .time-info {
      font-size: 14.5px;
      color: var(--text-light);
      text-align: center;
      margin-top: 26px;
      line-height: 1.7;
    }
    
    .timer {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      background: #fff9e6;
      padding: 8px 16px;
      border-radius: 25px;
      border: 1px solid #ffeaa7;
    }
    
    .timer-icon {
      font-size: 18px;
    }
    
    .timer-text {
      color: var(--text-dark);
    }
    
    .highlight {
      color: var(--primary);
      font-weight: 700;
    }
    
    .warning-box {
      margin-top: 28px;
      background-color: #fff9e6;
      border-right: 4px solid var(--warning);
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
      color: var(--warning);
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .warning-text {
      font-size: 13.5px;
      color: var(--text-medium);
      text-align: right;
      line-height: 1.7;
    }
    
    .alert {
      color: var(--warning);
      font-weight: 700;
    }
    
    .security-note {
      font-size: 14px;
      line-height: 1.7;
      color: var(--text-light);
      text-align: right;
      margin-top: 26px;
      padding: 0 5px;
    }
    
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
      color: var(--primary);
      font-weight: 700;
    }
    
    /* استعلامات الوسائط المحسنة */
    @media (max-width: 600px) {
      body {
        padding: 15px;
      }
      
      .container {
        border-radius: 16px;
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
        font-size: 24px;
        letter-spacing: 4px;
        padding: 18px 20px;
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
    
    @media (max-width: 480px) {
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
        font-size: 22px;
        letter-spacing: 3px;
        padding: 16px 18px;
      }
      
      .verification-box {
        padding: 20px 16px;
      }
      
      .timer {
        font-size: 13.5px;
        flex-direction: column;
        gap: 6px;
      }
    }
    
    @media (max-width: 360px) {
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
        font-size: 20px;
        letter-spacing: 2px;
        padding: 14px 16px;
      }
      
      .verification-label {
        font-size: 14.5px;
      }
    }
    
    /* تأثيرات النسخ */
    .copied {
      animation: copyEffect 0.5s ease;
    }
    
    @keyframes copyEffect {
      0% { transform: scale(1); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
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
        
        <!-- رمز التحقق -->
        <div id="verificationCode" class="verification-code">
          <span class="code-number">${otp}</span>
        </div>
        
        <!-- رسالة نجاح النسخ -->
        <div id="copySuccessMessage" class="copy-success">
          ✓ تم نسخ الرمز بنجاح إلى الحافظة
        </div>
        
        <!-- معلومات الصلاحية -->
        <div class="time-info">
          <div class="timer">
            <span class="timer-icon">⏱️</span>
            <span class="timer-text">
              هذا الرمز صالح لمدة <span class="highlight">10 دقائق</span> فقط
            </span>
          </div>
          <div style="font-size: 13px; color: #9aa1ab; margin-top: 8px;">
            (انقر على الرمز أعلاه لنسخه)
          </div>
        </div>
      </div>

      <!-- فقرة التنبيه الأمني -->
      <p class="security-note">
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
      --shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
      --radius: 16px;
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 20px;
      background-color: var(--background-page);
      direction: rtl;
      font-family: 'Segoe UI', 'Tahoma', 'Arial', sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
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
      background-color: var(--primary-color);
      padding: 5px 0 15px;
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
      border-radius: 8px;
    }
    
    .content {
      padding: 30px;
    }

    .title {
      text-align: center;
      font-size: 26px;
      font-weight: 800;
      color: var(--text-dark);
      margin: 0 0 20px 0;
      line-height: 1.4;
    }

    .description {
      text-align: center;
      font-size: 16px;
      line-height: 1.7;
      color: var(--text-light);
      margin-bottom: 30px;
      padding: 0 5px;
    }

    /* صندوق معلومات الطالب */
    .student-box {
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 22px;
      margin: 25px 0;
      background-color: var(--background-light);
    }

    .student-line {
  font-size: 15px;
      color: #444c58;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .student-line:last-child {
      margin-bottom: 0;
      border-bottom: none;
      padding-bottom: 0;
    }
    
    .student-label {
      color: var(--text-light);
      font-weight: 500;
    }
    
    .student-value {
      color: var(--primary-color);
      font-weight: 700;
    }

    /* صندوق الكود */
    .verification-box {
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 28px 20px;
      margin: 30px 0;
      background-color: var(--background-light);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .verification-label {
      font-size: 18px;
      color: var(--text-dark);
      text-align: center;
      font-weight: 700;
      margin-bottom: 22px;
      display: block;
    }

    .verification-code {
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px auto;
      text-align: center;
      width: 100%;
      max-width: 320px;
    }
    
    .verification-code:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(7, 59, 116, 0.15);
    }

    .code-number {
      color: var(--primary-color);
      font-size: 24px;
      font-weight: 800;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      background-color: var(--secondary-color);
      border: 2px dashed var(--primary-color);
      padding: 22px 30px;
      border-radius: 14px;
      display: block;
      margin: 0;
      width: 100%;
      user-select: all;
    }

    .instructions {
      font-size: 15px;
      line-height: 1.8;
      color: var(--text-light);
      text-align: right;
      margin-top: 30px;
      padding: 0 5px;
    }

    .link {
      color: #0066cc;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s;
    }
    
    .link:hover {
      text-decoration: underline;
      color: #0052a3;
    }

    .footer {
      background-color: #f7f7fb;
      padding: 22px 30px;
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.7;
      border-top: 1px solid #eee;
    }
    
    .brand {
      color: var(--primary-color);
      font-weight: 800;
      font-size: 15px;
    }
    
    @media (max-width: 600px) {
      body {
        padding: 15px;
      }
      
      .container {
        border-radius: 20px;
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
    
    @media (max-width: 400px) {
      .content {
        padding: 20px;
      }
      
      .student-line {
        flex-direction: column;
        font-size: 15px;
      }
      
      .student-label {
        margin-bottom: 5px;
      }
      
      .code-number {
        font-size: 18px;
        padding: 16px;
        letter-spacing: 1px;
      }
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
      
      <h1 class="title">كود دفع الكورس</h1>

      <p class="description">
        تم إنشاء كود الدفع الخاص بك لإتمام الاشتراك في هذا الكورس
      </p>

      <!-- صندوق معلومات الطالب -->
      <div class="student-box">
        <div class="student-line">
          <span class="student-label">اسم الطالب:</span>
          <span class="student-value">عبد</span>
        </div>
        <div class="student-line">
          <span class="student-label">الرقم الجامعي:</span>
          <span class="student-value">${universityNumber}</span>
        </div>
      </div>

      <!-- صندوق الكود -->
      <div class="verification-box">
        <span class="verification-label">كود الدفع</span>
        
        <div class="verification-code">
          <span class="code-number">d4d7e7d7c4</span>
        </div>
      </div>

      <p class="instructions">
        بعد الدفع سيتم تفعيل اشتراكك في الكورس تلقائياً.<br>
        في حال وجود أي مشكلة يمكنك <a href="https://example.com/support" class="link">التواصل مع الدعم</a>.
      </p>

    </div>

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
      --shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
      --radius: 16px;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      margin: 0;
      padding: 20px;
      background-color: var(--background-page);
      direction: rtl;
      font-family: 'Segoe UI', 'Tahoma', 'Arial', sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
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
      background-color: var(--primary-color);
      padding: 5px 0 15px;
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
      border-radius: 8px;
    }
    
    .content {
      padding: 35px 30px;
    }
    
    .title {
      text-align: center;
      font-size: 26px;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 16px;
      line-height: 1.4;
    }
    
    .title-icon {
      font-size: 26px;
    }
    
    .description {
      text-align: center;
      font-size: 15.5px;
      line-height: 1.7;
      color: var(--text-light);
      margin-bottom: 32px;
      padding: 0 10px;
    }
    
    .verification-box {
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      padding: 28px 20px;
      margin: 30px 0;
      background-color: var(--background-light);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .verification-label {
      font-size: 18px;
      color: var(--text-dark);
      text-align: center;
      font-weight: 700;
      margin-bottom: 22px;
      display: block;
    }
    
    .verification-code {
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px auto;
      text-align: center;
      width: 100%;
      max-width: 320px;
    }
    
    .verification-code:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(7, 59, 116, 0.15);
    }
    
    .code-number {
      color: var(--primary-color);
      font-size: 24px;
      font-weight: 800;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      background-color: var(--secondary-color);
      border: 2px dashed var(--primary-color);
      padding: 22px 30px;
      border-radius: 14px;
      display: block;
      margin: 0;
      width: 100%;
      user-select: all;
    }
    
    .copy-success {
      color: var(--success);
      font-size: 13.5px;
      margin-top: 12px;
      text-align: center;
      opacity: 0;
      height: 0;
      overflow: hidden;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .copy-success.show {
      opacity: 1;
      height: 22px;
    }
    
    .time-info {
      font-size: 14.5px;
      color: var(--text-light);
      text-align: center;
      margin-top: 26px;
      line-height: 1.7;
    }
    
    .timer {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      background: #fff9e6;
      padding: 8px 16px;
      border-radius: 25px;
      border: 1px solid #ffeaa7;
    }

        .timer-icon {
      font-size: 18px;
    }
    
    .timer-text {
      color: var(--text-dark);
    }
    
    .highlight {
      color: var(--primary);
      font-weight: 700;
    }
    
    .instructions {
      font-size: 14px;
      line-height: 1.7;
      color: var(--text-medium);
      text-align: right;
      margin-top: 26px;
      padding: 0 5px;
      background: #f9f9f9;
      padding: 16px;
      border-radius: 12px;
      border-right: 4px solid var(--primary);
    }
    
    .instruction-title {
      font-weight: 600;
      color: var(--primary-dark);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .instruction-steps {
      margin-right: 24px;
      margin-top: 10px;
    }
    
    .step {
      margin-bottom: 8px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    
    .step-number {
      background: var(--primary-color);
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .warning-box {
      margin-top: 28px;
      background-color: #fff9e6;
      border-right: 4px solid var(--warning);
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
      color: var(--warning);
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .warning-text {
      font-size: 13.5px;
      color: var(--text-medium);
      text-align: right;
      line-height: 1.7;
    }
    
    .alert {
      color: var(--warning);
      font-weight: 700;
    }
    
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
      color: var(--primary);
      font-weight: 700;
    }
    
    .link {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }
    
    .link:hover {
      text-decoration: underline;
      color: var(--primary-dark);
    }
    
    /* استعلامات الوسائط المحسنة */
    @media (max-width: 550px) {
      body {
        padding: 15px;
      }
      
      .container {
        border-radius: 16px;
        max-width: 100%;
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
      
      .title-icon {
        font-size: 24px;
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
    
    @media (max-width: 400px) {
      .content {
        padding: 20px 16px;
      }
      
      .title {
        font-size: 20px;
        flex-direction: column;
        gap: 5px;
      }
      
      .description {
        font-size: 14px;
      }
      
      .code-number {
        font-size: 20px;
        letter-spacing: 2px;
        padding: 14px 16px;
      }
      
      .verification-box {
        padding: 20px 16px;
      }
      
      .instruction-steps {
        margin-right: 20px;
      }
    }
    
    /* تأثيرات النسخ */
    .copied {
      animation: copyEffect 0.5s ease;
    }
    
    @keyframes copyEffect {
      0% { transform: scale(1); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
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
        <span class="title-icon">🔒</span>
        طلب إعادة تعيين كلمة المرور
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
        <div id="verificationCode" class="verification-code">
          <span class="code-number">${otp}</span>
        </div>
        
        <!-- رسالة نجاح النسخ -->
        <div id="copySuccessMessage" class="copy-success">
          ✓ تم نسخ الرمز بنجاح إلى الحافظة
        </div>
        
        <!-- معلومات الصلاحية -->
        <div class="time-info">
          <div class="timer">
            <span class="timer-icon">⏱️</span>
            <span class="timer-text">
              هذا الرمز صالح لمدة <span class="highlight">10 دقائق</span> فقط
            </span>
          </div>
          <div style="font-size: 13px; color: #c97a7a; margin-top: 8px;">
            (انقر على الرمز أعلاه لنسخه)
          </div>
        </div>
      </div>

      <!-- التعليمات -->
      <div class="instructions">
        <div class="instruction-title">
          📝 تعليمات الاستخدام:
        </div>
        <div class="instruction-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div>انسخ الرمز أعلاه بالنقر عليه</div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div>ارجع إلى التطبيق وأدخل الرمز في الحقل المخصص</div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div>أنشئ كلمة مرور جديدة قوية لحسابك</div>
          </div>
        </div>
      </div>

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
      فريق <span class="brand">هكرها</span> – كلية الهندسة المعلوماتية، جامعة حلب<br>
      جميع الحقوق محفوظة © 2025<br>
      هذه رسالة آلية، الرجاء عدم الرد على هذا البريد.<br>
      <small style="color: #aaa; font-size: 11px;">
        للحصول على المساعدة، <a href="https://example.com/support" class="link">اتصل بالدعم</a>
      </small>
    </div>
  </div>
</body>
</html>
`;
