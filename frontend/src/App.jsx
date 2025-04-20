import { useState } from "react";
import Layout from "./components/Layout";
import Bemvindo from "./pages/Bemvindo";
import QRCodeScreen from "./pages/QRCodeScreen";
import Quiz from "./components/Quiz";
import Finalizacao from "./pages/Finalizacao";

function App() {
  const [page, setPage] = useState("bemvindo");
  const [resultado, setResultado] = useState({ total: 0, acertos: 0 });

  const handleFinish = ({ total, acertos }) => {
    setResultado({ total, acertos });
    setPage("finalizacao");
  };

  const renderPage = () => {
    switch (page) {
      case "bemvindo":
        return <Bemvindo onStart={() => setPage("qrcode")} />;
      case "qrcode":
        return <QRCodeScreen onTimeout={() => setPage("quiz")} />;
      case "quiz":
        return <Quiz onFinish={handleFinish} />;
      case "finalizacao":
        return (
          <Finalizacao
            total={resultado.total}
            acertos={resultado.acertos}
            onRestart={() => setPage("bemvindo")}
          />
        );
      default:
        return <Bemvindo onStart={() => setPage("qrcode")} />;
    }
  };

  return <Layout pageKey={page}>{renderPage()}</Layout>;
}

export default App;
