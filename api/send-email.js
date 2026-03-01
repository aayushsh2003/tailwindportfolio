import nodemailer from "nodemailer";

export default async function handler(req, res) {

  const origin = req.headers.origin || "";

  if (!origin.includes("aayush-ki-pehchan.vercel.app")) {
    return res.status(403).json({ success: false });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    /* ================= EMAIL TO YOU ================= */

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Portfolio Message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2 style="color:#4f46e5">New Contact Form Message</h2>

          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject || "No subject"}</p>

          <hr>

          <p style="white-space:pre-line">${message}</p>
        </div>
      `
    });

    /* ================= AUTO REPLY TO VISITOR ================= */

    await transporter.sendMail({
      from: `"Aayush Sharma" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "I received your message! ✔",
      html: `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:30px">
        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:12px">

          <h2 style="color:#4f46e5">Hello ${name}! 👋</h2>

          <p>Thank you for contacting me through my portfolio website.</p>

          <p>I have successfully received your message and I will reply to you as soon as possible (usually within 24 hours).</p>

          <hr>

          <h3>Your Message:</h3>
          <p style="background:#f1f5f9;padding:12px;border-radius:8px">
            ${message}
          </p>

          <br>

          <p>You can also reach me here:</p>

          <p>
            🔗 LinkedIn: https://www.linkedin.com/in/aayush-sharma-a44062299/ <br>
            💻 GitHub: https://github.com/aayushsh2003
          </p>

          <br>

          <p style="margin-top:25px">
            Regards,<br>
            <b>Aayush Sharma</b><br>
            Aspiring Software Developer
          </p>

        </div>
      </div>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
