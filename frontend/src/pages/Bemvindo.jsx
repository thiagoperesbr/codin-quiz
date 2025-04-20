/* eslint-disable react/no-unescaped-entities */
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const images = [
  "/rio1.jpg",
  "/rio2.jpeg",
  "/rio3.jpg",
  "/rio4.jpg",
  "/rio5.jpg",
  "/rio6.jpg",
];

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

const Bemvindo = ({ onStart }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full h-full justify-between items-center relative overflow-hidden">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={images[index]}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="z-10 max-w-[80%] text-white mt-16 text-[40px] text-center">
        <p className="font-bold uppercase drop-shadow-2xl">
          O estado que tem "Rio" no nome oferece um mar de oportunidades nas
          áreas de turismo, serviços, logística, TI, indústria metalmecânica,
          automotivo, confecção, construção naval, petróleo e gás.
        </p>
      </div>

      <button
        onClick={onStart}
        className="z-10 bg-[#f5b116] px-[180px] py-14 mb-10 text-black font-bold text-4xl rounded-md shadow-md hover:bg-white transition-all duration-300 ease-in-out"
      >
        TOQUE AQUI PARA COMEÇAR
      </button>
    </div>
  );
};

Bemvindo.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default Bemvindo;
