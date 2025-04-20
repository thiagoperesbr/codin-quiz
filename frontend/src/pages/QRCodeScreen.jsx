import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
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

const QRCodeScreen = ({ onTimeout }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      onTimeout();
    }, 11000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onTimeout]);

  return (
    <motion.div
      className="flex flex-col h-full w-full justify-center items-center bg-[#f5b116]"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Mensagem + QR Code */}
      <div className="flex flex-col items-center gap-20">
        <h1 className="text-3xl text-center font-bold uppercase text-[#3c3c3c] drop-shadow-2lg">
          Escaneie o QR Code abaixo
          <br />
          junte-se a CODIN RJ no Instagram!
        </h1>

        <QRCodeSVG
          value="https://instagram.com/codin.rj"
          size={350}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />

        {countdown > 0 ? (
          <h2 className="text-3xl text-center font-bold uppercase text-[#3c3c3c] drop-shadow-2lg">
            O quiz irá começar em
            <br />
            {countdown} segundo{countdown !== 1 ? "s" : ""}
          </h2>
        ) : (
          <h2 className="text-3xl text-center font-bold uppercase text-[#3c3c3c] drop-shadow-2lg">
            O quiz irá começar agora!
          </h2>
        )}
      </div>
    </motion.div>
  );
};

QRCodeScreen.propTypes = {
  onTimeout: PropTypes.func.isRequired,
};

export default QRCodeScreen;
