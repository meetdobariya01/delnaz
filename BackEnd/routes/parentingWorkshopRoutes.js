const express = require('express');
const router = express.Router();

// ============================================
// PARENTING WORKSHOP FORM EMAIL TEMPLATES
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

          <div class="section">
            <div class="section-title">⚠️ Current Challenges</div>
            <div class="field"><div class="label">Challenges:</div><div class="value">${data.challenges?.length ? data.challenges.map(c => `<span class="badge">${c}</span>`).join('') : "None selected"}</div></div>
            <div class="field"><div class="label">Response Style:</div><div class="value">${data.responseStyle || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">💭 Emotional Climate</div>
            <div class="field"><div class="label">Parent's Emotions:</div><div class="value">${data.emotions?.length ? data.emotions.map(e => `<span class="badge">${e}</span>`).join('') : "None selected"}</div></div>
            <div class="field"><div class="label">Connection Level:</div><div class="value">${data.connection}/10</div></div>
            <div class="field"><div class="label">Child's Emotion:</div><div class="value">${data.childEmotion || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">🧠 Parent's Inner World</div>
            <div class="field"><div class="label">Triggers:</div><div class="value">${data.triggers?.length ? data.triggers.map(t => `<span class="badge">${t}</span>`).join('') : "None selected"}</div></div>
            <div class="field"><div class="label">Discipline Style:</div><div class="value">${data.disciplineStyle || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">🎯 Goals & Expectations</div>
            <div class="field"><div class="label">Goals:</div><div class="value">${data.goals?.length ? data.goals.map(g => `<span class="badge">${g}</span>`).join('') : "None selected"}</div></div>
            <div class="field"><div class="label">Expected Change:</div><div class="value">${data.workshopChange || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">🌟 Readiness & Reflection</div>
            <div class="field"><div class="label">Openness Level:</div><div class="value">${data.openness || "Not specified"}</div></div>
            <div class="field"><div class="label">Future Hope:</div><div class="value">${data.futureSentence || "Not specified"}</div></div>
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
          <p>Thank you for completing the Parenting Workshop Reflection Questionnaire. We're honored that you've trusted us with your parenting journey.</p>
          
          <div class="info">
            <h3 style="margin-top:0;">✨ What happens next?</h3>
            <p>Our team has received your responses and will:</p>
            <ul>
              <li>Review your questionnaire within 24-48 hours</li>
              <li>Send you personalized workshop recommendations</li>
              <li>Share resources tailored to your specific challenges</li>
              <li>Contact you via email or phone to schedule your preferred workshop slot</li>
            </ul>
          </div>

          <div class="next-steps">
            <h3 style="margin-top:0;">💡 Quick Tips While You Wait</h3>
            <ul>
              <li>📝 Start a simple "emotion journal" for 5 minutes daily</li>
              <li>🎯 Practice one moment of deep breathing before responding to your child</li>
              <li>❤️ Remember: Imperfect parenting is still powerful parenting</li>
            </ul>
          </div>

          <p>If you have any urgent questions, please reach out to us at:</p>
          <p><strong>📧 ${process.env.SUPPORT_EMAIL || 'support@parentingworkshop.com'}</strong><br>
          <strong>📞 ${process.env.SUPPORT_PHONE || '+91 XXXXXXXXXX'}</strong></p>

          <div class="footer">
            <p>With warmth and understanding,<br><strong>The Parenting Workshop Team</strong></p>
            <small>This is an automated confirmation. Our team will personally reach out to you soon.</small>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function to create transporter (assuming it's passed or created)
const sendEmails = async (transporter, formData, adminEmail) => {
  // Send email to admin
  const adminMailOptions = {
    from: `"Parenting Workshop" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `🌱 New Parenting Workshop Registration - ${formData.firstName} ${formData.lastName}`,
    html: getParentingWorkshopAdminTemplate(formData),
  };

  // Send confirmation email to user
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
};

// POST endpoint for parenting workshop form
const parentingWorkshopRoutes = (transporter) => {
  router.post('/submit-parenting-form', async (req, res) => {
    try {
      const formData = req.body;

      console.log('📝 Received parenting workshop submission:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      });

      // Validate required fields
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

      // Send emails
      await sendEmails(transporter, formData, process.env.ADMIN_EMAIL);

      console.log('✅ Parenting workshop emails sent successfully for:', formData.email);

      res.status(200).json({
        success: true,
        message: 'Form submitted successfully! We will contact you soon.',
      });
    } catch (error) {
      console.error('❌ Error sending parenting workshop email:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.',
        error: error.message,
      });
    }
  });

  return router;
};

module.exports = parentingWorkshopRoutes;