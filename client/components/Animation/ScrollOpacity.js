import React from 'react'
import { motion, Variants } from 'framer-motion';

export default function ScrollOpacity({ once = true, duration, direction, children }) {
  const cardVariants = {
    offscreen: {
      x: direction == "right" ? -100 : 100,
      opacity: 0
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration
      }
    }
  };

  return (
    <motion.div 
      initial={"offscreen"}
      whileInView={"onscreen"}
      viewport={{ once, amount: 0.8 }}
    >
      <motion.div variants={cardVariants}>
        { children }
      </motion.div>
    </motion.div>
  )
}
