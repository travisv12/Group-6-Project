import Layout from "@/components/Layout";
import About from "@/pages/About";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Contact from "@/pages/Contact";

import MyAccount from "@/pages/MyAccount";
import RecipeDetails from "@/pages/recipes/RecipeDetails";

import Recipes from "@/pages/recipes";

import { useRoutes } from "react-router-dom";
import Vision from "@/pages/Vision";
import CreateRecipe from "@/pages/recipes/CreateRecipe";
import Shop from "@/pages/Shop";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import UpdateRecipe from "@/pages/recipes/UpdateRecipe";

export default function Router() {
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
          element: <Recipes />,
        },
        {
          path: "/recipes/details/:id",
          element: <RecipeDetails />,
        },
        {
          path: "/recipes/update/:id",
          element: <UpdateRecipe />,
        },
        {
          path: "/recipes/createRecipe",
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
          element: <Cart />,
        },
        {
          path: "/my-account",
          element: <MyAccount />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return routes;
}
