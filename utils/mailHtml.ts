export const html = (otp: string) => `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>رمز التحقق - هكرها</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        
        body {
            font-family: 'Tajawal', sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            color: #333;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
            padding: 30px;
            text-align: center;
        }
        
        .logo {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
        }
        
        .content {
            padding: 30px;
        }
        
        h1 {
            color: #2d3748;
            margin-top: 0;
            font-size: 24px;
        }
        
        .otp-box {
            background-color: #f8f9fa;
            border: 1px dashed #d1d5db;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
        }
        
        .otp {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 3px;
            color: #6e48aa;
        }
        
        .note {
            background-color: #f0f4f8;
            padding: 15px;
            border-radius: 8px;
            font-size: 14px;
            color: #4a5568;
            border-right: 4px solid #6e48aa;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            color: #718096;
            font-size: 12px;
        }
        
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">هكرها</h1>
        </div>
        
        <div class="content">
            <h1>مرحباً بك في هكرها!</h1>
            <p>شكراً لتسجيلك في منصتنا. يرجى استخدام رمز التحقق التالي لإكمال عملية التسجيل:</p>
            
            <div class="otp-box">
                <p style="margin-top: 0;">رمز التحقق الخاص بك هو:</p>
                <div class="otp">${otp}</div>
                <p style="margin-bottom: 0;">صالح لمدة 10 دقائق</p>
            </div>
            
            <p class="note">
                <strong>ملاحظة:</strong> لا تشارك هذا الرمز مع أي شخص. فريق هكرها لن يطلب منك أبداً مشاركة رمز التحقق الخاص بك.
            </p>
            
            <p>إذا لم تطلب هذا الرمز، يرجى تجاهل هذه الرسالة أو <a href="mailto:support@hackit.com">الاتصال بنا</a>.</p>
        </div>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} هكرها. جميع الحقوق محفوظة.</p>
            <p>هذه رسالة تلقائية، يرجى عدم الرد عليها.</p>
        </div>
    </div>
</body>
</html>`;

export const welcomeTeacherHtml = (email: string, password: string) => `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مرحباً بك - Universe_o7</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        
        body {
            font-family: 'Tajawal', sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            color: #333;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #2c7744 0%, #5a9367 100%);
            padding: 30px;
            text-align: center;
        }
        
        .logo {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
        }
        
        .content {
            padding: 30px;
        }
        
        h1 {
            color: #2d3748;
            margin-top: 0;
            font-size: 24px;
            text-align: center;
        }
        
        .welcome-icon {
            text-align: center;
            margin: 20px 0;
            font-size: 48px;
            color: #2c7744;
        }
        
        .login-info {
            background-color: #f8f9fa;
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
        }
        
        .credentials {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 15px;
            margin: 15px 0;
        }
        
        .credential-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
            padding: 8px;
            background-color: #f9fafb;
            border-radius: 4px;
        }
        
        .credential-label {
            font-weight: 600;
            color: #374151;
        }
        
        .credential-value {
            font-family: 'Courier New', monospace;
            background-color: #1f2937;
            color: #10b981;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: 600;
        }
        
        .security-note {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 12px;
            margin: 15px 0;
            font-size: 14px;
            color: #92400e;
        }
        
        .warning-icon {
            color: #f59e0b;
            margin-left: 5px;
        }
        
        .features {
            margin: 25px 0;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            margin: 15px 0;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 6px;
        }
        
        .feature-icon {
            font-size: 20px;
            margin-left: 15px;
            color: #2c7744;
            min-width: 30px;
            text-align: center;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            color: #718096;
            font-size: 12px;
        }
        
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #2c7744 0%, #5a9367 100%);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 20px 0;
        }
        
        .center {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">هكرها</h1>
        </div>
        
        <div class="content">
            <h1>مرحباً بك في عائلة هكرها</h1>
            
            <div class="welcome-icon">
                🎓
            </div>
            
            <p>عزيزي المعلم،</p>
            <p>نحن سعداء جداً بانضمامك إلينا كمعلم في منصتنا. خبرتك ومعرفتك ستكون إضافة قيمة لمجتمعنا التعليمي.</p>
            
            <div class="login-info">
                <h3 style="color: #2c7744; margin-top: 0;">معلومات الدخول إلى حسابك:</h3>
                
                <div class="credentials">
                    <div class="credential-item">
                        <span class="credential-label">البريد الإلكتروني:</span>
                        <span class="credential-value">${email}</span>
                    </div>
                    
                    <div class="credential-item">
                        <span class="credential-label">كلمة السر:</span>
                        <span class="credential-value">${password}</span>
                    </div>
                </div>
                
                <div class="security-note">
                    <span class="warning-icon">⚠️</span>
                    <strong>هام:</strong> يرجى حفظ هذه المعلومات في مكان آمن وتغيير كلمة السر بعد أول دخول إلى حسابك.
                </div>
            </div>
            
            <p>نحن هنا لدعمك في رحلتك التعليمية. إذا كان لديك أي استفسارات أو تحتاج إلى مساعدة، فلا تتردد في التواصل مع فريق الدعم الخاص بنا.</p>
            
            <p style="text-align: center; color: #718096; font-size: 14px;">
                مع فائق التقدير،<br>
                <strong>فريق هكرها</strong>
            </p>
        </div>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} هكرها. جميع الحقوق محفوظة.</p>
            <p>هذه رسالة تلقائية، يرجى عدم الرد عليها.</p>
            <p>للتواصل: <a href="mailto:teachers@hackerha.com" style="color: #2c7744;">teachers@hackerha.com</a></p>
        </div>
    </div>
</body>
</html>`;