import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./refund.css";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Refund = () => {
  return (
    <div>
        {/* header */}
        <Header/>
   
    <section className="refund-section">
      <Container>
        <motion.div
          className="refund-card"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          variants={fadeUp}
        >
          <h1 className="refund-title">Refund & Cancellation Policy</h1>

          <p className="refund-intro">
            At <strong>Mind Therapy</strong>, we understand that personal
            circumstances may change. This Refund & Cancellation Policy
            explains how session cancellations, rescheduling, and refunds are
            handled with care and fairness.
          </p>

          <motion.h4 variants={fadeUp}>Appointment Cancellations</motion.h4>
          <p>
            Therapy sessions may be cancelled or rescheduled up to{" "}
            <strong>24 hours</strong> before the scheduled session time. Late
            cancellations or no-shows may not be eligible for a refund due to
            therapist time commitment.
          </p>

          <motion.h4 variants={fadeUp}>Rescheduling Policy</motion.h4>
          <p>
            Clients may reschedule sessions once without additional charges,
            provided notice is given within the allowed time frame. Further
            rescheduling requests may be subject to availability.
          </p>

          <motion.h4 variants={fadeUp}>Refund Eligibility</motion.h4>
          <ul>
            <li>Refunds apply only to unused or cancelled sessions</li>
            <li>Completed therapy sessions are non-refundable</li>
            <li>Refund requests must be submitted within 7 days</li>
          </ul>

          <motion.h4 variants={fadeUp}>Refund Processing</motion.h4>
          <p>
            Approved refunds will be processed through the original payment
            method within 7–10 business days. Transaction fees charged by
            payment providers may not be refundable.
          </p>

          <motion.h4 variants={fadeUp}>Emergency Situations</motion.h4>
          <p>
            In cases of genuine emergencies or health-related issues, Mind
            Therapy may review cancellation or refund requests on a
            case-by-case basis, ensuring empathy and understanding.
          </p>

          <motion.h4 variants={fadeUp}>Changes to This Policy</motion.h4>
          <p>
            We reserve the right to update or modify this policy at any time.
            Continued use of our services indicates acceptance of any revised
            terms.
          </p>

          <motion.h4 variants={fadeUp}>Contact Us</motion.h4>
          <p>
            For refund or cancellation-related queries, please contact us at:
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

export default Refund;
