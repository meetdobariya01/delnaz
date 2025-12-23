import React from 'react'
import { motion } from "framer-motion";
import "./footer.css";


const Footer = () => {
  return (
    <div>
 <div>
         <footer className="psy-footer">

      <motion.div
        className="container text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Main title */}
        <h5 className="footer-title mt-4">
          © 2025 Delnaz Medora — Therapist & Coach
        </h5>

        {/* Subtitle */}
        <p className="footer-sub">
          Emotional Healing • EFT • NLP • Wellness Workshops
        </p>

        {/* Divider */}
        <div className="footer-sep"></div>

        {/* Links */}
        <ul className="footer-menu">
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms</a></li>
          <li><a href="#refund">Refund Policy</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <br />
      </motion.div>

    </footer>
    </div>


    </div>
  )
}

export default Footer;