import { useState } from "react";
import Layout from "./components/Layout";
import Bemvindo from "./pages/Bemvindo";
import QRCodeScreen from "./pages/QRCodeScreen";
import Quiz from "./components/Quiz";
import Finalizacao from "./pages/Finalizacao";

function App() {
  const [page, setPage] = useState("bemvindo");

  const renderPage = () => {
    switch (page) {
      case "bemvindo":
        return <Bemvindo onStart={() => setPage("qrcode")} />;
      case "qrcode":
        return <QRCodeScreen onTimeout={() => setPage("quiz")} />;
      case "quiz":
        return <Quiz onFinish={() => setPage("finalizacao")} />;
      case "finalizacao":
        return <Finalizacao onRestart={() => setPage("bemvindo")} />;
      default:
        return <Bemvindo onStart={() => setPage("qrcode")} />;
    }
  };

  return <Layout pageKey={page}>{renderPage()}</Layout>;
}

export default App;
