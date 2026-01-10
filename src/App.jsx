import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Mealdetails from "./pages/Mealdetails";
import Favorites from "./pages/Favorites";
import SearchResult from "./pages/SearchResult";
import Countrymeals from "./pages/Countrymeals";
import { FavoritesProvider } from "./Contexts/Favcontexts";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Header />

        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/meal/:id" element={<Mealdetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/country" element={<Countrymeals />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-5xl text-red-700 mt-20">
                404 - Not Found
              </h1>
            }
          />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
