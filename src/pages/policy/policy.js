import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./policy.css";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";

const sectionAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Policy = () => {
  return (
    <div>
        {/* header */}
        <Header/>
    <section className="privacy-section">
      <Container>
        <motion.div
          className="privacy-box"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          variants={sectionAnimation}
        >
          <h1 className="privacy-title">Privacy Policy</h1>

          <p className="privacy-intro">
            At <strong>Mind Therapy</strong>, protecting your emotional safety,
            confidentiality, and personal information is our highest priority.
            This Privacy Policy explains how we responsibly collect, use, and
            safeguard your data across our mental wellness services.
          </p>

          <h4>Information We Collect</h4>
          <ul>
            <li>Personal details such as name, email address, and phone number</li>
            <li>Therapy preferences, session bookings, and therapist selections</li>
            <li>Website usage data to enhance user experience and accessibility</li>
          </ul>

          <h4>How We Use Your Information</h4>
          <ul>
            <li>To provide personalized therapy and mental wellness support</li>
            <li>To schedule sessions and send appointment reminders</li>
            <li>To improve our services, content, and care approach</li>
          </ul>

          <h4>Confidentiality & Data Security</h4>
          <p>
            All mental health–related information is handled with strict
            confidentiality. We use encryption, secure servers, and
            industry-standard practices to protect your personal and emotional
            data at every stage.
          </p>

          <h4>Cookies & Tracking</h4>
          <p>
            Cookies help us understand how users interact with our wellness
            platform and allow us to personalize content. You may manage or
            disable cookies through your browser settings at any time.
          </p>

          <h4>Third-Party Services</h4>
          <p>
            We may use trusted third-party tools for payments, analytics, or
            communication. These services comply with privacy and data
            protection standards relevant to mental healthcare.
          </p>

          <h4>Your Rights</h4>
          <ul>
            <li>Access, update, or request deletion of your personal data</li>
            <li>Withdraw consent for non-essential communication</li>
            <li>Request information about how your data is used</li>
          </ul>

          <h4>Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy or how your data
            is protected, please contact us at:
            <br />
            <a
                href="mailto:therapy@delnazmedora.com?subject=Session%20Inquiry&body=Hello%20Delnaz,%0D%0A%0D%0AI%20would%20like%20to%20know%20more%20about%20your%20therapy%20sessions.%0D%0A%0D%0AThank%20you."
                className="contact-link ms-2"
              >
                therapy@delnazmedora.com
              </a>
          </p>
        </motion.div>
      </Container>
    </section>
    {/* footer */}
    <Footer/>
    </div>
  );
};

export default Policy;
