import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "./workshop.css";

const workshops = [
  {
    id: 1,
    title: "Managing Anxiety & Stress",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    desc: "Learn practical tools to reduce anxiety, manage stress, and regain emotional balance through therapist-guided techniques.",
    price: "₹1,499",
  },
  {
    id: 2,
    title: "Healing Relationships",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    desc: "Improve communication, rebuild trust, and create deeper emotional connections in your relationships.",
    price: "₹1,999",
  },
  {
    id: 3,
    title: "Mindfulness for Daily Life",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    desc: "Build mindfulness habits to stay grounded, calm, and emotionally present in daily situations.",
    price: "₹1,299",
  },
  {
    id: 4,
    title: "Overcoming Depression",
    image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5",
    desc: "Understand depression, challenge negative thought patterns, and rebuild motivation with therapeutic support.",
    price: "₹2,199",
  },
  {
    id: 5,
    title: "Emotional Healing & Self-Love",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    desc: "Reconnect with yourself, release emotional wounds, and build healthy self-esteem.",
    price: "₹1,799",
  },
];

const Workshop = () => {
  const [activeWorkshop, setActiveWorkshop] = useState(null);

  return (
    <div>
      <Header />

      <section className="workshop-section">
        <Container>
          {/* Section Header */}
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-badge">Therapist Workshops</span>
            <h2>Workshops Designed for Healing</h2>
            <p>
              Carefully curated workshops to support emotional growth, awareness, and resilience.
            </p>
          </motion.div>

          {/* Workshop Cards */}
          <Row className="g-4">
            {workshops.map((item, index) => (
              <Col md={4} sm={6} xs={12} key={item.id}>
                <motion.div
                  className="workshop-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  onClick={() => setActiveWorkshop(item)}
                >
                  <img src={item.image} alt={item.title} />
                  <div className="card-content">
                    <h5>{item.title}</h5>
                    <span>{item.price}</span>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeWorkshop && (
          <motion.div
            className="workshop-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="workshop-modal"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="close-btn"
                onClick={() => setActiveWorkshop(null)}
              >
                ✕
              </button>
              <img
                className="modal-img"
                src={activeWorkshop.image}
                alt={activeWorkshop.title}
              />
              <h3>{activeWorkshop.title}</h3>
              <p className="modal-desc">{activeWorkshop.desc}</p>
              <h4>{activeWorkshop.price}</h4>
              <Button className="purchase-btn">Book Now</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Workshop;
