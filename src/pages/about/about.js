import React from "react";
import { motion } from "framer-motion";
import Header from "../../component/header/header";
import "./about.css";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { FaUserMd, FaBrain, FaHandsHelping } from "react-icons/fa";
import Footer from "../../component/footer/footer";

const cardData = [
  {
    icon: <FaUserMd />,
    title: "Therapist",
    text: "Providing supportive, compassionate, and intuitive therapeutic guidance to help individuals heal emotionally, release deep-rooted patterns, and reconnect with their inner strength.",
  },
  {
    icon: <FaBrain />,
    title: "EFT Practitioner & NLP Coach",
    text: "Specializing in EFT tapping and NLP mindset reprogramming to help clients shift limiting beliefs, regulate emotions, and transform subconscious patterns effectively.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Transformation Guide",
    text: "Empowering clients on their journey of personal growth, deep healing, and inner transformation through structured, heart-centered coaching and holistic tools.",
  },
];

const About = () => {
  const items = [
    "Safe, warm, judgement-free sessions",
    "Calm but powerful guidance",
    "Clear, actionable tools for daily life",
    "Deep emotional shifts in a short time",
  ];
  return (
    <div>
      {/* header */}
      <Header />
      {/* first section */}
      <section className="about-hero-wrapper">
        <div className="hero-overlay"></div>

        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h3
            className="about-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            About
          </motion.h3>

          <motion.h1
            className="about-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            MEET DELNAZ MEDORA
          </motion.h1>
        </motion.div>
      </section>
      {/* secound section */}

      <section className="qual-wrapper">
        <Container>
          {/* Title */}
          <motion.h2
            className="qual-title"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Qualifications
          </motion.h2>

          <Row className="align-items-center mt-5">
            {/* LEFT SIDE CONTENT */}
            <Col md={7}>
              <motion.div
                className="qual-list"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
              >
                <ul>
                  <li>
                    Certified EFT (Emotional Freedom Techniques) Practitioner
                    with advanced training in energy psychology and emotional
                    release therapy.
                  </li>
                  <li>
                    Certified NLP Practitioner, trained in powerful mindset
                    reprogramming and subconscious transformation methodologies.
                  </li>
                  <li>
                    Specialized studies in trauma-informed healing, somatic
                    grounding practices, and holistic coaching techniques.
                  </li>
                  <li>
                    Professional training in cognitive reframing, inner-child
                    healing, and behavioral transformation modalities.
                  </li>
                  <li>
                    Experienced therapeutic coach supporting emotional wellness,
                    mindset mastery, and long-term personal growth.
                  </li>
                </ul>
              </motion.div>

              {/* 500-word content */}
              {/* <motion.p
              className="qual-desc mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              viewport={{ once: true }}
            >
              I am Delnaz Medora, a therapist and transformational coach deeply
              committed to helping individuals heal, evolve, and reconnect with
              the most empowered version of themselves. With a strong foundation
              in Emotional Freedom Techniques (EFT) and Neuro-Linguistic
              Programming (NLP), my work blends science-based therapeutic tools
              with intuitive emotional guidance to create a safe, structured,
              and compassionate healing experience.

              Over the years, I have worked with people navigating emotional
              overwhelm, anxiety, self-doubt, trauma imprints, relationship
              challenges, and limiting beliefs that keep them from living fully.
              My approach is grounded in the belief that every human being has
              an incredible capacity for self-healing. When we understand the
              subconscious patterns that shape our lives, we gain the power to
              rewrite them—and step into confidence, clarity, and inner freedom.

              My training in EFT allows me to help clients release emotional
              blockages held in the body and nervous system, while NLP empowers
              them to shift deep-rooted thought patterns and internal narratives.
              Together, these modalities create rapid, lasting transformation.
              I combine them with reflective coaching practices, somatic
              awareness techniques, and practical mindset tools so clients not
              only heal but also grow into healthier, more aligned versions of
              themselves.

              I believe therapy is not just about resolving pain—it is about
              discovering purpose, reclaiming emotional strength, and learning
              how to navigate life with resilience and self-compassion. Each
              session is designed to help clients feel seen, supported, and
              understood, while gently guiding them toward breakthroughs that
              bring ease and expansion.

              My mission is to make emotional well-being accessible, relatable,
              and empowering. Whether you are beginning your healing journey or
              seeking deeper inner transformation, I am here to walk beside you
              with empathy, clarity, and a heart-centered approach that honors
              your unique story.
            </motion.p> */}
            </Col>

            {/* RIGHT SIDE IMAGE */}
            <Col md={5} className="mt-4 mt-md-0">
              <motion.div
                className="qual-image-box"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
              >
                <img src="./images/delnaz-medora.png" alt="Delnaz Medora" />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* third section */}
      <section className="expertise-wrapper">
        <Container>
          <Row className="justify-content-center">
            {cardData.map((item, idx) => (
              <Col
                key={idx}
                md={4}
                sm={12}
                className="d-flex justify-content-center mb-4"
              >
                <motion.div
                  className="expertise-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="icon-box">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {/* forth section */}

      <section className="gift-wrapper">
        <Container>
          <Row className="align-items-center">
            {/* LEFT TEXT */}
            <Col md={6} className="mb-5 mb-md-0">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="gift-title"
              >
                Receive a <span className="gift-hand">Gift From Me</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
                className="gift-desc"
              >
                I am giving you a gift to help you get started on your path to
                becoming the best you. Whether you wish to find love, become
                super successful, free yourself from money blocks, or master
                multiple areas of your life.
              </motion.p>

              {/* PHILOSOPHY TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                viewport={{ once: true }}
                className="philosophy-box"
              >
                <h3 className="philosophy-title">Her Philosophy:</h3>
                <p className="philosophy-text">
                  When you shift your inner world, your outer world follows.
                  Transformation always begins within—when clarity rises,
                  healing follows, and the entire direction of your life changes
                  with it.
                </p>
              </motion.div>
            </Col>

            {/* RIGHT IMAGES */}
            <Col md={6} className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
                className="gift-images"
              >
                <img
                  src="./images/th-1.jpg"
                  alt="Gift"
                  className="gift-img img-fluid"
                />
                <img
                  src="/images/th-2.jpg"
                  alt="Gift"
                  className="gift-img2 img-fluid"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
        {/* fifth section */}
        <section className="client-love-wrapper">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8}>
                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="client-love-title"
                >
                  What Clients Love About Her
                </motion.h2>

                {/* List */}
                <div className="client-love-list">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      className="client-love-item"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <span className="check-icon">✔</span>
                      <p>{item}</p>
                    </motion.div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* sixth section */}
        <section className="therapy-cta-wrapper">
          <Container>
            <Row className="align-items-center">
              {/* LEFT TEXT BLOCK */}
              <Col md={7}>
                <motion.h2
                  className="cta-title"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  Explore Her Services
                </motion.h2>

                <motion.p
                  className="cta-description"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Discover powerful healing techniques including EFT, NLP, and
                  emotional wellness coaching designed to help you heal, grow,
                  and transform from the inside out.
                </motion.p>

                {/* SEO keywords included naturally */}
                <motion.p
                  className="cta-seo"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <strong>Keywords:</strong> About therapist India, EFT
                  specialist profile, NLP coach bio, emotional wellness expert
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Button className="cta-btn">Explore Her Services</Button>
                </motion.div>
              </Col>

              {/* RIGHT SIDE IMAGE */}
              <Col md={5}>
                <motion.div
                  className="cta-img-wrap"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="/images/th-1.jpg"
                    alt="Therapy Services"
                    className="cta-img"
                  />
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>
      </section>
      {/* footer */}
      <Footer/>
    </div>
  );
};

export default About;
