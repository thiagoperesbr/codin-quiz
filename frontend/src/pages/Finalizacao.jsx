import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const Finalizacao = ({ acertos, total, onRestart }) => {
  const [contador, setContador] = useState(7);

  useEffect(() => {
    if (contador === 0) {
      onRestart();
      return;
    }

    const timer = setTimeout(() => {
      setContador((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [contador, onRestart]);

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-between text-[#3c3c3c] text-center px-6 py-10 bg-[#f5b116]"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-8xl font-bold mb-[120px] uppercase">Parabéns</h1>
        <p className="text-6xl font-bold uppercase">
          Você acertou {acertos} de {total} perguntas
        </p>

        <p className="mt-[120px] text-6xl font-bold uppercase max-w-[60%]">
          Aproveite nosso stand para conhecer um pouco mais sobre a CODIN RJ
        </p>
      </div>

      <div className="mb-10 text-3xl font-bold uppercase">
        Retornando em {contador} segundo{contador > 1 ? "s" : ""}...
      </div>
    </motion.div>
  );
};

Finalizacao.propTypes = {
  acertos: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Finalizacao;
