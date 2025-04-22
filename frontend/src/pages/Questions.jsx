import { motion } from "framer-motion";
import PropTypes from "prop-types";
import clsx from "clsx";

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

const Questions = ({
  numero,
  total,
  texto,
  opcoes,
  onResposta,
  respostaSelecionada,
  respostaCorreta,
  explicacao,
}) => {
  const getButtonStyle = (opcao) => {
    if (!respostaSelecionada) return "bg-[#3c3c3c] hover:bg-black";

    if (opcao === respostaSelecionada && opcao === respostaCorreta) {
      return "bg-green-600";
    }

    if (opcao === respostaSelecionada && opcao !== respostaCorreta) {
      return "bg-red-700";
    }

    if (opcao === respostaCorreta) {
      return "bg-green-700";
    }

    return "bg-[#3c3c3c] opacity-50";
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center px-10 bg-[#f5b116]"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Título da Pergunta */}
      <div className="text-center font-bold text-[#3c3c3c] drop-shadow-lg space-y-[40px] max-w-[80%]">
        <div className="text-4xl uppercase">
          Pergunta {numero} de {total}
        </div>
        <div className="text-2xl uppercase">{texto}</div>
      </div>

      {/* Opções */}
      <div className="mt-10 w-full flex flex-col gap-4 max-w-[70%]">
        {opcoes.map((opcao, index) => (
          <button
            key={index}
            onClick={() => onResposta(opcao)}
            className={clsx(
              "text-white text-2xl font-bold py-6 rounded-lg transition",
              getButtonStyle(opcao)
            )}
            disabled={!!respostaSelecionada}
          >
            {opcao}
          </button>
        ))}
      </div>

      {/* Explicação */}
      {explicacao && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-[40px] text-center text-[#3c3c3c] max-w-[85%]"
        >
          <p className="font-semibold italic text-2xl uppercase">
            {`"${explicacao}"`}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

Questions.propTypes = {
  numero: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  texto: PropTypes.string.isRequired,
  opcoes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onResposta: PropTypes.func.isRequired,
  respostaSelecionada: PropTypes.string,
  respostaCorreta: PropTypes.string,
  explicacao: PropTypes.string,
};

export default Questions;
