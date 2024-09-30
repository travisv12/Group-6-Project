import { useSelector } from "react-redux";
import { useRoutes, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import About from "@/pages/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Contact from "@/pages/Contact";
import MyAccount from "@/pages/MyAccount";
import RecipeDetails from "@/pages/recipes/RecipeDetails";
import Recipes from "@/pages/recipes";
import Vision from "@/pages/Vision";
import CreateRecipe from "@/pages/recipes/CreateRecipe";
import Shop from "@/pages/Shop";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import UpdateRecipe from "@/pages/recipes/UpdateRecipe";
import AccountInformation from "@/components/MyAccounts/AccountInformation";
import MyRecipes from "@/components/MyAccounts/MyRecipes";
import PurchaseHistory from "@/components/MyAccounts/PurchaseHistory";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Router() {
  const isAuthenticated = useSelector((state) => !!state.user.accessToken);
  const routes = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/recipes",
          // element: <ProtectedRoute element={<Recipes />} />,
          element: <Recipes />,
        },

        {
          path: "/recipes/details/:id",
          element: <ProtectedRoute element={<RecipeDetails />} />,
        },
        {
          path: "/recipes/update/:id",
          element: <ProtectedRoute element={<UpdateRecipe />} />,
        },
        {
          path: "/recipes/createRecipe",
          // element: <ProtectedRoute element={<CreateRecipe />} />,
          element: <CreateRecipe />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/vision",
          element: <Vision />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/cart",
          element: <ProtectedRoute element={<Cart />} />,
        },
        {
          path: "/my-account",
          // element: <ProtectedRoute element={<MyAccount />} />,
          element: <MyAccount />,
          children: [
            {
              index: true,
              element: <Navigate to="account-information" />,
            },
            {
              path: "account-information",
              element: <AccountInformation />,
            },
            {
              path: "purchase-history",
              element: <PurchaseHistory />,
            },
            {
              path: "my-recipes",
              element: <MyRecipes />,
            },
          ],
        },
        {
          path: "/register",
          element: isAuthenticated ? (
            <Navigate to="/my-account" />
          ) : (
            <Register />
          ),
        },
        {
          path: "/login",
          element: isAuthenticated ? <Navigate to="/my-account" /> : <Login />,
        },
      ],
    },
  ]);
  return routes;
}
