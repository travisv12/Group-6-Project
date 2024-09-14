import Brands from "./Brands";
import Hero from "./Hero";
import Info from "./Info";
import Footer from "@/components/Footer";
import Testtimonials from "./Testtimonials";
import CallToAction from "./CallToAction";

const Home = () => {
  return (
    <>
      <Hero />
      <Brands />
      <CallToAction />
      <Info />
      <Testtimonials />
      <Footer />
    </>
  );
};

export default Home;
