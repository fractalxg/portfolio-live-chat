import { motion } from "framer-motion";

const RevealY = ({ children, width = "fit-content", delay }) => {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, translateY: 50 },
          visible: { opacity: 1, translateY: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, ease: "easeIn", delay: delay }}
      >
        {children}
      </motion.div>
    );
};

export const RevealX = ({ children, width = "fit-content", delay }) => {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, translateX: -100 },
          visible: { opacity: 1, translateX: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, ease: "easeIn", delay: delay }}
      >
        {children}
      </motion.div>
    );
  };

export default RevealY 