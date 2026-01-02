import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from"./pages/Home"
import CategaryMeals from "./pages/CategaryMeals";
import Mealdetails from "./pages/Mealdetails";
import { FavoritesProvider } from "./Contexts/Favcontexts";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
    <FavoritesProvider>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/category/:category" element={<CategaryMeals/>}/>
      <Route path="/meal/id"  element={<Mealdetails/>} />
      <Route path="/favorites" element={<Favorites/>} />
    </Routes>
    </FavoritesProvider>
    </BrowserRouter>
  );
};

export default App;
