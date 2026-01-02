import React from 'react'
import{ useFav } from "../Contexts/Favcontexts"
import Mealcart from '../components/Mealcart';
const Favorites = () => {
    const {favorites} = useFav();
  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
         <h1 className="text-2xl font-semibold mb-6 text-emerald-900">♥ Favorites meals</h1>
         {favorites.length ===0?"Nil":(<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 "> 
        {favorites.map((meal)=>(
            <Mealcart key={meal.idMeal} meal={meal}/>
        ))}
        </div>)}
    </div>
  )
}

export default Favorites