// /netlify/functions/submitForm.js
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const formData = JSON.parse(event.body || "{}");
  const captchaToken = formData["g-recaptcha-response"];

  const verifyCaptcha = async (token) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    });

    return res.json();
  };

  const captcha = await verifyCaptcha(captchaToken);

  if (!captcha.success || captcha.score < 0.5) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: "reCAPTCHA failed",
        details: captcha,
      }),
    };
  }

  // ✅ Captcha passed, continue with your form logic
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Form submitted successfully!" }),
  };
}
