import React, { useState, lazy, Suspense, memo } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import "./blog.css";

const Header = lazy(() => import("../../component/header/header"));
const Footer = lazy(() => import("../../component/footer/footer"));

const blogs = [
  {
    title: "Managing Anxiety in Daily Life",
    category: "Anxiety",
    date: "Jan 10, 2025",
    description:
      "Learn practical techniques to calm your mind, manage worry, and regain emotional balance.",
    content:
      "Anxiety can feel overwhelming, but therapy helps identify triggers, challenge negative thoughts, and practice grounding techniques such as deep breathing and mindfulness. With consistent support, you can regain control and emotional balance.",
  },
  {
    title: "How Therapy Helps Heal Emotional Trauma",
    category: "Trauma",
    date: "Jan 18, 2025",
    description:
      "Understanding trauma and how professional therapy can support long-term healing.",
    content:
      "Therapy offers a safe environment to process traumatic experiences, reduce emotional distress, and rebuild trust. Evidence-based approaches help clients restore emotional safety and resilience.",
  },
  {
    title: "Improving Communication in Relationships",
    category: "Relationships",
    date: "Jan 25, 2025",
    description:
      "Healthy communication is the foundation of strong relationships.",
    content:
      "Effective communication involves empathy, listening, and clarity. Therapy supports couples and individuals in resolving conflict and strengthening emotional bonds.",
  },
  {
    title: "Overcoming Burnout and Workplace Stress",
    category: "Stress",
    date: "Feb 02, 2025",
    description:
      "Recognize the signs of burnout and restore balance.",
    content:
      "Burnout affects both mental and physical health. Therapy helps manage stress, set healthy boundaries, and regain motivation and balance.",
  },
  {
    title: "Building Self-Esteem and Confidence",
    category: "Personal Growth",
    date: "Feb 10, 2025",
    description:
      "Reshape negative self-beliefs and build confidence.",
    content:
      "Through therapy, individuals learn self-compassion, challenge negative thoughts, and develop confidence and emotional strength.",
  },
  {
    title: "Mindfulness Techniques for Mental Peace",
    category: "Mindfulness",
    date: "Feb 18, 2025",
    description:
      "Simple mindfulness practices for clarity and calm.",
    content:
      "Mindfulness helps you stay present and emotionally regulated. Therapy teaches grounding exercises that reduce anxiety and improve mental clarity.",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

/* ---------- Blog Card (Memoized) ---------- */
const BlogCard = memo(({ blog, index, onReadMore }) => (
  <Col lg={4} md={6} className="mb-4">
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="blog-card h-100">
        <Card.Body>
          <span className="blog-category">{blog.category}</span>
          <h5 className="blog-card-title">{blog.title}</h5>
          <small className="blog-date">{blog.date}</small>
          <p className="blog-description">{blog.description}</p>
        </Card.Body>

        <Card.Footer className="border-0 bg-transparent">
          <Button
            variant="link"
            className="blog-read-more"
            onClick={() => onReadMore(blog)}
          >
            Read More <FaArrowRight />
          </Button>
        </Card.Footer>
      </Card>
    </motion.div>
  </Col>
));

/* ---------- Main Component ---------- */
const Blog = () => {
  const [show, setShow] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleShow = (blog) => {
    setSelectedBlog(blog);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <section className="blog-section">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="blog-title">Therapy Insights & Resources</h2>
            <p className="blog-subtitle">
              Expert guidance for mental health, growth, and well-being
            </p>
          </motion.div>

          <Row>
            {blogs.map((blog, index) => (
              <BlogCard
                key={index}
                blog={blog}
                index={index}
                onReadMore={handleShow}
              />
            ))}
          </Row>
        </Container>
      </section>

      {/* Modal loads only when opened */}
      {show && (
        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedBlog?.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <span className="blog-category">{selectedBlog?.category}</span>
            <p className="blog-date">{selectedBlog?.date}</p>
            <p style={{ lineHeight: "1.8", marginTop: "15px" }}>
              {selectedBlog?.content}
            </p>
          </Modal.Body>

          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      )}

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Blog;
