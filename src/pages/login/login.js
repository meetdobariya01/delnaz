import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import "./login.css";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ EMAIL LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("LOGIN SUCCESS", { email, password });
      setLoading(false);
      alert("Login Successful ✅");

      // 🔹 change route only if exists
      // window.location.href = "/";
    }, 1000);
  };

  // ✅ GOOGLE LOGIN (WORKING DEMO)
  const handleGoogleLogin = () => {
    alert("Google Login Clicked ✅ (Connect Firebase here)");
    console.log("Google login triggered");
  };

  return (
    <div>
      <Header />

      <section className="login-section">
        <Container>
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col lg={5} md={7} sm={10}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="login-card">
                  <Card.Body>
                    <div className="text-center mb-4">
                      <h2 className="login-title">Welcome Back</h2>
                      <p className="login-subtitle">
                        Continue your healing journey
                      </p>
                    </div>

                    {/* ✅ GOOGLE BUTTON FIXED */}
                    <motion.div whileHover={{ scale: 1.04 }}>
                      <Button
                        type="button"   // 🔥 VERY IMPORTANT
                        className="google-btn w-100 mb-3"
                        onClick={handleGoogleLogin}
                      >
                        <FaGoogle className="me-2" />
                        Continue with Google
                      </Button>
                    </motion.div>

                    <div className="divider">
                      <span>or</span>
                    </div>

                    {/* ✅ FORM */}
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="email"
                          placeholder="Email address"
                          className="login-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          className="login-input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>

                      {error && (
                        <p className="text-danger text-center">{error}</p>
                      )}

                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Button
                          type="submit"
                          className="login-btn w-100"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Login"}
                        </Button>
                      </motion.div>
                    </Form>

                    {/* <div className="login-footer text-center mt-4">
                      <a href="/forgot-password">Forgot Password?</a>
                      <p className="mt-2">
                        Don’t have an account? <a href="/signup">Sign up</a>
                      </p>
                    </div> */}
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
