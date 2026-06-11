const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ============================================
// EMAIL TRANSPORTER - MUST BE DEFINED BEFORE ROUTES
// ============================================
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
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
  } else {
    console.log('✅ Email server is ready to send messages');
    console.log(`📧 Host: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`);
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// IMPORT ROUTES
// ============================================
const healingJourneyRoutes = require('./routes/healingJourneyRoutes');
const healingJourneyIntakeRoutes = require('./routes/healingJourneyIntakeRoutes');
const workshopBookingRoutes = require('./routes/workshopBookingRoutes');

// ============================================
// USE ROUTES
// ============================================
app.use('/api', healingJourneyRoutes(transporter));
app.use('/api', healingJourneyIntakeRoutes(transporter));
app.use('/api', workshopBookingRoutes(transporter));

// ============================================
// CONTACT FORM EMAIL TEMPLATES & ENDPOINT
// ============================================
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

// Contact Form Endpoint
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

// ============================================
// PARENTING WORKSHOP FORM EMAIL TEMPLATES & ENDPOINT
// ============================================
const getParentingWorkshopAdminTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 25px; border-bottom: 1px solid #e0e0e0; padding-bottom: 15px; }
        .section-title { background: #667eea; color: white; padding: 8px 15px; border-radius: 20px; display: inline-block; font-size: 14px; margin-bottom: 15px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #667eea; margin-bottom: 5px; font-size: 14px; }
        .value { background: white; padding: 8px 12px; border-radius: 5px; border-left: 3px solid #667eea; margin-top: 3px; }
        .badge { display: inline-block; background: #e0e0e0; padding: 4px 10px; border-radius: 15px; margin: 3px; font-size: 12px; }
        h2 { color: #667eea; margin-top: 0; }
        .contact-info { background: #e8f0fe; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🌱 New Parenting Workshop Registration</h2>
        </div>
        <div class="content">
          <div class="contact-info">
            <h3 style="margin-top:0;">📋 Contact Information</h3>
            <div class="field">
              <div class="label">👤 Name:</div>
              <div class="value">${data.firstName} ${data.lastName}</div>
            </div>
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <div class="label">📞 Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
          </div>
          <div class="section">
            <div class="section-title">👶 About Your Child</div>
            <div class="field"><div class="label">Age:</div><div class="value">${data.age || "Not specified"}</div></div>
            <div class="field"><div class="label">Gender:</div><div class="value">${data.gender || "Not specified"}</div></div>
            <div class="field"><div class="label">Parent Role:</div><div class="value">${data.role || "Not specified"}</div></div>
            <div class="field"><div class="label">Number of Children:</div><div class="value">${data.childrenCount || "Not specified"}</div></div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getParentingWorkshopClientTemplate = (data) => {
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
        .info { margin: 20px 0; background: #e8f0fe; padding: 15px; border-radius: 10px; }
        .next-steps { background: #fff3e0; padding: 15px; border-radius: 10px; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
        h3 { color: #667eea; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🌱 Thank You for Registering!</h2>
        </div>
        <div class="content">
          <div class="thankyou">
            Dear ${data.firstName} ${data.lastName},
          </div>
          <p>Thank you for completing the Parenting Workshop Reflection Questionnaire.</p>
          <div class="next-steps">
            <h3 style="margin-top:0;">💡 Quick Tips While You Wait</h3>
            <ul>
              <li>📝 Start a simple "emotion journal" for 5 minutes daily</li>
              <li>🎯 Practice one moment of deep breathing before responding to your child</li>
            </ul>
          </div>
          <div class="footer">
            <p>With warmth and understanding,<br><strong>The Parenting Workshop Team</strong></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Parenting Workshop Form Endpoint
app.post('/api/submit-parenting-form', async (req, res) => {
  try {
    const formData = req.body;

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required contact information',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const adminMailOptions = {
      from: `"Parenting Workshop" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🌱 New Parenting Workshop Registration - ${formData.firstName} ${formData.lastName}`,
      html: getParentingWorkshopAdminTemplate(formData),
    };

    const clientMailOptions = {
      from: `"Parenting Workshop" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: 'Thank you for your Parenting Workshop Registration',
      html: getParentingWorkshopClientTemplate(formData),
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully! We will contact you soon.',
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    emailConfigured: true,
    smtpHost: process.env.EMAIL_HOST,
    smtpPort: parseInt(process.env.EMAIL_PORT),
    endpoints: {
      contactForm: 'POST /api/submit-form',
      parentingWorkshop: 'POST /api/submit-parenting-form',
      healingJourneyGroup: 'POST /api/submit-healing-journey',
      healingJourneyIntake: 'POST /api/submit-healing-journey-intake',
      workshopBooking: 'POST /api/submit-workshop-booking',
      health: 'GET /api/health'
    }
  });
});
// ============================================
// THERAPY INTAKE FORM EMAIL TEMPLATES
// ============================================

const getTherapyIntakeAdminTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 25px; border-bottom: 1px solid #e0e0e0; padding-bottom: 15px; }
        .section-title { background: #28a745; color: white; padding: 8px 15px; border-radius: 20px; display: inline-block; font-size: 14px; margin-bottom: 15px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #28a745; margin-bottom: 5px; font-size: 14px; }
        .value { background: white; padding: 8px 12px; border-radius: 5px; border-left: 3px solid #28a745; margin-top: 3px; white-space: pre-wrap; }
        .badge { display: inline-block; background: #e0e0e0; padding: 4px 10px; border-radius: 15px; margin: 3px; font-size: 12px; }
        h2 { color: #28a745; margin-top: 0; }
        .contact-info { background: #e8f0fe; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📋 New Therapy Intake Form Submission</h2>
        </div>
        <div class="content">
          <div class="contact-info">
            <h3 style="margin-top:0;">👤 Personal Information</h3>
            <div class="field"><div class="label">Surname:</div><div class="value">${data.surname}</div></div>
            <div class="field"><div class="label">Forename:</div><div class="value">${data.forename}</div></div>
            <div class="field"><div class="label">Preferred Name:</div><div class="value">${data.preferredName}</div></div>
            <div class="field"><div class="label">Age:</div><div class="value">${data.age}</div></div>
            <div class="field"><div class="label">Date of Birth:</div><div class="value">${data.dob}</div></div>
            <div class="field"><div class="label">Address:</div><div class="value">${data.address}</div></div>
            <div class="field"><div class="label">Marital Status:</div><div class="value">${data.maritalStatus}</div></div>
            <div class="field"><div class="label">Occupation:</div><div class="value">${data.occupation}</div></div>
          </div>

          <div class="section">
            <div class="section-title">📞 Contact Details</div>
            <div class="field"><div class="label">Email:</div><div class="value">${data.email}</div></div>
            <div class="field"><div class="label">Phone:</div><div class="value">${data.phone}</div></div>
            <div class="field"><div class="label">Emergency Contact:</div><div class="value">${data.emergencyContact}</div></div>
          </div>

          <div class="section">
            <div class="section-title">🏥 Health Information</div>
            <div class="field"><div class="label">Doctor's Details:</div><div class="value">${data.doctorDetails}</div></div>
            <div class="field"><div class="label">Last Checkup:</div><div class="value">${data.lastCheckup}</div></div>
            <div class="field"><div class="label">Medications:</div><div class="value">${data.medications}</div></div>
            <div class="field"><div class="label">Health Problems:</div><div class="value">${data.healthProblems}</div></div>
          </div>

          <div class="section">
            <div class="section-title">⚠️ Areas of Concern</div>
            <div class="field"><div class="label">Concerns:</div><div class="value">${data.concerns?.length ? data.concerns.map(c => `<span class="badge">${c}</span>`).join('') : "None selected"}</div></div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getTherapyIntakeClientTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .thankyou { font-size: 18px; color: #28a745; margin-bottom: 20px; }
        .info { margin: 20px 0; background: #e8f0fe; padding: 15px; border-radius: 10px; }
        .next-steps { background: #fff3e0; padding: 15px; border-radius: 10px; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
        h3 { color: #28a745; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📋 Thank You for Your Submission!</h2>
        </div>
        <div class="content">
          <div class="thankyou">
            Dear ${data.preferredName || data.forename},
          </div>
          <p>Thank you for completing the Therapy Intake Form. We appreciate you taking this important step in your healing journey.</p>
          
          <div class="info">
            <h3 style="margin-top:0;">✨ What happens next?</h3>
            <p>Our team has received your intake form and will:</p>
            <ul>
              <li>Review your responses within 24-48 hours</li>
              <li>Contact you to schedule your initial consultation</li>
              <li>Answer any questions you may have about the process</li>
            </ul>
          </div>

          <div class="next-steps">
            <h3 style="margin-top:0;">💡 What You Can Do While You Wait</h3>
            <ul>
              <li>📓 Start a journal to track your thoughts and feelings</li>
              <li>🧘‍♀️ Practice deep breathing when you feel overwhelmed</li>
              <li>💚 Be kind and patient with yourself</li>
            </ul>
          </div>

          <p>If you have any urgent questions, please contact us at:</p>
          <p><strong>📧 ${process.env.SUPPORT_EMAIL || 'support@therapy.com'}</strong><br>
          <strong>📞 ${process.env.SUPPORT_PHONE || '+91 XXXXXXXXXX'}</strong></p>

          <div class="footer">
            <p>With compassion and care,<br><strong>The Therapy Team</strong></p>
            <small>This is an automated confirmation. We'll personally connect with you soon.</small>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Add this endpoint to your server.js
app.post('/api/submit-therapy-intake', async (req, res) => {
  try {
    const formData = req.body;

    console.log('📝 Received therapy intake submission:', {
      surname: formData.surname,
      forename: formData.forename,
      email: formData.email,
      phone: formData.phone,
    });

    // Validate required fields
    if (!formData.surname || !formData.forename || !formData.email || !formData.phone) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required contact information',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Send email to admin
    const adminMailOptions = {
      from: `"Therapy Intake" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📋 New Therapy Intake Form - ${formData.forename} ${formData.surname}`,
      html: getTherapyIntakeAdminTemplate(formData),
    };

    // Send confirmation email to user
    const clientMailOptions = {
      from: `"Therapy Team" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: 'Thank you for your Therapy Intake Form Submission',
      html: getTherapyIntakeClientTemplate(formData),
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    console.log('✅ Therapy intake emails sent successfully for:', formData.email);

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully! We will contact you soon.',
    });
  } catch (error) {
    console.error('❌ Error sending therapy intake email:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: error.message,
    });
  }
});
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Available endpoints:`);
  console.log(`   - POST /api/submit-form`);
  console.log(`   - POST /api/submit-parenting-form`);
  console.log(`   - POST /api/submit-healing-journey`);
  console.log(`   - POST /api/submit-healing-journey-intake`);
  console.log(`   - POST /api/submit-workshop-booking`);
});