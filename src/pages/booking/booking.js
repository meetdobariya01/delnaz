import React, { useState, lazy, Suspense } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "./booking.css";

const Header = lazy(() => import("../../component/header/header"));
const Footer = lazy(() => import("../../component/footer/footer"));

const workshops = [
  {
    id: 1,
    title: "Managing Anxiety & Stress",
    image: "./images/i-1.jpg",
    desc: "Learn practical tools to reduce anxiety, manage stress, and regain emotional balance through therapist-guided techniques.",
    price: "₹1,499",
  },
  {
    id: 2,
    title: "Healing Relationships",
     image: "./images/i-2.jpg",
    desc: "Improve communication, rebuild trust, and create deeper emotional connections in your relationships.",
    price: "₹1,999",
  },
  {
    id: 3,
    title: "Mindfulness for Daily Life",
    image: "./images/i-3.jpg",
    desc: "Build mindfulness habits to stay grounded, calm, and emotionally present in daily situations.",
    price: "₹1,299",
  },
  {
    id: 4,
    title: "Overcoming Depression",
    image: "./images/i-4.jpg",
    desc: "Understand depression, challenge negative thought patterns, and rebuild motivation with therapeutic support.",
    price: "₹2,199",
  },
  {
    id: 5,
    title: "Emotional Healing & Self-Love",
   image: "./images/i-5.jpg",
    desc: "Reconnect with yourself, release emotional wounds, and build healthy self-esteem.",
    price: "₹1,799",
  },
  {
    id: 6,
    title: "Trauma Recovery & Inner Safety",
   image: "./images/i-6.jpg",
    desc: "A gentle, therapist-guided workshop focused on healing trauma and restoring emotional safety.",
    price: "₹2,499",
  },
  {
    id: 7,
    title: "Anger Management Therapy",
    image: "./images/i-7.jpg",
    desc: "Learn healthy ways to understand, process, and express anger without harming yourself or others.",
    price: "₹1,399",
  },
  {
    id: 8,
    title: "Confidence & Self-Esteem Building",
    image: "./images/i-8.jpg",
    desc: "Build confidence, overcome self-doubt, and strengthen your personal identity.",
    price: "₹1,699",
  },
  {
    id: 9,
    title: "Work Stress & Burnout Recovery",
    image: "./images/i-1.jpg",
    desc: "Recover from emotional burnout and learn sustainable work-life balance strategies.",
    price: "₹1,899",
  },
];

const Booking = () => {
  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [step, setStep] = useState(1);

  return (
    <div>
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <section className="workshop-section">
        <Container>
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* <span className="section-badge">Therapeutic Workshops</span> */}
            <h2>Workshops Designed for Healing</h2>
            <p>
              Carefully curated therapist-led workshops to support emotional
              growth, awareness, and resilience.
            </p>
          </motion.div>

          <Row className="g-4">
            {workshops.map((item, index) => (
              <Col md={4} sm={6} xs={12} key={item.id}>
                <motion.div
                  className="workshop-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => {
                    setActiveWorkshop(item);
                    setStep(1);
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
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

      <AnimatePresence mode="wait">
        {activeWorkshop && (
          <motion.div
            className="workshop-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="workshop-modal"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                className="close-btn"
                onClick={() => {
                  setActiveWorkshop(null);
                  setStep(1);
                }}
              >
                ✕
              </button>

              <h3>{activeWorkshop.title}</h3>
              <p className="modal-subtitle">
                Therapist-led workshop for emotional healing
              </p>

              {step === 1 && (
                <>
                  <img
                    src={activeWorkshop.image}
                    alt={activeWorkshop.title}
                    className="modal-img"
                    loading="lazy"
                  />
                  <p className="modal-desc">{activeWorkshop.desc}</p>

                  <h4>{activeWorkshop.price}</h4>
                  <Button className="purchase-btn" onClick={() => setStep(2)}>
                    Book Now
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <select className="form-control mb-3">
                    <option>20 July 2025 – 6:00 PM</option>
                    <option>22 July 2025 – 7:30 PM</option>
                    <option>25 July 2025 – 5:00 PM</option>
                  </select>
                  <Button className="purchase-btn" onClick={() => setStep(3)}>
                    Continue
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <input className="form-control mb-2" placeholder="Full Name" />
                  <input className="form-control mb-2" placeholder="Email" />
                  <input className="form-control mb-3" placeholder="Phone" />
                  <Button className="purchase-btn" onClick={() => setStep(4)}>
                    Confirm Booking
                  </Button>
                </>
              )}

              {step === 4 && (
                <div className="confirmation-box">
                  <h4>🎉 Booking Confirmed</h4>
                  <Button
                    className="purchase-btn"
                    onClick={() => setActiveWorkshop(null)}
                  >
                    Close
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Booking;
