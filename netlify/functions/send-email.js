import fetch from 'node-fetch';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const formData = new URLSearchParams(event.body);
  const name = formData.get('name');
  const email = formData.get('email');
  const projectType = formData.get('project_type');
  const message = formData.get('message');

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Project Type:</strong> ${projectType}</p>
    <p><strong>Message:</strong><br>${message}</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Your Name <sebastiendolce@gmail.com>',
        to: 'sdolce@bitsimple.dev',
        subject: `New ${projectType} from ${name}`,
        html,
      }),
    });

    const data = await res.json();

    return {
      statusCode: res.ok ? 200 : res.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
}
