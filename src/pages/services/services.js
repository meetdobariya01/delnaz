import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaUser, FaHeart, FaUsers, FaLaptopMedical } from "react-icons/fa";
import "./services.css";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const services = [
  {
    icon: <FaUser />,
    title: "Individual Therapy",
    desc: "Personalized one-on-one sessions to help you manage emotions, overcome challenges, and build healthier coping skills.",
  },
  {
    icon: <FaHeart />,
    title: "Couples Therapy",
    desc: "Strengthen communication, rebuild trust, and deepen connection in a supportive, structured environment.",
  },
  {
    icon: <FaUsers />,
    title: "Family Therapy",
    desc: "Address family dynamics, resolve conflicts, and create healthier relationships at home.",
  },
  {
    icon: <FaLaptopMedical />,
    title: "Online Therapy",
    desc: "Secure, confidential sessions from the comfort of your home—flexible and convenient.",
  },
];

const helpList = ["Adults & Young Adults", "Couples", "Families"];

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Services = () => {
  return (
    <div>
      <Header />

      <section className="therapy-section">
        <Container>
          {/* Heading */}
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-badge">Therapy Services</span>
            <h2>Support for Every Stage of Life</h2>
            <p>
              Compassionate, evidence-based therapy designed to help you heal,
              grow, and thrive emotionally.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
          >
            <Row className="g-4">
              {services.map((item, index) => (
                <Col lg={3} md={6} key={index}>
                  <motion.div variants={cardVariant}>
                    <Card className="therapy-card">
                      <motion.div
                        className="icon-box"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "easeInOut",
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Who I Help */}
          <motion.div
            className="who-help text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>Who I Help</h3>

            <Row className="justify-content-center mt-4">
              {helpList.map((item, index) => (
                <Col md={3} sm={6} xs={12} key={index}>
                  <motion.div
                    className="help-card"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.div>
                </Col>
              ))}
            </Row>

            <motion.p
              className="closing-text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              If you’re feeling overwhelmed, stuck, or unsure where to turn,
              therapy can help you move forward with clarity and confidence.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
