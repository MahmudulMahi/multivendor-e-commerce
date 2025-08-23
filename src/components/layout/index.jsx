import Footer from "./Footer";
import Navbar from "./Navbar";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-modern-drawer/dist/index.css";
import "react-range-slider-input/dist/style.css";
export const LayoutPageWrapper = ({ children }) => {
  return (
    <section  >
      <Navbar />
      <main className="flex-grow container-custom">{children}</main>
      <Footer />
    </section>
  );
};
