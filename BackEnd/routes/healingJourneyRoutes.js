const express = require('express');
const router = express.Router();

// ============================================
// HEALING JOURNEY FORM EMAIL TEMPLATES
// ============================================

const getHealingJourneyAdminTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .section { margin-bottom: 25px; border-bottom: 1px solid #e0e0e0; padding-bottom: 15px; }
        .section-title { background: #11998e; color: white; padding: 8px 15px; border-radius: 20px; display: inline-block; font-size: 14px; margin-bottom: 15px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #11998e; margin-bottom: 5px; font-size: 14px; }
        .value { background: white; padding: 8px 12px; border-radius: 5px; border-left: 3px solid #11998e; margin-top: 3px; }
        .badge { display: inline-block; background: #e0e0e0; padding: 4px 10px; border-radius: 15px; margin: 3px; font-size: 12px; }
        h2 { color: #11998e; margin-top: 0; }
        .contact-info { background: #e8f0fe; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
        .consent-badge { display: inline-block; background: #28a745; color: white; padding: 4px 10px; border-radius: 15px; margin: 3px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🌿 New Group Emotional Healing Session Registration</h2>
        </div>
        <div class="content">
          <div class="contact-info">
            <h3 style="margin-top:0;">📋 Contact Information</h3>
            <div class="field">
              <div class="label">👤 Full Name:</div>
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
            <div class="field">
              <div class="label">✨ Preferred Name:</div>
              <div class="value">${data.name || data.firstName}</div>
            </div>
            <div class="field">
              <div class="label">🎂 Age Range:</div>
              <div class="value">${data.ageRange || "Not specified"}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">💭 Emotional Themes & Challenges</div>
            <div class="field"><div class="label">Challenges:</div><div class="value">${data.emotionalThemes?.length ? data.emotionalThemes.map(t => `<span class="badge">${t}</span>`).join('') : "None selected"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">🧠 Self-Awareness & Emotional Capacity</div>
            <div class="field"><div class="label">Emotional Comfort:</div><div class="value">${data.emotionalComfort || "Not specified"}</div></div>
            <div class="field"><div class="label">Response to Emotions:</div><div class="value">${data.emotionalLandscape?.length ? data.emotionalLandscape.map(e => `<span class="badge">${e}</span>`).join('') : "Not specified"}</div></div>
            <div class="field"><div class="label">Listening Capacity:</div><div class="value">${data.groupComfort || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">🤝 Group Readiness</div>
            <div class="field"><div class="label">Sharing Comfort:</div><div class="value">${data.supportLevel || "Not specified"}</div></div>
            <div class="field"><div class="label">In Crisis:</div><div class="value">${data.crisis || "Not specified"} ${data.crisis === "Yes" ? `- Explanation: ${data.reflection || ""}` : ""}</div></div>
            <div class="field"><div class="label">Therapy Support:</div><div class="value">${data.therapySupport || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">⚡ Nervous System & Intentions</div>
            <div class="field"><div class="label">Nervous Response:</div><div class="value">${data.nervousResponse?.length ? data.nervousResponse.map(n => `<span class="badge">${n}</span>`).join('') : "Not specified"}</div></div>
            <div class="field"><div class="label">What called you:</div><div class="value">${data.readinessReason || "Not specified"}</div></div>
            <div class="field"><div class="label">Success Definition:</div><div class="value">${data.healingDefinition || "Not specified"}</div></div>
            <div class="field"><div class="label">Emotions to feel more of:</div><div class="value">${data.reflection || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">🎨 Voice, Identity & Healing Preferences</div>
            <div class="field"><div class="label">Self-Expression:</div><div class="value">${data.selfExpression || "Not specified"}</div></div>
            <div class="field"><div class="label">Healing Approaches:</div><div class="value">${data.healingApproach?.length ? data.healingApproach.map(h => `<span class="badge">${h}</span>`).join('') : "Not specified"}</div></div>
            <div class="field"><div class="label">Between-Sessions Openness:</div><div class="value">${data.betweenSessions || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">📅 Commitment & Expectations</div>
            <div class="field"><div class="label">Commitment Level:</div><div class="value">${data.commitment || "Not specified"}</div></div>
            <div class="field"><div class="label">Concerns:</div><div class="value">${data.concerns || "None specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">🍃 Letting Go</div>
            <div class="field"><div class="label">Ready to let go of:</div><div class="value">${data.lettingGo?.length ? data.lettingGo.map(l => `<span class="badge">${l}</span>`).join('') : "Not specified"}</div></div>
            <div class="field"><div class="label">Important to know:</div><div class="value">${data.reflection || "Not specified"}</div></div>
          </div>

          <div class="section">
            <div class="section-title">✅ Consents</div>
            <div class="field"><div class="label">Medical Disclaimer:</div><div class="value">${data.consentCare ? '<span class="consent-badge">✓ Accepted</span>' : '✗ Not accepted'}</div></div>
            <div class="field"><div class="label">Confidentiality:</div><div class="value">${data.consentConfidentiality ? '<span class="consent-badge">✓ Accepted</span>' : '✗ Not accepted'}</div></div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getHealingJourneyClientTemplate = (data) => {
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
          <h2>🌿 Thank You for Registering!</h2>
        </div>
        <div class="content">
          <div class="thankyou">
            Dear ${data.firstName} ${data.lastName},
          </div>
          <p>Thank you for taking this courageous step toward emotional healing. We're honored to be part of your journey.</p>
          
          <div class="info">
            <h3 style="margin-top:0;">✨ What happens next?</h3>
            <p>Our team has received your intake form and will:</p>
            <ul>
              <li>Review your responses within 24-48 hours</li>
              <li>Send you a personalized welcome email with group details</li>
              <li>Share preparation materials and session schedule</li>
              <li>Contact you for a brief check-in before the group begins</li>
            </ul>
          </div>

          <div class="next-steps">
            <h3 style="margin-top:0;">💡 Gentle Reminders</h3>
            <ul>
              <li>🧘‍♀️ You're not alone on this path</li>
              <li>📓 Keep a journal nearby during our sessions</li>
              <li>💚 Healing is not linear - there's no "right" way to feel</li>
              <li>🤝 The group holds space for every emotion you bring</li>
            </ul>
          </div>

          <p>If you have any urgent questions before we reach out, please contact us at:</p>
          <p><strong>📧 ${process.env.SUPPORT_EMAIL || 'support@healingjourney.com'}</strong><br>
          <strong>📞 ${process.env.SUPPORT_PHONE || '+91 XXXXXXXXXX'}</strong></p>

          <div class="footer">
            <p>With compassion and care,<br><strong>The Emotional Healing Team</strong></p>
            <small>This is an automated confirmation. We'll personally connect with you soon.</small>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function to send emails
const sendHealingJourneyEmails = async (transporter, formData, adminEmail) => {
  const adminMailOptions = {
    from: `"Healing Journey" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `🌿 New Healing Journey Registration - ${formData.firstName} ${formData.lastName}`,
    html: getHealingJourneyAdminTemplate(formData),
  };

  const clientMailOptions = {
    from: `"Healing Journey" <${process.env.EMAIL_USER}>`,
    to: formData.email,
    subject: 'Thank you for your Emotional Healing Session Registration',
    html: getHealingJourneyClientTemplate(formData),
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(clientMailOptions),
  ]);
};

// POST endpoint for healing journey form
const healingJourneyRoutes = (transporter) => {
  router.post('/submit-healing-journey', async (req, res) => {
    try {
      const formData = req.body;

      console.log('📝 Received healing journey submission:', {
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

      // Validate consents
      if (!formData.consentCare || !formData.consentConfidentiality) {
        return res.status(400).json({
          success: false,
          message: 'Please accept both consent agreements',
        });
      }

      // Send emails
      await sendHealingJourneyEmails(transporter, formData, process.env.ADMIN_EMAIL);

      console.log('✅ Healing journey emails sent successfully for:', formData.email);

      res.status(200).json({
        success: true,
        message: 'Form submitted successfully! We will contact you soon.',
      });
    } catch (error) {
      console.error('❌ Error sending healing journey email:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.',
        error: error.message,
      });
    }
  });

  return router;
};

module.exports = healingJourneyRoutes;