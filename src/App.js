import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import NavBar from "./pages/navBar.js";
import Home from "./pages/home.js";
import About from "./pages/about.js";
import BillingPlan from "./pages/billingPlan.js";
import Favorites from "./pages/favorites.js";
import Contact from "./pages/contact.js";

import LoginPage from "./pages/login.js";
import RegisterPage from "./pages/register.js";
import Ingredients from "./pages/ingredients.js";
import MealInfo from "./pages/mealInfo.js";
import CategoryInfo from "./pages/category.js";
import Area from "./pages/area.js";
import Alphabet from "./pages/alphabet.js";
import IngredientInfo from "./pages/ingredientInfo.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* login and register */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* login and register */}

          {/* main pages  */}
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/BillingPlan" element={<BillingPlan />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="ingredients" element={<Ingredients />} />
            <Route path="/contact" element={<Contact />} />
            {/* main Pages */}

            {/*  info Pages */}
            <Route path="/mealInfo/:id" element={<MealInfo />} />
            <Route path="/category/:name" element={<CategoryInfo />} />
            <Route path="/area/:name" element={<Area />} />
            <Route path="/alphabet/:name" element={<Alphabet />} />
            <Route path="ingredient/:name" element={<IngredientInfo />} />
            {/* info Pages */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
