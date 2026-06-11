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
import "./form2.css";
import Footer from "../footer/footer";
import Header from "../header/header";

const HealingJourneyForm2 = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 9;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, type: "", message: "" });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    name: "",
    ageRange: "",
    emotionalThemes: [],
    emotionalComfort: "",
    copingStyle: "",
    groupComfort: "",
    menopauseStage: "",
    physicalChanges: [],
    bodyRelationship: "",
    emotionalLandscape: [],
    nervousResponse: [],
    groundingTools: "",
    selfExpression: "",
    identityShift: "",
    menopauseMeaning: "",
    healingApproach: [],
    readinessReason: "",
    lettingGo: [],
    reflection: "",
    supportLevel: "",
    crisis: "",
    therapySupport: "",
    healingDefinition: "",
    commitment: "",
    concerns: "",
    consentCare: false,
    consentConfidentiality: false,
  });

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const OptionCard = ({
    label,
    selected,
    onClick,
    type = "checkbox",
    name,
  }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`option-card ${selected ? "selected" : ""}`}
    >
      <Form.Check
        type={type}
        name={name}
        checked={selected}
        readOnly
        label={label}
      />
    </motion.div>
  );

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

    // Validate consents
    if (!formData.consentCare || !formData.consentConfidentiality) {
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Please accept both consent agreements before submitting."
      });
      setStep(9);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ show: false, type: "", message: "" });

    try {
      const response = await fetch("https://app.delnazmedora.com/api/submit-healing-journey", {
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
            name: "",
            ageRange: "",
            emotionalThemes: [],
            emotionalComfort: "",
            copingStyle: "",
            groupComfort: "",
            menopauseStage: "",
            physicalChanges: [],
            bodyRelationship: "",
            emotionalLandscape: [],
            nervousResponse: [],
            groundingTools: "",
            selfExpression: "",
            identityShift: "",
            menopauseMeaning: "",
            healingApproach: [],
            readinessReason: "",
            lettingGo: [],
            reflection: "",
            supportLevel: "",
            crisis: "",
            therapySupport: "",
            healingDefinition: "",
            commitment: "",
            concerns: "",
            consentCare: false,
            consentConfidentiality: false,
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
              🌿GROUP EMOTIONAL HEALING SESSIONS
            </h3>

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
                    
                    <Form.Control
                      className="mb-3"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />

                    <Form.Control
                      className="mb-3"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />

                    <Form.Control
                      className="mb-3"
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />

                    <Form.Control
                      className="mb-3"
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />

                    <hr className="my-4" />

                    <h4>Basic Information</h4>
                    <Form.Control
                      className="mb-3"
                      placeholder="Your name (what you'd like to be called)"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />

                    <p>Age Range</p>
                    <Row>
                      {["20–30", "31–40", "41–50", "51+"].map((i) => (
                        <Col xs={6} key={i}>
                          <OptionCard
                            label={i}
                            type="radio"
                            name="ageRange"
                            selected={formData.ageRange === i}
                            onClick={() =>
                              setFormData({ ...formData, ageRange: i })
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
                    <h4>2️⃣ Emotional Themes & Current Challenges</h4>
                    <Row>
                      {[
                        "Anxiety or constant worry",
                        "Emotional overwhelm or burnout",
                        "Low self-worth / self-criticism",
                        "Relationship wounds (family, partner, friendships)",
                        "Grief or unresolved loss",
                        "Difficulty expressing emotions",
                        "Trauma or past emotional pain",
                        "Feeling stuck or disconnected from myself",
                        "Menopause / life transition emotional changes",
                        "Other",
                      ].map((i) => (
                        <Col md={6} key={i}>
                          <OptionCard
                            label={i}
                            selected={formData.emotionalThemes.includes(i)}
                            onClick={() =>
                              handleMultiSelect("emotionalThemes", i)
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
                    <h4>3️⃣ Self-Awareness & Emotional Capacity</h4>
                    <p className="mb-3">
                      These questions help assess readiness for group healing.
                    </p>

                    {/* Emotional Comfort */}
                    <p>
                      <strong>
                        How comfortable are you with exploring your emotions?
                      </strong>
                    </p>
                    {[
                      "Very comfortable",
                      "Somewhat comfortable",
                      "Not very comfortable, but willing",
                    ].map((i) => (
                      <OptionCard
                        key={i}
                        label={i}
                        type="radio"
                        name="emotionalComfort"
                        selected={formData.emotionalComfort === i}
                        onClick={() =>
                          setFormData({ ...formData, emotionalComfort: i })
                        }
                      />
                    ))}

                    <hr />

                    {/* Strong Emotions Response */}
                    <p>
                      <strong>
                        When strong emotions arise, what do you usually do?
                      </strong>
                    </p>
                    {[
                      "Avoid or distract myself",
                      "Get overwhelmed",
                      "Talk it out",
                      "Journal / reflect",
                      "I'm not sure",
                    ].map((i) => (
                      <OptionCard
                        key={i}
                        label={i}
                        selected={formData.emotionalLandscape.includes(i)}
                        onClick={() =>
                          handleMultiSelect("emotionalLandscape", i)
                        }
                      />
                    ))}

                    <hr />

                    {/* Listening Capacity */}
                    <p>
                      <strong>
                        Do you feel able to listen to others' experiences
                        without trying to fix them?
                      </strong>
                    </p>
                    {["Yes", "Somewhat", "This is challenging for me"].map(
                      (i) => (
                        <OptionCard
                          key={i}
                          label={i}
                          type="radio"
                          name="groupComfort"
                          selected={formData.groupComfort === i}
                          onClick={() =>
                            setFormData({ ...formData, groupComfort: i })
                          }
                        />
                      ),
                    )}
                  </>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <>
                    <h4>4️⃣ Group Readiness & Boundaries</h4>
                    <p className="mb-3">
                      These questions help protect you and the group.
                    </p>

                    {/* Sharing Comfort */}
                    <p>
                      <strong>
                        Are you comfortable sharing at your own pace in a
                        confidential group setting?
                      </strong>
                    </p>
                    {[
                      "Yes",
                      "I'm nervous but open",
                      "I prefer mostly listening",
                    ].map((i) => (
                      <OptionCard
                        key={i}
                        label={i}
                        type="radio"
                        name="supportLevel"
                        selected={formData.supportLevel === i}
                        onClick={() =>
                          setFormData({ ...formData, supportLevel: i })
                        }
                      />
                    ))}

                    <hr />

                    {/* Crisis Check */}
                    <p>
                      <strong>
                        Are you currently experiencing severe emotional distress
                        or crisis?
                      </strong>
                    </p>
                    {["Yes", "No"].map((i) => (
                      <OptionCard
                        key={i}
                        label={i}
                        type="radio"
                        name="crisis"
                        selected={formData.crisis === i}
                        onClick={() => setFormData({ ...formData, crisis: i })}
                      />
                    ))}

                    {/* Conditional explanation */}
                    {formData.crisis === "Yes" && (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="mt-3"
                        placeholder="Please briefly explain so we can assess support needs"
                        value={formData.reflection}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reflection: e.target.value,
                          })
                        }
                      />
                    )}

                    <hr />

                    {/* Therapy Support */}
                    <p>
                      <strong>
                        Are you currently in therapy or receiving mental health
                        support?
                      </strong>
                    </p>
                    <small className="text-muted mb-2 d-block">
                      This does not disqualify you.
                    </small>

                    {["Yes", "No"].map((i) => (
                      <OptionCard
                        key={i}
                        label={i}
                        type="radio"
                        name="therapySupport"
                        selected={formData.therapySupport === i}
                        onClick={() =>
                          setFormData({ ...formData, therapySupport: i })
                        }
                      />
                    ))}
                  </>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <>
                    <h4>5️⃣ Nervous System & Intentions</h4>

                    {/* Nervous System Awareness */}
                    <p>
                      <strong>
                        When you feel overwhelmed, what do you experience most
                        often?
                      </strong>
                    </p>
                    {["Restlessness", "Shutdown", "Tension", "Fatigue"].map(
                      (i) => (
                        <OptionCard
                          key={i}
                          label={i}
                          selected={formData.nervousResponse.includes(i)}
                          onClick={() =>
                            handleMultiSelect("nervousResponse", i)
                          }
                        />
                      ),
                    )}

                    <hr />

                    {/* Intentions & Goals */}
                    <p>
                      <strong>
                        What called you to this emotional healing course at this
                        time in your life?
                      </strong>
                    </p>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="mb-3"
                      placeholder="You can share whatever feels true for you right now…"
                      value={formData.readinessReason}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          readinessReason: e.target.value,
                        })
                      }
                    />

                    <p>
                      <strong>
                        If this course were successful for you, what would be
                        different emotionally at the end?
                      </strong>
                    </p>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="mb-3"
                      placeholder="How might you feel, respond, or relate to yourself differently?"
                      value={formData.healingDefinition}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          healingDefinition: e.target.value,
                        })
                      }
                    />

                    <p>
                      <strong>
                        What emotions would you like to feel more of?
                      </strong>
                    </p>
                    <Form.Control
                      className="mb-2"
                      placeholder="e.g. calm, joy, safety, self-trust, confidence"
                      value={formData.reflection}
                      onChange={(e) =>
                        setFormData({ ...formData, reflection: e.target.value })
                      }
                    />
                  </>
                )}

                {/* STEP 6 */}
                {step === 6 && (
                  <>
                    <h4>6️⃣ Voice, Identity & Healing Preferences</h4>

                    {/* Voice & Self-Expression */}
                    <p>
                      <strong>
                        How freely do you express your needs and truth?
                      </strong>
                    </p>
                    {["Very open", "Somewhat", "Rarely"].map((i) => (
                      <OptionCard
                        key={i}
                        type="radio"
                        name="expression"
                        label={i}
                        selected={formData.selfExpression === i}
                        onClick={() =>
                          setFormData({ ...formData, selfExpression: i })
                        }
                      />
                    ))}

                    <hr />

                    {/* Learning & Healing Preferences */}
                    <p>
                      <strong>What formats help you heal best?</strong>
                    </p>
                    {[
                      "Guided meditations",
                      "Journaling / reflection",
                      "Group sharing",
                      "Somatic / body-based practices",
                      "Psychoeducation (understanding emotions)",
                      "Creative exercises",
                    ].map((i) => (
                      <OptionCard
                        key={i}
                        label={i}
                        selected={formData.healingApproach.includes(i)}
                        onClick={() => handleMultiSelect("healingApproach", i)}
                      />
                    ))}

                    <hr />

                    {/* Between-Session Openness */}
                    <p>
                      <strong>
                        Are you open to gentle emotional practices between
                        sessions?
                      </strong>
                    </p>
                    {["Yes", "Maybe", "No"].map((i) => (
                      <OptionCard
                        key={i}
                        type="radio"
                        name="betweenSessions"
                        label={i}
                        selected={formData.betweenSessions === i}
                        onClick={() =>
                          setFormData({ ...formData, betweenSessions: i })
                        }
                      />
                    ))}
                  </>
                )}

                {/* STEP 7 */}
                {step === 7 && (
                  <>
                    <h4>7️⃣ Commitment & Expectations</h4>

                    <p>
                      <strong>
                        This is a 10-module group journey. Are you willing to
                        commit to attending most sessions?
                      </strong>
                    </p>

                    {["Yes", "I will try", "I'm unsure"].map((i) => (
                      <OptionCard
                        key={i}
                        type="radio"
                        name="commitment"
                        label={i}
                        selected={formData.commitment === i}
                        onClick={() =>
                          setFormData({ ...formData, commitment: i })
                        }
                      />
                    ))}

                    <hr />

                    <p>
                      <strong>
                        What concerns or hesitations do you have about joining
                        this group?
                      </strong>
                    </p>

                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="You can share anything that feels important…"
                      value={formData.concerns}
                      onChange={(e) =>
                        setFormData({ ...formData, concerns: e.target.value })
                      }
                    />
                  </>
                )}

                {/* STEP 8 */}
                {step === 8 && (
                  <>
                    <h4>8️⃣ Final Reflection & Letting Go</h4>

                    <p>
                      <strong>What do you feel most ready to let go of?</strong>
                      <br />
                      <small className="text-muted">
                        (You can choose more than one)
                      </small>
                    </p>

                    {[
                      "Self-criticism",
                      "People-pleasing",
                      "Emotional suppression",
                      "Over-responsibility",
                      "Constant striving",
                      "Ignoring my own needs",
                    ].map((i) => (
                      <OptionCard
                        key={i}
                        label={i}
                        selected={formData.lettingGo.includes(i)}
                        onClick={() => handleMultiSelect("lettingGo", i)}
                      />
                    ))}

                    <hr className="my-4" />

                    <p>
                      <strong>
                        Is there anything about your emotional journey that
                        feels important for me to know before welcoming you into
                        this group?
                      </strong>
                    </p>

                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Share anything that feels meaningful, tender, or important…"
                      value={formData.reflection}
                      onChange={(e) =>
                        setFormData({ ...formData, reflection: e.target.value })
                      }
                    />
                  </>
                )}

                {/* STEP 9 */}
                {step === 9 && (
                  <>
                    <h4>9️⃣ Consent & Understanding</h4>

                    <p className="mt-3">
                      Please read and confirm the following:
                    </p>

                    <Form.Check
                      className="mb-3"
                      type="checkbox"
                      label="I understand this course is for emotional healing and personal growth, not a replacement for medical or psychiatric treatment."
                      checked={formData.consentCare}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          consentCare: e.target.checked,
                        })
                      }
                    />

                    <Form.Check
                      className="mb-4"
                      type="checkbox"
                      label="I agree to respect confidentiality and personal boundaries within the group."
                      checked={formData.consentConfidentiality}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          consentConfidentiality: e.target.checked,
                        })
                      }
                    />

                    <p>
                      <strong>
                        Is there anything else you'd like to share before
                        completing this intake?
                      </strong>
                    </p>

                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Optional – share anything that feels important or supportive to name..."
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          additionalInfo: e.target.value,
                        })
                      }
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="d-flex justify-content-between mt-4">
              {step > 1 && (
                <Button
                  variant="outline-secondary"
                  onClick={() => setStep(step - 1)}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}
              {step < totalSteps ? (
                <Button variant="outline-dark" onClick={() => setStep(step + 1)} disabled={isSubmitting}>
                  Next
                </Button>
              ) : (
                <Button variant="success" onClick={handleSubmit} disabled={isSubmitting}>
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

export default HealingJourneyForm2;