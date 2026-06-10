import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "./home.css";
// import heroImg from "../assets/hero-lady.png"; // <-- add your image here
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Testimonial from "../../component/testimonial/testimonial";
import Sessionform from "../../component/session-form/sessionform";
import Audio from "../../component/audio/audio";

const cardVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        {/* header */}
        <Header />
        {/* hero section */}

        <section className="hero-section mt-1">
          <Container fluid>
            <Row className="align-items-center">
              {/* LEFT TEXT */}
              <Col md={6} className="hero-text-box">
                <div className="hero-text-wrapper">
                  {/* Watermark will be behind this wrapper */}
                  <motion.p
                    className="top-tag"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    EXCLUSIVE FREE EXPERIENCE WITH DELNAZ MEDORA
                  </motion.p>

                  <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                  >
                    Release. Transform.Heal.
                  </motion.h1>

                  <motion.h2
                    className="hero-sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    Emotional Wellness for a More Aligned You.
                  </motion.h2>

                  <motion.p
                    className="hero-desc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    Experience deep inner healing and mindset transformation
                    through EFT, NLP, and intuitive therapeutic coaching. Break
                    free from looping thoughts and reframe your future with
                    unshakeable confidence.
                  </motion.p>
                </div>
              </Col>

              {/* RIGHT IMAGE */}
              <Col
                xs={12}
                md={6}
                className="order-1 order-md-2 hero-img-box text-center"
              >
                <motion.img
                  src={"./images/delnaz-medora.jpeg"}
                  alt="Therapist"
                  className="hero-img"
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2 }}
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* caresoul */}
        <Testimonial />
        {/* secound section */}
        <section className="help-section">
          <Container>
            <motion.h2
              className="help-title"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              HOW CAN I <span className="help-highlight">Help</span> ?
            </motion.h2>

            <motion.p
              className="help-subtext"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              I’m here to…
            </motion.p>

            <Row className="g-4 justify-content-center mt-4">
              {/* Card 1 */}
              <Col md={3} sm={12}>
                <motion.div
                  className="help-card"
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                >
                  <img
                    src="/images/c-11.jpg"
                    alt="Solve Issues"
                    className="help-img"
                  />
                  <h3 className="help-card-title">Solve Personal Issues</h3>
                  <p>Emotional healing & one on one therapy packages.</p>
                </motion.div>
              </Col>

              {/* Card 2 */}
              <Col md={3} sm={12}>
                <motion.div
                  className="help-card"
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                >
                  <img
                    src="/images/c-33.jpg"
                    alt="Therapist Training"
                    className="help-img"
                  />
                  <h3 className="help-card-title">Parenting workshop</h3>
                  <p>Mindful therapy for conscious, confident parenting.</p>
                </motion.div>
              </Col>

              {/* Card 3 */}
              <Col md={3} sm={12}>
                <motion.div
                  className="help-card"
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                >
                  <img
                    src="/images/c-44.jpg"
                    alt="Book Therapist"
                    className="help-img"
                  />
                  <h3 className="help-card-title">
                    Group workshop for emotional healing
                  </h3>
                  <p>Emotional Healing Circle.</p>
                </motion.div>
              </Col>

              {/* Card 4 */}
              <Col md={3} sm={12}>
                <motion.div
                  className="help-card"
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                >
                  <img
                    src="/images/c-22.jpg"
                    alt="Therapy Packages"
                    className="help-img"
                  />
                  <h3 className="help-card-title">
                    Corporate workshop with therapeutic interventions
                  </h3>
                  <p>Mindful Corporate Healing.</p>
                </motion.div>
              </Col>
            </Row>

            {/* CTA Buttons */}
            <motion.div
              className="help-cta-container"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Button className="help-btn" onClick={() => navigate("/Sanctum")}>
                Book a Session
              </Button>

              {/* <Button className="help-btn outline">Explore Workshops</Button> */}
            </motion.div>
          </Container>
        </section>
        {/* audio section */}
        <Audio />

        {/* third section */}

        <section className="meet-wrapper">
          <Container>
            <motion.h2
              className="meet-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              MEET <span>Delnaz Medora</span>
            </motion.h2>

            <Row className="align-items-center">
              {/* Text Content */}
              <Col md={6} sm={12}>
                <motion.div
                  className="meet-content"
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <p>
                    For over a decade, Delnaz Medora has helped individuals
                    overcome emotional challenges and transform their lives
                    through evidence-based therapeutic methods. She empowers
                    clients to take charge of their emotions, behaviours, and
                    actions, unlocking deep inner healing and lasting change.
                  </p>

                  <h4 className="goal-title">
                    “My goal is to empower people to take charge of their lives
                    by taking charge of their emotional world.”
                  </h4>

                  <ul className="issue-list">
                    <li>
                      <strong>Depression —</strong> Break free from emotional
                      heaviness and rediscover hope.
                    </li>
                    <li>
                      <strong>Anxiety —</strong> Ease overwhelming thoughts and
                      embrace inner calm.
                    </li>
                    <li>
                      <strong>Fears & Phobia —</strong> Transform fear into
                      confidence through guided therapy.
                    </li>
                    <li>
                      <strong>Weight Issues —</strong> Heal emotional triggers &
                      build body confidence.
                    </li>
                    <li>
                      <strong>Addictions —</strong> Break free from alcohol &
                      smoking dependency.
                    </li>
                    <li>
                      <strong>Relationship Issues —</strong> Build stronger,
                      healthier connections.
                    </li>
                  </ul>
                </motion.div>
              </Col>

              {/* Image Section */}
              <Col md={6} sm={12} className="image-col">
                <motion.img
                  src="./images/delnaz-2.jpeg"
                  alt="Delnaz Medora"
                  className="meet-img"
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2 }}
                />
              </Col>
            </Row>
          </Container>
        </section>
        {/* forth section */}

        <section className="start-life-wrapper">
          <motion.h2
            className="start-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            START CHANGING YOUR LIFE TODAY
          </motion.h2>

          {/* <motion.p
            className="start-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            SEO Keywords: EFT practitioner India, NLP coach, emotional healing
            therapy, book therapy session online
          </motion.p> */}

          <motion.div
            className="start-btn-wrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Link to="/Sanctum" className="start-btn">
              BOOK NOW
            </Link>
            <Link to="/typeform" className="start-btn">
              Workshop
            </Link>
          </motion.div>

          {/* SEO Keywords Section for ranking */}
          <div className="seo-keywords">
            EFT practitioner India, NLP coach, emotional healing therapy, book
            therapy session online
          </div>
        </section>
        {/* fifth section */}
        <section className="featured-intro-wrapper">
          <motion.h3
            className="featured-heading"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Featured Intro
          </motion.h3>

          <motion.div
            className="featured-line"
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          <motion.p
            className="featured-text"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome to a space where you can slow down, breathe, and reconnect
            with yourself. Delnaz uses powerful, science-backed tools that help
            you release emotional blocks, overcome patterns, and step into
            clarity and confidence.
          </motion.p>
        </section>

        {/* sixth section */}
        <Sessionform />

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
