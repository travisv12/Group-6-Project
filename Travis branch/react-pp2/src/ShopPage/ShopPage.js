import Navbar from "./Navbar";
import SaveFood from "./SaveFood";
import Filter from "./Filter";
import "./ShopPage.css";
import Products from "./Products";

function ShopPage() {
  return (
    <div>
      <Navbar />
      <SaveFood />
      <Filter />
      <Products />
    </div>
  );
}

export default ShopPage;
