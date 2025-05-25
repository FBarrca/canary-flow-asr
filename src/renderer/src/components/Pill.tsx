"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Component() {
  const [isHovered, setIsHovered] = useState(false)

  // Waveform animation variants
  const waveformVariants = {
    animate: {
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  // Button size + scale variants
  const buttonVariants = {
    rest: {
      width: 48,
      height: 10,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2,      // ← wait for dots to exit (0.2s)
      },
    },
    hover: {
      width: 64,
      height: 24,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <div className="fixed inset-0 flex items-end justify-center pb-6">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className="relative bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/30 text-white rounded-full shadow-sm flex items-center justify-center overflow-hidden"
              variants={buttonVariants}
              initial="rest"
              animate={isHovered ? "hover" : "rest"}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait">
                {isHovered && (
                  <motion.div
                    key="waveform"
                    className="flex items-center justify-center space-x-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}  // ← faster fade out
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-white rounded-full"
                        style={{ height: 10 }}
                        variants={waveformVariants}
                        animate="animate"
                        transition={{
                          ...waveformVariants.animate.transition,
                          delay: 0.5 + i * 0.1, // same pop‐in delay as before
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="top" className="mb-2">
            <p>Click to start dictating</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
