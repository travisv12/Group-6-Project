import Brands from "./Brands";
import Hero from "./Hero";
import Info from "./Info";
import Footer from "@/components/Footer";
import Testtimonials from "./Testtimonials";
import CallToAction from "./CallToAction";
import Started from "./Started";

const Home = () => {
  return (
    <>
      <Hero />
      <Brands />
      <CallToAction />
      <Info />
      <Started />
      <Testtimonials />
      <Footer />
    </>
  );
};

export default Home;
