import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  ProgressBar,
  Row,
  Col,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "./form.css";
import Footer from "../footer/footer";
import Header from "../header/header";

const ParentingWorkshopForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, type: "", message: "" });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    role: "",
    childrenCount: "",
    challenges: [],
    responseStyle: "",
    emotions: [],
    connection: 5,
    childEmotion: "",
    triggers: [],
    disciplineStyle: "",
    goals: [],
    workshopChange: "",
    openness: "",
    futureSentence: "",
  });

  const handleMultiSelect = (field, value, limit = null) => {
    setFormData((prev) => {
      let updated = [...prev[field]];
      if (updated.includes(value)) {
        updated = updated.filter((v) => v !== value);
      } else {
        if (!limit || updated.length < limit) {
          updated.push(value);
        }
      }
      return { ...prev, [field]: updated };
    });
  };

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Please fill in all contact information before submitting."
      });
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ show: false, type: "", message: "" });

    try {
      const response = await fetch("http://localhost:5005/api/submit-parenting-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          show: true,
          type: "success",
          message: "Form Submitted Successfully ✅ We will contact you soon!"
        });
        console.log("Final Data:", formData);
        
        // Reset form after successful submission
        setTimeout(() => {
          setStep(1);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            age: "",
            gender: "",
            role: "",
            childrenCount: "",
            challenges: [],
            responseStyle: "",
            emotions: [],
            connection: 5,
            childEmotion: "",
            triggers: [],
            disciplineStyle: "",
            goals: [],
            workshopChange: "",
            openness: "",
            futureSentence: "",
          });
          setTimeout(() => {
            setSubmitStatus({ show: false, type: "", message: "" });
          }, 3000);
        }, 3000);
      } else {
        setSubmitStatus({
          show: true,
          type: "danger",
          message: data.message || "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const OptionCard = ({ label, selected, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`option-card ${selected ? "selected" : ""}`}
    >
      {label}
    </motion.div>
  );
  
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <div>
      {/* Header */}
      <Header />

      <div className="parent-wrapper py-5">
        <Container>
          <Card className="form-card shadow-lg p-4">
            <h3 className="text-center mb-2">
              🌱 Parenting Workshop – Parent Reflection Questionnaire
            </h3>
            <p className="text-center text-muted mb-4">
              There are no right or wrong answers. This form helps us understand
              your experiences so the workshop can support you better.
            </p>

            {submitStatus.show && (
              <Alert 
                variant={submitStatus.type} 
                onClose={() => setSubmitStatus({ show: false, type: "", message: "" })}
                dismissible
              >
                {submitStatus.message}
              </Alert>
            )}

            <div className="d-flex justify-content-between mb-2">
              <small>
                Step {step} of {totalSteps}
              </small>
              <small>{Math.round((step / totalSteps) * 100)}%</small>
            </div>

            <ProgressBar
              now={(step / totalSteps) * 100}
              animated
              striped
              className="mb-4"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                {/* STEP 1 */}
                {step === 1 && (
                  <>
                    <h4>1️⃣ Contact Information</h4>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </Form.Group>

                    <hr className="my-4" />

                    <h4>About Your Child</h4>

                    <p>Child’s age:</p>
                    <Row>
                      {["0–3", "4–6", "7–10", "11–14", "15–18", "18+"].map(
                        (item) => (
                          <Col xs={6} md={4} key={item}>
                            <OptionCard
                              label={item}
                              selected={formData.age === item}
                              onClick={() =>
                                setFormData({ ...formData, age: item })
                              }
                            />
                          </Col>
                        ),
                      )}
                    </Row>

                    <p className="mt-4">Child’s gender:</p>
                    <Row>
                      {[
                        "Male",
                        "Female",
                        "Non-binary",
                        "Prefer not to say",
                      ].map((item) => (
                        <Col xs={6} md={3} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.gender === item}
                            onClick={() =>
                              setFormData({ ...formData, gender: item })
                            }
                          />
                        </Col>
                      ))}
                    </Row>

                    <p className="mt-4">Are you a:</p>
                    <Row>
                      {[
                        "Mother",
                        "Father",
                        "Caregiver",
                        "Single parent",
                        "Co-parenting",
                      ].map((item) => (
                        <Col xs={6} md={4} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.role === item}
                            onClick={() =>
                              setFormData({ ...formData, role: item })
                            }
                          />
                        </Col>
                      ))}
                    </Row>

                    <p className="mt-4">How many children?</p>
                    <Row>
                      {["1", "2", "3+"].map((item) => (
                        <Col xs={4} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.childrenCount === item}
                            onClick={() =>
                              setFormData({ ...formData, childrenCount: item })
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <>
                    <h4>2️⃣ Current Challenges (Select up to 3)</h4>
                    <Row>
                      {[
                        "Not listening / defiance",
                        "Anger or emotional outbursts",
                        "Screen addiction / phone usage",
                        "Anxiety / fearfulness",
                        "Low confidence / self-esteem",
                        "Academic stress",
                        "Sibling rivalry",
                        "Excessive dependence on parent",
                        "Withdrawal / silence",
                        "Sleep issues",
                        "Eating issues",
                        "Tantrums / meltdowns",
                        "Lying / secrecy",
                        "Aggression",
                        "I feel disconnected from my child",
                        "I don’t understand my child anymore",
                      ].map((item) => (
                        <Col xs={12} md={6} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.challenges.includes(item)}
                            onClick={() =>
                              handleMultiSelect("challenges", item, 3)
                            }
                          />
                        </Col>
                      ))}
                    </Row>

                    <h5 className="mt-4">When issues arise, I usually:</h5>
                    <Row>
                      {[
                        "I shout / lose patience",
                        "I lecture or explain repeatedly",
                        "I withdraw or give up",
                        "I try to stay calm but feel overwhelmed",
                        "I feel helpless",
                        "I punish",
                        "I feel guilty later",
                      ].map((item) => (
                        <Col xs={12} md={6} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.responseStyle === item}
                            onClick={() =>
                              setFormData({ ...formData, responseStyle: item })
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <>
                    <h4>3️⃣ Emotional Climate</h4>

                    <p>Which emotions do you feel most often?</p>
                    <Row>
                      {[
                        "Love",
                        "Joy",
                        "Guilt",
                        "Anxiety",
                        "Frustration",
                        "Exhaustion",
                        "Anger",
                        "Confusion",
                        "Helplessness",
                        "Fear of doing it wrong",
                      ].map((item) => (
                        <Col xs={6} md={4} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.emotions.includes(item)}
                            onClick={() => handleMultiSelect("emotions", item)}
                          />
                        </Col>
                      ))}
                    </Row>

                    <p className="mt-4">
                      Connection Level ({formData.connection}/10)
                    </p>
                    <Form.Range
                      min={1}
                      max={10}
                      value={formData.connection}
                      onChange={(e) =>
                        setFormData({ ...formData, connection: e.target.value })
                      }
                    />

                    <h5 className="mt-4">What does your child feel most?</h5>
                    <Row>
                      {[
                        "Happy",
                        "Anxious",
                        "Angry",
                        "Lonely",
                        "Pressured",
                        "Confused",
                        "Calm",
                      ].map((item) => (
                        <Col xs={6} md={4} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.childEmotion === item}
                            onClick={() =>
                              setFormData({ ...formData, childEmotion: item })
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <>
                    <h4>4️⃣ Parent’s Inner World</h4>
                    <Row>
                      {[
                        "I repeat patterns from my own childhood",
                        "I get triggered more than I’d like",
                        "I feel judged by others",
                        "I compare myself to other parents",
                        "I feel I’m failing my child at times",
                        "I don’t know how to regulate myself",
                      ].map((item) => (
                        <Col xs={12} md={6} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.triggers.includes(item)}
                            onClick={() => handleMultiSelect("triggers", item)}
                          />
                        </Col>
                      ))}
                    </Row>

                    <h5 className="mt-4">Discipline felt like:</h5>
                    <Row>
                      {[
                        "Loving & guiding",
                        "Strict & fear-based",
                        "Inconsistent",
                        "Emotionally unavailable",
                        "I don’t remember / unsure",
                      ].map((item) => (
                        <Col xs={12} md={6} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.disciplineStyle === item}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                disciplineStyle: item,
                              })
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <>
                    <h4>5️⃣ What You Want to Gain (Top 2)</h4>
                    <Row>
                      {[
                        "Better communication with my child",
                        "Tools to handle anger & meltdowns",
                        "Understanding my child’s emotions",
                        "Becoming a calmer parent",
                        "Healing my own triggers",
                        "Creating stronger connection",
                        "Discipline without guilt",
                        "Confidence as a parent",
                      ].map((item) => (
                        <Col xs={12} md={6} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.goals.includes(item)}
                            onClick={() => handleMultiSelect("goals", item, 2)}
                          />
                        </Col>
                      ))}
                    </Row>

                    <Form.Group className="mt-4">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="If successful, what would be different at home?"
                        value={formData.workshopChange}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workshopChange: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </>
                )}

                {/* STEP 6 */}
                {step === 6 && (
                  <>
                    <h4>6️⃣ Readiness & Reflection</h4>
                    <Row>
                      {[
                        "Very open",
                        "Somewhat open",
                        "Unsure but willing",
                        "Not ready yet",
                      ].map((item) => (
                        <Col xs={12} md={6} key={item}>
                          <OptionCard
                            label={item}
                            selected={formData.openness === item}
                            onClick={() =>
                              setFormData({ ...formData, openness: item })
                            }
                          />
                        </Col>
                      ))}
                    </Row>

                    <Form.Group className="mt-4">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="One sentence you'd like your child to say about you in the future"
                        value={formData.futureSentence}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            futureSentence: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="d-flex justify-content-between mt-4">
              {step > 1 && (
                <Button variant="outline-secondary" onClick={prevStep} disabled={isSubmitting}>
                  Back
                </Button>
              )}
              {step < totalSteps ? (
                <Button variant="outline-dark" onClick={nextStep} disabled={isSubmitting}>
                  Next
                </Button>
              ) : (
                <Button variant="outline-dark" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      {" Submitting..."}
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </div>
          </Card>
        </Container>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ParentingWorkshopForm;