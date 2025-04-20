import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const variants = {
  initial: {
    opacity: 0,
    x: -1080,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 1080,
  },
};

const PageTransition = ({ children }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={children.key || Math.random()}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
