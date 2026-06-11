const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// EMAIL TRANSPORTER FOR HOSTINGER - TLS ON PORT 587
// ============================================
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true, // MUST be true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:');
    console.log(error);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure EMAIL_PORT=587 and secure: false');
    console.log('2. Verify email password is correct');
    console.log('3. Check if email account is active in Hostinger');
  } else {
    console.log('✅ Email server is ready to send messages');
    console.log(`📧 Host: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
    console.log(`📧 User: ${process.env.EMAIL_USER}`);
  }
});

// Email templates (keep your existing templates)
const getAdminEmailTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
        .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #667eea; }
        h2 { color: #667eea; margin-top: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📋 New Session Request</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">👤 First Name:</div>
            <div class="value">${data.firstName}</div>
          </div>
          <div class="field">
            <div class="label">👤 Last Name:</div>
            <div class="value">${data.lastName}</div>
          </div>
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">📞 Phone:</div>
            <div class="value">${data.phone}</div>
          </div>
          <div class="field">
            <div class="label">💼 Service:</div>
            <div class="value">${data.service}</div>
          </div>
          <div class="field">
            <div class="label">💬 Message:</div>
            <div class="value">${data.message || 'No message provided'}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getClientEmailTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .thankyou { font-size: 18px; color: #667eea; margin-bottom: 20px; }
        .info { margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>✨ Thank You for Reaching Out!</h2>
        </div>
        <div class="content">
          <div class="thankyou">
            Dear ${data.firstName} ${data.lastName},
          </div>
          <p>Thank you for requesting a curated mini session with Delnaz Medora.</p>
          <div class="info">
            <p><strong>Your request details:</strong></p>
            <ul>
              <li>Service: ${data.service}</li>
              <li>We will contact you at: ${data.email} or ${data.phone}</li>
            </ul>
          </div>
          <p>We have received your request and will get back to you within 24-48 hours.</p>
          <p>If you need immediate assistance, please call us at +91 XXXXXXXXXX.</p>
          <div class="footer">
            <p>Best regards,<br>Delnaz Medora Team</p>
            <small>This is an automated response. Please do not reply to this email.</small>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// API endpoint
app.post('/api/submit-form', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, message } = req.body;

    console.log('📝 Received form submission:', { firstName, lastName, email, phone, service });

    if (!firstName || !lastName || !email || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const formData = { firstName, lastName, email, phone, service, message };

    const adminMailOptions = {
      from: `"Delnaz Medora Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Session Request: ${service} - ${firstName} ${lastName}`,
      html: getAdminEmailTemplate(formData),
    };

    const clientMailOptions = {
      from: `"Delnaz Medora" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for your session request',
      html: getClientEmailTemplate(formData),
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    console.log('✅ Emails sent successfully for:', email);

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully! We will contact you soon.',
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: error.message,
    });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    emailConfigured: true,
    smtpHost: process.env.EMAIL_HOST,
    smtpPort: parseInt(process.env.EMAIL_PORT)
  });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Form endpoint: http://localhost:${PORT}/api/submit-form`);
});