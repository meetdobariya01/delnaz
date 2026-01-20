import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contact.css";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="contact-wrapper container py-5">
        <motion.div
          className="contact-card shadow-lg p-4 rounded-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="contact-title mb-3 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Let’s Connect
          </motion.h2>

          <motion.p
            className="contact-subtext text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a question or need guidance choosing the right session?
          </motion.p>

          <div className="contact-info">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <strong>Email:</strong>
              <a
                href="mailto:therapy@delnazmedora.com?subject=Session%20Inquiry&body=Hello%20Delnaz,%0D%0A%0D%0AI%20would%20like%20to%20know%20more%20about%20your%20therapy%20sessions.%0D%0A%0D%0AThank%20you."
                className="contact-link ms-2"
              >
                therapy@delnazmedora.com
              </a>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <strong>Instagram:</strong>
              <a
                href="https://www.instagram.com/therapist.delnazmedora"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link ms-2"
              >
                @delnazmedora
              </a>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <strong>Phone / WhatsApp:</strong>
              <a href="tel:+91" className="contact-link ms-2">
                (+91)
              </a>
            </motion.p>
          </div>

          <motion.a
            href="tel:+919999999999" // <-- your phone number here
            className="contact-btn btn btn-primary mt-4 w-100 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Now
          </motion.a>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
