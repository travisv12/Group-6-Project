import Navbar from "./Navbar";
import Sustainability from "./Sustainability";
import Collaboration from "./Collaboration";
import Recipe from "./Recipe";
import Points from "./Points";
import Started from "./Started";
import Footer from "./Footer";
import "./MainPage.css";

function MainPage() {
  return (
    <div>
      <Navbar />
      <Sustainability />
      <Collaboration />
      <Recipe />
      <Points />
      <Started />
      <Footer />
    </div>
  );
}

export default MainPage;
