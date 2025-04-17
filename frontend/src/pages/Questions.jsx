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
      return "bg-red-600";
    }

    if (opcao === respostaCorreta) {
      return "bg-green-600";
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
      <div className="text-center text-black font-bold">
        <p className="text-xl uppercase">
          Pergunta {numero} de {total}
        </p>
        <h1 className="text-2xl mt-4 uppercase">{texto}</h1>
      </div>

      {/* Opções */}
      <div className="mt-10 w-full flex flex-col gap-4 max-w-[500px]">
        {opcoes.map((opcao, index) => (
          <button
            key={index}
            onClick={() => onResposta(opcao)}
            className={clsx(
              "text-white text-lg font-bold py-4 rounded-lg transition",
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
          className="mt-8 text-center bg-white text-black p-4 rounded-xl max-w-[500px] shadow-md"
        >
          <p className="font-semibold">Explicação:</p>
          <p>{explicacao}</p>
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
