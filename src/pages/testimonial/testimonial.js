import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "./testimonial.css";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";

const testimonials = [
  {
    name: "Ananya S.",
    role: "Anxiety Therapy Client",
    text: "Therapy here helped me understand my emotions and regain confidence. I finally feel in control of my life again.",
  },
  {
    name: "Rahul M.",
    role: "Couples Therapy Client",
    text: "We learned how to communicate better and rebuild trust. The sessions felt safe, respectful, and effective.",
  },
  {
    name: "Priya K.",
    role: "Stress Management Client",
    text: "A calm, compassionate therapist who truly listens. Every session gave me clarity and peace of mind.",
  },
  {
    name: "Sneha R.",
    role: "Depression Recovery Client",
    text: "I felt heard and supported from day one. Therapy helped me slowly regain hope and motivation in my daily life.",
  },
  {
    name: "Amit P.",
    role: "Workplace Burnout Client",
    text: "The sessions gave me practical tools to manage stress and boundaries. I feel more balanced and focused at work now.",
  },
  {
    name: "Neha T.",
    role: "Self-Esteem & Personal Growth",
    text: "This therapy journey helped me build confidence and understand myself better. I feel emotionally stronger than ever.",
  },
];


const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};
const Testimonial = () => {
  return (
    <div>
      <Header />
      <section className="testimonial-section">
        <Container>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="testimonial-title">What Clients Say</h2>
            <p className="testimonial-subtitle">
              Real experiences. Genuine healing.
            </p>
          </motion.div>

          {/* Cards */}
          <Row>
            {testimonials.map((item, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <motion.div
                  custom={index}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className="testimonial-card h-100">
                    <Card.Body>
                      <p className="testimonial-text">“{item.text}”</p>
                    </Card.Body>
                    <Card.Footer className="border-0 bg-transparent">
                      <h6 className="testimonial-name">{item.name}</h6>
                      <small className="testimonial-role">{item.role}</small>
                    </Card.Footer>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default Testimonial;
