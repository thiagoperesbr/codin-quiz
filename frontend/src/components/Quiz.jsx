import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Questions from "../pages/Questions";

import api from "../services/api";
import { AnimatePresence } from "framer-motion";

const Quiz = ({ onFinish }) => {
  const [perguntas, setPerguntas] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [explicacao, setExplicacao] = useState("");
  const [bloqueado, setBloqueado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(90);

  useEffect(() => {
    const buscarPerguntas = async () => {
      const response = await api.get("/api/quiz/questions");
      setPerguntas(response.data.questions);
    };

    buscarPerguntas();
  }, []);

  useEffect(() => {
    if (perguntas.length === 0) return;

    const timer = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish({ total: perguntas.length, acertos });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [perguntas]);

  const perguntaAtual = perguntas[indexAtual];

  const handleResposta = async (resposta) => {
    if (bloqueado || !perguntaAtual) return;

    setBloqueado(true);
    setRespostaSelecionada(resposta);

    let acertou = false;

    if (resposta === perguntaAtual.answer) {
      acertou = true;
    }

    try {
      const response = await api.get(
        `/api/quiz/answer/${perguntaAtual.questionID}`
      );

      setRespostaCorreta(response.data.correct_answer);
      setExplicacao(response.data.explanation);

      setTimeout(() => {
        if (indexAtual + 1 < perguntas.length) {
          setIndexAtual((prev) => prev + 1);
          setRespostaSelecionada(null);
          setRespostaCorreta(null);
          setExplicacao("");
          setBloqueado(false);

          // Atualiza acertos se acertou a questão
          if (acertou) {
            setAcertos((prev) => prev + 1);
          }
        } else {
          if (acertou) {
            onFinish({ total: perguntas.length, acertos: acertos + 1 });
          } else {
            onFinish({ total: perguntas.length, acertos });
          }
        }
      }, 7000);
    } catch (err) {
      console.error("Erro ao verificar resposta:", err);
    }
  };

  if (!perguntaAtual || !perguntaAtual.question || !perguntaAtual.options) {
    return <div>Carregando...</div>;
  }

  return (
    <AnimatePresence mode="sync" initial={false}>
      <Questions
        key={indexAtual}
        numero={indexAtual + 1}
        total={perguntas.length}
        texto={perguntaAtual.question}
        opcoes={perguntaAtual.options}
        onResposta={handleResposta}
        respostaSelecionada={respostaSelecionada}
        respostaCorreta={respostaCorreta}
        explicacao={explicacao}
      />
    </AnimatePresence>
  );
};

Quiz.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default Quiz;
