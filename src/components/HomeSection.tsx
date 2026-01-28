"use client";
import React, { useState } from "react";
import ProjectDescription from "./ProjectDescription";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function HomeSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const cards = Array(3).fill(null);
  const { dark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: (index: number) => ({
      opacity: 1,
      transition: {
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  const titleVariants: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  const contentVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {/* Mobile project selector */}
      <div className="md:hidden sticky top-0 z-30 w-full px-4 py-3">
        <div
          className={`flex gap-2 justify-between rounded-xl p-2 backdrop-blur

    `}
        >
          {cards.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`
    relative pb-1.5 text-sm font-medium tracking-tight
    after:absolute after:bottom-0 after:left-1/2 after:h-0.5 
    after:-translate-x-1/2 after:bg-current  
    ${
      isActive
        ? "text-primary after:w-5"
        : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-3"
    }
  `}
              >
                {`Project 0${index + 1}`}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
        flex font-epilogue w-full
        flex-col md:flex-row
        md:h-screen
      "
      >
        {cards.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              onClick={() => setActiveIndex(index)}
              className={`
              relative overflow-hidden cursor-pointer
transition-[width,height,background-color] duration-500 ease-in-out


              /* DESKTOP */
              md:h-full
              ${isActive ? "md:w-11/12" : "md:w-20"}
              border-l-0 md:border-l-2
              ${dark ? "border-white" : "border-black"}
            `}
              whileHover={
                !isActive
                  ? {
                      backgroundColor: dark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.04)",
                    }
                  : undefined
              }
            >
              {/* Active content */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={`content-${index}`}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="h-full w-full"
                  >
                    <ProjectDescription index={index + 1} dark={dark} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inactive title */}
              <AnimatePresence mode="wait">
                {!isActive && (
                  <motion.p
                    key={`title-${index}`}
                    variants={titleVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`
                    absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                    uppercase
                    ${dark ? "text-white" : "text-black"}
                    /* MOBILE */
                    top-1/2 left-4 -translate-y-1/2 rotate-0
                    /* DESKTOP */
                    md:top-1/2 md:left-1/2
                    md:-translate-x-1/2 md:-translate-y-1/2
                    md:rotate-[-90deg]
                    md:origin-center
                    transition-all duration-500 ease-in-out
                    whitespace-nowrap
                  `}
                  >
                    Project {index + 1}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
