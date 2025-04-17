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

const Finalizacao = ({ nome, acertos, total, onTimeout }) => {
  const [contador, setContador] = useState(5);

  useEffect(() => {
    if (contador === 0) {
      onTimeout();
      return;
    }

    const timer = setTimeout(() => {
      setContador((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [contador, onTimeout]);

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-between text-black text-center px-6 py-10 bg-[#f5b116]"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-4 uppercase">Parabéns</h1>
        <h2 className="text-2xl font-bold uppercase mb-6">{nome}</h2>
        <p className="text-xl font-semibold">
          Você acertou {acertos} de {total} perguntas
        </p>

        <p className="mt-10 text-lg font-semibold max-w-[90%]">
          Aproveite nosso stand para conhecer um pouco mais sobre a CODIN - RIO
        </p>
      </div>

      <div className="mt-10 text-sm font-bold">
        Retornando em {contador} segundo{contador > 1 ? "s" : ""}...
      </div>
    </motion.div>
  );
};

Finalizacao.propTypes = {
  nome: PropTypes.string.isRequired,
  acertos: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onTimeout: PropTypes.func.isRequired,
};

export default Finalizacao;
