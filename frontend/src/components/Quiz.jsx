import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Questions from "../pages/Questions";

import api from "../services/api";

const Quiz = ({ onFinish }) => {
  const [perguntas, setPerguntas] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [explicacao, setExplicacao] = useState("");
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    const buscarPerguntas = async () => {
      const response = await api.get("/api/quiz/questions");
      setPerguntas(response.data.questions);
    };

    buscarPerguntas();
  }, []);

  const perguntaAtual = perguntas[indexAtual];

  console.log("Perguntas:", perguntas);

  const handleResposta = async (resposta) => {
    if (bloqueado || !perguntaAtual) return;

    setBloqueado(true);
    setRespostaSelecionada(resposta);

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
        } else {
          onFinish();
        }
      }, 5000);
    } catch (err) {
      console.error("Erro ao verificar resposta:", err);
    }
  };

  if (!perguntaAtual || !perguntaAtual.texto || !perguntaAtual.opcoes) {
    return <div>Carregando...</div>;
  }

  return (
    <Questions
      numero={indexAtual + 1}
      total={perguntas.length}
      texto={perguntaAtual.question}
      opcoes={perguntaAtual.options}
      onResposta={handleResposta}
      respostaSelecionada={respostaSelecionada}
      respostaCorreta={respostaCorreta}
      explicacao={explicacao}
    />
  );
};

Quiz.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default Quiz;
