const express = require('express');
const router = express.Router();

// ============================================
// WORKSHOP BOOKING FORM EMAIL TEMPLATES
// ============================================

const getWorkshopBookingAdminTemplate = (data) => {
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
        .workshop-details { background: #e8f0fe; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📚 New Workshop Booking Request</h2>
        </div>
        <div class="content">
          <div class="workshop-details">
            <h3 style="margin-top:0;">🎯 Workshop Details</h3>
            <div class="field">
              <div class="label">📖 Workshop:</div>
              <div class="value">${data.workshopTitle}</div>
            </div>
            <div class="field">
              <div class="label">💰 Price:</div>
              <div class="value">${data.workshopPrice}</div>
            </div>
          </div>

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
            <div class="label">💬 Message:</div>
            <div class="value">${data.message || 'No message provided'}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getWorkshopBookingClientTemplate = (data) => {
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
        .workshop-confirm { background: #fff3e0; padding: 15px; border-radius: 10px; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
        h3 { color: #667eea; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📚 Workshop Booking Confirmation</h2>
        </div>
        <div class="content">
          <div class="thankyou">
            Dear ${data.firstName} ${data.lastName},
          </div>
          <p>Thank you for your interest in our workshop! We've received your booking request.</p>
          
          <div class="workshop-confirm">
            <h3 style="margin-top:0;">🎯 Your Selected Workshop:</h3>
            <p><strong>${data.workshopTitle}</strong></p>
            <p><strong>Price:</strong> ${data.workshopPrice}</p>
          </div>

          <div class="info">
            <h3 style="margin-top:0;">✨ What happens next?</h3>
            <p>Our team will:</p>
            <ul>
              <li>Confirm your spot within 24 hours</li>
              <li>Send you payment details and instructions</li>
              <li>Share the workshop schedule and preparation materials</li>
              <li>Answer any questions you may have</li>
            </ul>
          </div>

          <p>If you have any urgent questions, please contact us at:</p>
          <p><strong>📧 ${process.env.SUPPORT_EMAIL || 'support@workshops.com'}</strong><br>
          <strong>📞 ${process.env.SUPPORT_PHONE || '+91 XXXXXXXXXX'}</strong></p>

          <div class="footer">
            <p>Best regards,<br><strong>Workshop Team</strong></p>
            <small>This is an automated confirmation. We'll personally connect with you soon.</small>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function to send emails
const sendWorkshopBookingEmails = async (transporter, formData, adminEmail) => {
  const adminMailOptions = {
    from: `"Workshop Bookings" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `📚 New Workshop Booking: ${formData.workshopTitle} - ${formData.firstName} ${formData.lastName}`,
    html: getWorkshopBookingAdminTemplate(formData),
  };

  const clientMailOptions = {
    from: `"Workshop Team" <${process.env.EMAIL_USER}>`,
    to: formData.email,
    subject: `Workshop Booking Confirmation: ${formData.workshopTitle}`,
    html: getWorkshopBookingClientTemplate(formData),
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(clientMailOptions),
  ]);
};

// POST endpoint for workshop booking form
const workshopBookingRoutes = (transporter) => {
  router.post('/submit-workshop-booking', async (req, res) => {
    try {
      const formData = req.body;

      console.log('📝 Received workshop booking:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        workshopTitle: formData.workshopTitle,
      });

      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.workshopTitle) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all required fields',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address',
        });
      }

      // Send emails
      await sendWorkshopBookingEmails(transporter, formData, process.env.ADMIN_EMAIL);

      console.log('✅ Workshop booking emails sent successfully for:', formData.email);

      res.status(200).json({
        success: true,
        message: 'Booking request submitted successfully! We will contact you soon.',
      });
    } catch (error) {
      console.error('❌ Error sending workshop booking email:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.',
        error: error.message,
      });
    }
  });

  return router;
};

module.exports = workshopBookingRoutes;