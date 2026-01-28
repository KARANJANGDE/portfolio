"use client";
import React from "react";
import Navbar from "./Navbar";
import HomeSection from "./HomeSection";
import { useTheme } from "@/context/ThemeContext";
import { motion, Variants } from "framer-motion";

export default function HomePage() {
  const { dark } = useTheme();

  const pageVariants:Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        min-h-screen
        transition-colors duration-700 ease-in-out
        ${dark ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      <Navbar />
      <HomeSection />
    </motion.section>
  );
}