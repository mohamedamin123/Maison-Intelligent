package com.example.userservice.util;

public class EmailText {

    public static String forgotPassword(String code) {
        return String.format("""
<html>
<head>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f9f9f9;
            padding: 40px;
            margin: 0;
        }
        .container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            max-width: 600px;
            margin: auto;
            color: #333333;
        }
        h1 {
            color: #4C9EE3;
            font-size: 28px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 16px;
        }
        .code {
            font-size: 26px;
            font-weight: 600;
            color: #4C9EE3;
            background-color: #e6f2fb;
            padding: 14px 24px;
            border-radius: 10px;
            display: inline-block;
            letter-spacing: 2px;
            margin: 20px 0;
        }
        .footer {
            font-size: 13px;
            color: #999999;
            margin-top: 40px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Réinitialisation de votre mot de passe</h1>
        <p>Bonjour 👋</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe pour votre compte <strong>SmartHome</strong>.</p>
        <p>Voici votre code de vérification :</p>
        <div class="code">%s</div>
        <p>⏳ Ce code est valable pendant <strong>10 minutes</strong>.</p>
        <p>Si vous n’êtes pas à l’origine de cette demande, ignorez simplement ce message.</p>
        <p>Merci pour votre confiance 💡<br>L’équipe <strong>SmartHome</strong></p>
        <div class="footer">Ceci est un message automatique, merci de ne pas y répondre.</div>
    </div>
</body>
</html>
""", code);
    }

    public static String welcomeUser() {
        return """
<html>
<head>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            padding: 40px;
            margin: 0;
        }
        .container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            max-width: 600px;
            margin: auto;
            color: #333333;
        }
        h1 {
            color: #4C9EE3;
            font-size: 28px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 16px;
        }
        .highlight {
            font-weight: bold;
            color: #4C9EE3;
        }
        .footer {
            font-size: 13px;
            color: #999999;
            margin-top: 40px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bienvenue chez SmartHome</h1>
        <p>Bonjour 👋</p>
        <p>Nous sommes ravis de vous accueillir dans votre nouvelle maison intelligente 🏠✨</p>
        <p>Votre compte <strong>SmartHome</strong> est maintenant activé.</p>
        <p>Vous pouvez dès à présent surveiller vos capteurs, contrôler vos équipements et recevoir des alertes en temps réel.</p>
        <p>Merci de votre confiance 💙<br>L’équipe <strong>SmartHome</strong></p>
        <div class="footer">Ceci est un message automatique, merci de ne pas y répondre.</div>
    </div>
</body>
</html>
""";
    }

}
