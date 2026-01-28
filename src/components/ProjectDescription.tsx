"use client";
import React, { useState, useEffect } from "react";
import { ExternalLink, Calendar, User, Tag } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Project, projects } from "@/json/projectdetails";
import Image from "next/image";

interface ProjectDescriptionProps {
  index: number;
  dark: boolean;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  index,
  dark,
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [, setActiveImage] = useState<number>(0);
  const [, setScrollContainer] = useState<HTMLElement | null>(null);

  const currentProject: Project = projects[index] || projects[1];

  useEffect(() => {
    const container = document.getElementById(`scroll-container-${index}`);
    setScrollContainer(container);

    const handleScroll = (e: Event): void => {
      const element = e.target as HTMLElement;
      const progress =
        (element.scrollTop / (element.scrollHeight - element.clientHeight)) *
        100;
      setScrollProgress(progress);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [index]);

  const handleImageClick = (imageIndex: number): void => {
    setActiveImage(imageIndex);
  };

  const headerVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  const contentVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full bg-red-600 origin-left"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Main Content */}
      <div
        id={`scroll-container-${index}`}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: dark ? "#4B5563 transparent" : "#9CA3AF transparent",
        }}
      >
        {/* Masthead - Sticky Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className={`
            sticky top-0 z-40 border-b-4 
            duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
            transition-[background-color]
            ${dark ? "border-white bg-black" : "bg-white border-black"}
          `}
        >
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 sm:mb-2"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  {currentProject.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  {currentProject.category}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className={`
                font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                font-bold mb-2 leading-tight
                ${dark ? "text-white" : "text-black"}
              `}
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {currentProject.title}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t-2 border-b-2 border-current py-2 mt-4"
            >
              <p className="text-base sm:text-lg italic font-serif">
                {currentProject.subtitle}
              </p>
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-mono">
                  {currentProject.author}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Article Content */}
        <div
          className={`
            px-4 sm:px-6 md:px-8 lg:px-16 
            py-8 sm:py-10 md:py-12
            ${dark ? "text-gray-100" : "text-gray-900"}
          `}
        >
          <div className="max-w-4xl mx-auto">
            {/* Drop Cap Lead Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`
                text-lg sm:text-xl leading-relaxed mb-8 font-serif
                ${dark ? "text-gray-300" : "text-gray-800"}
              `}
              style={{ fontFamily: "Merriweather, serif" }}
            >
              <span
                className={`
                  float-left text-6xl sm:text-7xl md:text-8xl 
                  font-bold leading-none mr-2 sm:mr-3 mt-1 sm:mt-2
                  ${dark ? "text-white" : "text-black"}
                `}
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {currentProject.excerpt[0]}
              </span>
              {currentProject.excerpt.slice(1)}
            </motion.p>

            {/* Content Blocks */}
            {currentProject.content.map((block, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mb-8 sm:mb-10 md:mb-12"
              >
                {block.type === "text" && (
                  <p
                    className={`
                      text-base sm:text-lg leading-loose font-serif 
                      columns-1 md:columns-2 gap-6 md:gap-8 mb-6 md:mb-8
                      ${dark ? "text-gray-300" : "text-gray-800"}
                    `}
                    style={{ fontFamily: "Merriweather, serif" }}
                  >
                    {block.text}
                  </p>
                )}

                {block.type === "image" && (
                  <motion.figure
                    className="my-8 sm:my-10 md:my-12 cursor-pointer group"
                    onClick={() => handleImageClick(idx)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="overflow-hidden border-2 sm:border-4 border-current">
                      <img
                        src={block.url || ""}
                        alt={block.caption || "Project image"}
                        width={883}
                        height={990}
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <figcaption
                      className={`
                        text-center text-xs sm:text-sm italic mt-3 sm:mt-4 font-serif
                        ${dark ? "text-gray-400" : "text-gray-600"}
                      `}
                    >
                      {block.caption}
                    </figcaption>
                  </motion.figure>
                )}

                {block.type === "quote" && (
                  <blockquote
                    className={`
                      my-8 sm:my-10 md:my-12 
                      py-6 sm:py-7 md:py-8 
                      px-6 sm:px-8 md:px-12 
                      border-l-4 sm:border-l-6 md:border-l-8
                      ${dark ? "border-white" : "border-black bg-white"}
                    `}
                  >
                    <p
                      className={`
                        text-xl sm:text-2xl md:text-3xl 
                        font-serif italic leading-relaxed mb-3 sm:mb-4
                        ${dark ? "text-white" : "text-black"}
                      `}
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      &quot;{block.text}&quot;
                    </p>
                    <cite className="text-xs sm:text-sm uppercase tracking-wider font-mono not-italic">
                      — {block.author}
                    </cite>
                  </blockquote>
                )}
              </motion.div>
            ))}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`
                mt-12 sm:mt-14 md:mt-16 
                p-6 sm:p-7 md:p-8 
                border-2 sm:border-4
                ${dark ? "border-white" : "border-black bg-white"}
                text-center duration-300
              `}
            >
              <h3
                className={`
                  text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4
                  ${dark ? "text-white" : "text-black"}
                `}
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Explore This Project
              </h3>
              <p
                className={`
                  text-base sm:text-lg mb-4 sm:mb-6 font-serif
                  ${dark ? "text-gray-300" : "text-gray-700"}
                `}
              >
                Visit the live project to experience the full implementation
              </p>
              <motion.a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  inline-flex items-center gap-2 sm:gap-3 
                  px-6 sm:px-7 md:px-8 
                  py-3 sm:py-3.5 md:py-4
                  ${
                    dark
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }
                  font-mono uppercase tracking-wider 
                  text-xs sm:text-sm
                  transition-all duration-300
                `}
              >
                View Project
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            </motion.div>

            {/* Newspaper Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-12 sm:mt-14 md:mt-16 pt-6 sm:pt-7 md:pt-8 border-t-2 sm:border-t-4 border-current"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                <div>
                  <h4 className="font-mono uppercase text-xs tracking-wider mb-2 opacity-60">
                    Published
                  </h4>
                  <p className="font-serif text-sm sm:text-base">
                    {currentProject.date}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono uppercase text-xs tracking-wider mb-2 opacity-60">
                    Category
                  </h4>
                  <p className="font-serif text-sm sm:text-base">
                    {currentProject.category}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono uppercase text-xs tracking-wider mb-2 opacity-60">
                    Author
                  </h4>
                  <p className="font-serif text-sm sm:text-base">
                    {currentProject.author}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* End Mark */}
            <div className="text-center mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-7 md:mb-8">
              <span className="text-3xl sm:text-4xl">❦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
