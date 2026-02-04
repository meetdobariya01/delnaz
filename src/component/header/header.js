import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  HiMenuAlt3,
  HiX,
  HiOutlineUserCircle,
} from "react-icons/hi";
import "./header.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);

  // Sticky scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuAnimation = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "100%", transition: { duration: 0.4 } },
  };

  const menuItems = [
    "About",
    "Services",
    "Sanctum",
    "Blog",
    "Contact",
  ];

  return (
    <>
      {/* Sticky + Scroll reveal */}
      <motion.div
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar
          expand="lg"
          className={`main-header ${sticky ? "sticky" : ""}`}
        >
          <Container fluid>
            {/* Logo */}
            <Navbar.Brand href="/" className="logo">
              <img
                src="/images/delnaz.png"
                alt="Delnaz Medora Logo"
                className="logo-img"
              />
            </Navbar.Brand>

            {/* Desktop Menu */}
            <Nav className="mx-auto desktop-menu d-none d-lg-flex">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  }}
                >
                  <Nav.Link
                    href={`/${item.toLowerCase()}`}
                    className="hover-link"
                  >
                    {item}
                  </Nav.Link>
                </motion.div>
              ))}
            </Nav>

            {/* Login Icon - Desktop */}
            <motion.div
              className="login-icon d-none d-lg-flex"
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 10,
              }}
            >
              <Nav.Link href="/login" className="login-link">
                <HiOutlineUserCircle size={28} />
                <span className="ms-1">Login</span>
              </Nav.Link>
            </motion.div>

            {/* Mobile Menu Icon */}
            <div
              className="menu-icon d-lg-none"
              onClick={() => setShowMenu(true)}
            >
              <HiMenuAlt3 size={32} />
            </div>
          </Container>
        </Navbar>
      </motion.div>

      {/* Mobile Slide Animated Menu */}
      {showMenu && (
        <motion.div
          className="mobile-menu"
          variants={menuAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="close-icon" onClick={() => setShowMenu(false)}>
            <HiX size={32} />
          </div>

          <ul className="mobile-nav-links">
            {[...menuItems, "Login"].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <a
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setShowMenu(false)}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default Header;
