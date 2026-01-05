import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from"./pages/Home"
import CategaryMeals from "./pages/CategaryMeals";
import Mealdetails from "./pages/Mealdetails";
import { FavoritesProvider } from "./Contexts/Favcontexts";
import Favorites from "./pages/Favorites";
import SearchResult from "./pages/SearchResult";
import Countrymeals from "./pages/Countrymeals";


function App() {
  return (
    <BrowserRouter>
    <FavoritesProvider>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/category/:category" element={<CategaryMeals/>}/>
      <Route path="/meal/:id"  element={<Mealdetails/>} />
      <Route path="/favorites" element={<Favorites/>} />
      <Route path="/search" element={<SearchResult/>}/>
       <Route path="/country" element={<Countrymeals/>}/>
      <Route path="*" element={<h1 className=" text-center text-5xl text-red-700">404 - Not Found</h1>}/>
    </Routes>
    </FavoritesProvider>
    </BrowserRouter>
  );
};

export default App;
