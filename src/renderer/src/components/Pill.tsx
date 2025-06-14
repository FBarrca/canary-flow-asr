'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip } from '@fluentui/react-components'
import './Pill.css'

export default function Component() {
  const [isHovered, setIsHovered] = useState(false)

  // Waveform animation variants
  const waveformVariants = {
    animate: {
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  // Button size + scale variants
  const buttonVariants = {
    rest: {
      width: 40,
      height: 8,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.2 // ← wait for dots to exit (0.2s)
      }
    },
    hover: {
      width: 64,
      height: 24,
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  }

  return (
    <div className="floating-container">
      <Tooltip content="Click to start dictating" relationship="label">
        <motion.button
          className="btn"
          variants={buttonVariants}
          initial="rest"
          animate={isHovered ? 'hover' : 'rest'}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div
                key="waveform"
                className="waveform"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} // ← faster fade out
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="wave-bar"
                    style={{ height: 10 }}
                    variants={waveformVariants}
                    animate="animate"
                    transition={{
                      ...waveformVariants.animate.transition,
                      delay: 0.5 + i * 0.1 // same pop‐in delay as before
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </Tooltip>
    </div>
  )
}
