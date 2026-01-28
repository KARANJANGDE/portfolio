"use client";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`
        p-4 sm:p-6 md:p-8 lg:p-10 
        w-full font-epilogue 
        md:border-2 border-b-2 
        ${dark ? "border-white" : "border-black"}
        flex flex-col sm:flex-row 
        justify-between items-center 
        gap-4 sm:gap-0
      `}
      >
        <motion.ul variants={itemVariants} className="text-center sm:text-left">
          <li className="font-medium text-lg sm:text-xl">Karan Jangde</li>
          <li className="text-sm sm:text-base opacity-80">भारत / IN</li>
        </motion.ul>

        <motion.div
          variants={itemVariants}
          className="flex gap-3 sm:gap-4 md:gap-5"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`
            contact-btn relative cursor-pointer 
            transition-colors duration-500 
            px-3 py-1.5 sm:px-4 sm:py-2
            text-sm sm:text-base
            ${dark ? "dark hover:text-white" : "light hover:text-black"}
          `}
          >
            {dark ? "Dark" : "Light"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className={`
    contact-btn relative cursor-pointer 
    px-3 py-1.5 sm:px-4 sm:py-2
    text-sm sm:text-base
    ${dark ? "dark hover:text-white" : "light hover:text-black"}
  `}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Background Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setOpen(false)}
              className={`
          fixed inset-0 z-50 
          backdrop-blur-lg
          ${dark ? "bg-black/50" : "bg-black/30"}
        `}
            />

            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
          fixed z-50 top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          w-[92%] max-w-lg
          rounded-none
          p-6 sm:p-8
          ${
            dark
              ? "bg-[#0f0f0f] text-white border border-white/30"
              : "bg-[#fafafa] text-black border border-black/30"
          }
          shadow-[0_30px_80px_rgba(0,0,0,0.35)]
        `}
            >
              {/* Masthead */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-60">
                    Contact Sheet
                  </p>
                  <h2
                    className="text-2xl sm:text-3xl font-bold leading-tight"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Karan Jangde
                  </h2>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="text-xl opacity-60 hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-current opacity-30 mb-6" />

              {/* Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-60 mb-1">
                    Phone
                  </p>
                  <p className="font-medium">8866078197</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider opacity-60 mb-1">
                    Email
                  </p>
                  <p className="font-medium">jangdekaran4@gmail.com</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-current opacity-40 text-xs flex justify-between items-center">
                <span className="italic opacity-70">
                  Open to meaningful collaborations
                </span>
                <span className="uppercase tracking-widest opacity-60">
                  Portfolio
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
