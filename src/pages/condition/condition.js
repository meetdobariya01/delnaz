import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./condition.css";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Condition = () => {
  return (
    <div>
      {/* header */}
      <Header />

      <section className="terms-section">
        <Container>
          <motion.div
            className="terms-card"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <h1 className="terms-title">Terms & Conditions</h1>

            <p className="terms-intro">
              Welcome to <strong>Mind Therapy</strong>. By accessing or using
              our mental wellness services, website, or therapy sessions, you
              agree to comply with the following Terms & Conditions. Please read
              them carefully before proceeding.
            </p>

            <motion.h4 variants={fadeUp}>Use of Services</motion.h4>
            <p>
              Mind Therapy provides emotional wellness support, counseling
              resources, and therapy-related services. Our services are intended
              for personal growth and mental well-being and should not be used
              as a substitute for emergency medical care.
            </p>

            <motion.h4 variants={fadeUp}>User Responsibilities</motion.h4>
            <ul>
              <li>Provide accurate and complete personal information</li>
              <li>Use the platform respectfully and ethically</li>
              <li>Refrain from misuse, harassment, or harmful behavior</li>
            </ul>

            <motion.h4 variants={fadeUp}>
              Therapy Sessions & Appointments
            </motion.h4>
            <p>
              Therapy sessions are scheduled based on availability. Missed or
              late cancellations may be subject to rescheduling policies.
              Confidential communication between therapist and client is
              expected at all times.
            </p>

            <motion.h4 variants={fadeUp}>Confidentiality</motion.h4>
            <p>
              All personal and therapy-related information is handled with
              strict confidentiality, in accordance with applicable mental
              health and privacy regulations. Information will never be shared
              without consent unless legally required.
            </p>

            <motion.h4 variants={fadeUp}>Payments & Refunds</motion.h4>
            <p>
              Payments for therapy sessions or wellness programs must be
              completed in advance. Refunds, if applicable, follow our
              cancellation and refund policy outlined at the time of booking.
            </p>

            <motion.h4 variants={fadeUp}>Limitation of Liability</motion.h4>
            <p>
              Mind Therapy is not liable for decisions or actions taken by users
              based on therapy guidance. Users are responsible for their own
              mental health choices and outcomes.
            </p>

            <motion.h4 variants={fadeUp}>Changes to Terms</motion.h4>
            <p>
              We reserve the right to update these Terms & Conditions at any
              time. Continued use of our services indicates acceptance of the
              updated terms.
            </p>

            <motion.h4 variants={fadeUp}>Contact Information</motion.h4>
            <p>
              If you have questions about these Terms & Conditions, please
              contact us at:
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
      <Footer />
    </div>
  );
};

export default Condition;
