import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import "./testimonial.css";

const testimonials = [
  {
    
    text: "Hello. Good morning. This is to tell you that i have been awarded an outstanding student award for securing the first position...",
  },
  {
   
    text: "Earlier. I didn't realise but you helping me through all the healing sessions have worked in miraculous ways...",
  },
  {
    
    text: "Thank you so much. Trust me on after our sessions and me practising EFT alongside has helped me heal...",
  },
  {
   
    text: "Through your gentle guidance and transformative energy work, I have experienced profound shifts...",
  },
  {
  
    text: "I walked into your healing space, I knew that I had found someone truly special...",
  },
  {
    
    text: "Just wanted to thank you from my heart. It truly feels like the universe nudged me toward you...",
  },
  {
   
    text: "You have really come as a blessing in my life. Those sessions with you changed my life. I am grateful for you.",
  },
  {
    
    text: "Today, after very long, I woke up feeling lighter, refreshed, and actually looking forward to the day.",
  },
  {
   
    text: "Thank you for an amazing session today. I truly enjoyed it and have a lot of take aways!",
  },
];

const Testimonial = () => {
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 768) setItemsPerSlide(1);
      else if (window.innerWidth < 992) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
    groupedTestimonials.push(testimonials.slice(i, i + itemsPerSlide));
  }

  return (
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

        {/* Carousel */}
        <Carousel
          interval={3500}
          pause="hover"
          indicators={false}
          controls={false}
          touch
          fade
        >
          {groupedTestimonials.map((group, idx) => (
            <Carousel.Item key={idx} className="carousel-slide">
              <Row>
                {group.map((item, index) => (
                  <Col
                    lg={4}
                    md={6}
                    sm={12}
                    key={index}
                    className="carousel-card-wrapper"
                  >
                    <motion.div
                      className="tilt-card"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      whileHover={{
                        scale: 1.08,
                        rotateX: 6,
                        rotateY: -6,
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Card className="testimonial-card">
                        <span className="quote-icon">❝</span>

                        <Card.Body>
                          <p className="testimonial-text">
                            {item.text}
                          </p>
                        </Card.Body>

                        {/* <Card.Footer className="testimonial-footer">
                          <h6 className="testimonial-name">{item.name}</h6>
                          <small className="testimonial-role">
                            {item.role}
                          </small>
                        </Card.Footer> */}
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Testimonial;
