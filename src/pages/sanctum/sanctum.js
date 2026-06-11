import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import { motion } from "framer-motion";
import "./sanctum.css";

const services = [
  {
    title: "Anxiety Therapy",
    // price: "₹1500",
    video: "./images/video.mp4",
  },
  {
    title: "Depression Therapy",
    // price: "₹1800",
    video: "./images/video2.mp4",
  },
  {
    title: "Couple Therapy",
    // price: "₹2000",
    video: "./images/video.mp4",
  },
  {
    title: "Child Therapy",
    // price: "₹1400",
    video: "./images/video2.mp4",
  },
  {
    title: "Stress Management",
    // price: "₹1200",
    video: "./images/video2.mp4",
  },
  {
    title: "Trauma Therapy",
    // price: "₹2200",
    video: "./images/video.mp4",
  },
  {
    title: "Couple Therapy",
    // price: "₹2000",
    video: "./images/video2.mp4",
  },
  {
    title: "Child Therapy",
    // price: "₹1400",
    video: "./images/video.mp4",
  },
];
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};
const Sanctum = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // or "smooth"
    });
  }, [pathname]);
  const handleBookNow = (item) => {
    const email = "therapy@delnazmedora.com";

    const subject = `Booking Request - ${item.title}`;

    const body = `
Dear Delnaz Medora,

I hope you are doing well.

I would like to book the ${item.title} package and would appreciate it if you could guide me through the next steps in the booking process.

Could you please share:

The booking procedure
Available dates and time slots
Any documents or information required from my side
Payment details and confirmation process

I would also be grateful if you could let me know your availability so that we can schedule the session at a convenient time.

I look forward to hearing from you.

Thank you for your assistance.

Kind regards,
  `;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <Header />
      <div className="therapy-container">
        <div className="therapy-grid">
          {services.map((item, index) => (
            <motion.div
              className="therapy-video-card"
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              whileHover={{ scale: 1.04 }}
            >
              <div className="video-wrapper">
                <video src={item.video} autoPlay muted loop playsInline />
              </div>

              <div className="card-content">
                <h3>{item.title}</h3>
                <button onClick={() => handleBookNow(item)}>
                  Book Now {item.price}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sanctum;
