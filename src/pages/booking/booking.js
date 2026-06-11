import React, { useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "./booking.css";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const therapies = [
  {
    id: 1,
    name: "Anxiety Therapy",
    image: "/images/i-1.webp",
    // price: "₹1500",
    description:
      "Anxiety Therapy with Delnaz Medora offers a safe, nurturing space to calm your mind, release emotional overwhelm, rebuild inner balance, and gently guide you toward clarity, resilience, and lasting emotional wellbeing.",
  },

  {
    id: 2,
    name: "Depression Therapy",
    image: "/images/i-2.webp",
    // price: "₹1800",
    description:
      "Depression Therapy with Delnaz Medora provides gentle support to navigate emotional heaviness, rediscover self-worth, heal inner pain, restore hope, and empower you to reconnect with purpose, strength, and meaningful daily life.",
  },
  {
    id: 3,
    name: "Couple Therapy",
    image: "/images/i-3.webp",
    // price: "₹2000",
    description:
      "Couple Therapy with Delnaz Medora creates a supportive space to improve communication, rebuild trust, resolve conflict, deepen emotional connection, and guide partners toward understanding, harmony, and a healthier, more fulfilling relationship together.",
  },
  {
    id: 4,
    name: "Child Therapy",
    image: "/images/i-4.webp",
    // price: "₹1400",
    description:
      "Child Therapy with Delnaz Medora nurtures emotional growth through gentle guidance, helping children express feelings, build confidence, manage behavioral challenges, and develop healthy coping skills in a safe, supportive, and understanding therapeutic environment.",
  },
  {
    id: 5,
    name: "Stress Management",
    image: "/images/i-5.webp",
    // price: "₹1200",
    description:
      "Stress Management with Delnaz Medora supports you in reducing overwhelm, balancing emotions, improving focus, and developing effective coping strategies to handle daily pressures while restoring calm, clarity, and emotional stability in life.",
  },
  {
    id: 6,
    name: "Trauma Therapy",
    image: "/images/i-6.webp",
    // price: "₹2200",
    description:
      "Trauma Therapy with Delnaz Medora offers compassionate care to process difficult experiences, heal emotional wounds, restore safety, rebuild trust, and empower individuals to move forward with strength, resilience, and renewed self-confidence.",
  },
  {
    id: 7,
    name: "Mindfulness Therapy",
    image: "/images/i-7.webp",
    // price: "₹1600",
    description:
      "Mindfulness Therapy with Delnaz Medora encourages present-moment awareness, emotional regulation, inner calm, and self-connection, helping you reduce anxiety, enhance clarity, and cultivate balance, acceptance, and peace in everyday living.",
  },
  {
    id: 8,
    name: "Sleep Therapy",
    image: "/images/i-8.webp",
    // price: "₹1300",
    description:
      "Sleep Therapy with Delnaz Medora focuses on improving sleep quality by calming the mind, easing nighttime anxiety, establishing healthy routines, and supporting deep, restorative rest for better emotional balance and overall wellbeing.",
  },
  {
    id: 9,
    name: "Career Counseling",
    image: "/images/i-9.webp",
    // price: "₹1700",
    description:
      "Career Counseling with Delnaz Medora provides clarity, confidence, and direction by exploring strengths, interests, and goals, helping individuals overcome uncertainty, make informed decisions, and build fulfilling, purpose-driven professional paths.",
  },
];

const Booking = () => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(1);

  const openModal = useCallback((therapy) => {
    setSelected(therapy);
    setShow(true);
    setStep(1);
  }, []);

  const closeModal = () => {
    setShow(false);
    setSelected(null);
  };

  return (
    <>
      {/* <Header /> */}

      <Container className="therapy-section-booking py-5">
        <h2 className="text-center mb-5">Therapy Courses</h2>

        <Row>
          {therapies.map((therapy) => (
            <Col lg={4} md={6} sm={6} xs={6} key={therapy.id} className="mb-4">
              <Card
                className="therapy-course-card"
                onClick={() => openModal(therapy)}
              >
                <Card.Img
                  src={therapy.image}
                  loading="lazy"
                  alt={therapy.name}
                />
                <Card.Body>
                  <Card.Title>{therapy.name}</Card.Title>
                  <button className="btn btn-outline-dark">
                    Book Now {therapy.price}
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {show && selected && (
          <Modal
            show={show}
            onHide={closeModal}
            centered
            className="modern-booking-modal custom-width-modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="modal-glass-box"
            >
              {/* HEADER */}
              <div className="modal-header-custom">
                <h5>{selected.name}</h5>
                <span className="step-badge">Step {step} / 3</span>
              </div>

              {/* BODY */}
              <Modal.Body className="modal-body-custom">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <img
                        src={selected.image}
                        loading="lazy"
                        className="img-fluid rounded modal-img mb-3"
                        alt={selected.name}
                      />
                      <p className="text-muted">{selected.description}</p>
                      <h4 className="price-text">{selected.price}</h4>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control type="email" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Preferred Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Form>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="booking-success text-center"
                    >
                      <h3>🎉 Booking Confirmed</h3>
                      <p>Our therapist will contact you soon.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Modal.Body>

              {/* FOOTER */}
              <div className="modal-footer-custom justify-center">
                {step > 1 && step < 3 && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}

                {step < 3 && (
                  <Button
                    className="primary-book-btn"
                    onClick={() => setStep(step + 1)}
                  >
                    {step === 1 ? "Continue" : "Confirm Booking"}
                  </Button>
                )}
              </div>
            </motion.div>
          </Modal>
        )}
      </Container>

      {/* <Footer /> */}
    </>
  );
};

export default Booking;
