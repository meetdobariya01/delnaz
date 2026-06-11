import React, { useState } from "react";
import "./sessionform.css";
import { motion } from "framer-motion";

const Sessionform = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setStatus({ loading: true, success: false, error: false, message: "" });

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.service) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: "Please fill in all required fields.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          success: true,
          error: false,
          message: data.message || "Form submitted successfully!",
        });
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus((prev) => ({ ...prev, success: false, message: "" }));
        }, 5000);
      } else {
        setStatus({
          loading: false,
          success: false,
          error: true,
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  return (
    <div className="back-light">
      <section className="contact-form-wrapper container">
        {/* LEFT FORM */}
        <motion.div
          className="contact-form"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="title">Request a Curated Mini Session</h1>
          <p className="subtitle">
            Interested in working together? Fill out some info and Delnaz Medora
            will be in touch shortly.
          </p>

          {/* Status Messages */}
          {status.success && (
            <div className="alert alert-success">
              {status.message}
            </div>
          )}
          {status.error && (
            <div className="alert alert-error">
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row-form">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="tel"
              name="phone"
              placeholder="Phone *"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {/* DROPDOWN */}
            <motion.select 
              whileFocus={{ scale: 1.02 }}
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select Service *</option>
              <option value="Anxiety Therapy">Anxiety Therapy</option>
              <option value="Depression Therapy">Depression Therapy</option>
              <option value="Couple Therapy">Couple Therapy</option>
              <option value="Child Therapy">Child Therapy</option>
              <option value="Stress Management">Stress Management</option>
              <option value="Trauma Therapy">Trauma Therapy</option>
            </motion.select>

            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              name="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status.loading}
            >
              {status.loading ? "Sending..." : "Submit"}
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="contact-image"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="./images/form.jpg" alt="Doctor Illustration" />
        </motion.div>
      </section>
    </div>
  );
};

export default Sessionform;