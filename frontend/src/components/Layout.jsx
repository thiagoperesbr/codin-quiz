import PropTypes from "prop-types";
import PageTransition from "./PageTransition";

const Layout = ({ children, pageKey }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white">
      <div className="bg-[#002f86] flex items-center justify-between h-[250px]">
        <img
          src="/logo-codin.png"
          alt="CODIN RJ"
          className="h-[80px] mx-auto"
        />
      </div>

      <div
        className="overflow-hidden flex items-center justify-center"
        style={{ height: "calc(100% - 500px)" }}
      >
        <PageTransition pageKey={pageKey}>{children}</PageTransition>
      </div>

      <div className="bg-[#002f86] flex items-center justify-between h-[250px]">
        <img
          src="/logo-governo.png"
          alt="Governo RJ"
          className="h-[150px] mx-auto"
        />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageKey: PropTypes.string.isRequired,
};

export default Layout;
