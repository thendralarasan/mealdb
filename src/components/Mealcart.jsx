import React from 'react'
import { Link } from 'react-router-dom'
import Favbutton from './Favbutton'
import {useFav} from"../Contexts/Favcontexts";
const Mealcart = ({meal}) => {
  const {toggle,isfavorite}=useFav()
  const fav = isfavorite(meal)
  return (
    <div title={meal.strMeal} className=' relative'>
        <Favbutton onToggle={() => toggle(meal)}isfav={fav}/>
     <Link to={`/meal/${meal.idMeal}`}className='block rounded overflow-hidden shadow hover:shadow-lg transition '>
       <img src={meal.strMealThumb} alt="strmeal" className=" w-full h-48 object-cover" />
       <div className=' p-3 text-center'>
         <p className=' font-medium text-gray-800 truncate'>{meal.strMeal}</p>
       </div>
     </Link>
    </div>
  )
}   

export default Mealcart
