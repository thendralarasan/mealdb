import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from"./pages/Home"
import CategaryMeals from "./pages/CategaryMeals";
import Mealdetails from "./pages/Mealdetails";
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/category/:category" element={<CategaryMeals/>}/>
      <Route path={`/meal/id`} element={<Mealdetails/>} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
