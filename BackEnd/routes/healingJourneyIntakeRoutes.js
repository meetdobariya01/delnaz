const express = require('express');
const router = express.Router();

// ============================================
// HEALING JOURNEY INTAKE FORM EMAIL TEMPLATES
// ============================================

const getHealingJourneyIntakeAdminTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 25px; border-bottom: 1px solid #e0e0e0; padding-bottom: 15px; }
        .section-title { background: #11998e; color: white; padding: 8px 15px; border-radius: 20px; display: inline-block; font-size: 14px; margin-bottom: 15px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #11998e; margin-bottom: 5px; font-size: 14px; }
        .value { background: white; padding: 8px 12px; border-radius: 5px; border-left: 3px solid #11998e; margin-top: 3px; white-space: pre-wrap; }
        .badge { display: inline-block; background: #e0e0e0; padding: 4px 10px; border-radius: 15px; margin: 3px; font-size: 12px; }
        h2 { color: #11998e; margin-top: 0; }
        .contact-info { background: #e8f0fe; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🌿 New Intake & Consultation Form Submission</h2>
        </div>
        <div class="content">
          <div class="contact-info">
            <h3 style="margin-top:0;">📋 Personal Information</h3>
            <div class="field"><div class="label">👤 Name:</div><div class="value">${data.surname} ${data.forename}</div></div>
            <div class="field"><div class="label">✨ Preferred Name:</div><div class="value">${data.preferredName || "Not specified"}</div></div>
            <div class="field"><div class="label">🎂 Date of Birth:</div><div class="value">${data.dob || "Not specified"}</div></div>
            <div class="field"><div class="label">📍 Address:</div><div class="value">${data.address || "Not specified"}</div></div>
            <div class="field"><div class="label">💑 Relationship Status:</div><div class="value">${data.relationshipStatus || "Not specified"}</div></div>
            <div class="field"><div class="label">💼 Occupation:</div><div class="value">${data.occupation || "Not specified"}</div></div>
            <div class="field"><div class="label">📧 Email:</div><div class="value">${data.email}</div></div>
            <div class="field"><div class="label">📞 Phone:</div><div class="value">${data.phone}</div></div>
            <div class="field"><div class="label">🚨 Emergency Contact:</div><div class="value">${data.emergencyName || "Not specified"} - ${data.emergencyPhone || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">🏥 Health Information</div>
            <div class="field"><div class="label">Doctor's Details:</div><div class="value">${data.doctorDetails || "Not specified"}</div></div>
            <div class="field"><div class="label">Medication:</div><div class="value">${data.medication || "Not specified"}</div></div>
            <div class="field"><div class="label">Medical Conditions:</div><div class="value">${data.medicalConditions || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">⚠️ Areas of Concern</div>
            <div class="field"><div class="label">Concerns:</div><div class="value">${data.concerns?.length ? data.concerns.map(c => `<span class="badge">${c}</span>`).join('') : "None selected"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">📝 Consultation Questions</div>
            <div class="field"><div class="label">1. Most important issue/problem:</div><div class="value">${data.q1 || "Not answered"}</div></div>
            <div class="field"><div class="label">2. How does that make you feel?:</div><div class="value">${data.q2 || "Not answered"}</div></div>
            <div class="field"><div class="label">3. Worst thing about this problem:</div><div class="value">${data.q3 || "Not answered"}</div></div>
            <div class="field"><div class="label">4. What makes you angry and why?:</div><div class="value">${data.q4 || "Not answered"}</div></div>
            <div class="field"><div class="label">5. Biggest regret or sadness?:</div><div class="value">${data.q5 || "Not answered"}</div></div>
            <div class="field"><div class="label">6. What would change if successful?:</div><div class="value">${data.q6 || "Not answered"}</div></div>
            <div class="field"><div class="label">7. Strengths you're bringing:</div><div class="value">${data.q7 || "Not answered"}</div></div>
            <div class="field"><div class="label">8. How would you know sessions were successful?:</div><div class="value">${data.q8 || "Not answered"}</div></div>
            <div class="field"><div class="label">9. Repetitive thoughts/beliefs:</div><div class="value">${data.q9 || "Not answered"}</div></div>
            <div class="field"><div class="label">10. What have you tried before?:</div><div class="value">${data.q10 || "Not answered"}</div></div>
            <div class="field"><div class="label">11. Concerns about sessions not working:</div><div class="value">${data.q11 || "Not answered"}</div></div>
            <div class="field"><div class="label">12. Time willing to invest at home:</div><div class="value">${data.q12 || "Not answered"}</div></div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getHealingJourneyIntakeClientTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .thankyou { font-size: 18px; color: #11998e; margin-bottom: 20px; }
        .info { margin: 20px 0; background: #e8f0fe; padding: 15px; border-radius: 10px; }
        .next-steps { background: #fff3e0; padding: 15px; border-radius: 10px; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
        h3 { color: #11998e; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🌿 Thank You for Your Submission!</h2>
        </div>
        <div class="content">
          <div class="thankyou">
            Dear ${data.forename} ${data.surname},
          </div>
          <p>Thank you for completing the Intake & Consultation Form. We appreciate you taking this important step in your healing journey.</p>
          
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
          <p><strong>📧 ${process.env.SUPPORT_EMAIL || 'support@healingjourney.com'}</strong><br>
          <strong>📞 ${process.env.SUPPORT_PHONE || '+91 XXXXXXXXXX'}</strong></p>

          <div class="footer">
            <p>With compassion and care,<br><strong>The Healing Journey Team</strong></p>
            <small>This is an automated confirmation. We'll personally connect with you soon.</small>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function to send emails
const sendHealingJourneyIntakeEmails = async (transporter, formData, adminEmail) => {
  const adminMailOptions = {
    from: `"Healing Journey" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `🌿 New Intake Form Submission - ${formData.forename} ${formData.surname}`,
    html: getHealingJourneyIntakeAdminTemplate(formData),
  };

  const clientMailOptions = {
    from: `"Healing Journey" <${process.env.EMAIL_USER}>`,
    to: formData.email,
    subject: 'Thank you for your Intake & Consultation Form Submission',
    html: getHealingJourneyIntakeClientTemplate(formData),
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(clientMailOptions),
  ]);
};

// POST endpoint for healing journey intake form
const healingJourneyIntakeRoutes = (transporter) => {
  router.post('/submit-healing-journey-intake', async (req, res) => {
    try {
      const formData = req.body;

      console.log('📝 Received healing journey intake submission:', {
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

      // Send emails
      await sendHealingJourneyIntakeEmails(transporter, formData, process.env.ADMIN_EMAIL);

      console.log('✅ Healing journey intake emails sent successfully for:', formData.email);

      res.status(200).json({
        success: true,
        message: 'Form submitted successfully! We will contact you soon.',
      });
    } catch (error) {
      console.error('❌ Error sending healing journey intake email:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.',
        error: error.message,
      });
    }
  });

  return router;
};

module.exports = healingJourneyIntakeRoutes;