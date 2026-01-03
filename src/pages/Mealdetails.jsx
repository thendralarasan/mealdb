import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchmealbyId } from '../api/mealdb';
import LoadingSpinner from '../components/LoadingSpinner';
import Favbutton from '../components/Favbutton';
import { useFav } from '../Contexts/Favcontexts';

const Mealdetails = () => {
  const{id} =useParams();
  const[meal,setMeal] = useState(null);
  const[loading ,setloading] = useState(true);
  const{ toggle ,isfavorite} = useFav();
 
  useEffect(()=>{
    setloading(true);
    fetchmealbyId(id)
    .then((res)=> setMeal(res.data.meals?.[0]|| null))
    .catch((err)=> console.log(err))
    .finally(()=>setloading(false));
  },[id]);
if (loading) return <LoadingSpinner/>
if(!meal) return <p className='text-center text-xl mt-20 text-gray-600'>meal is not found</p>
const ingredients =[];
for(let i=1; i<=20; i++){
  const ing = meal [`strIngredient${i}`];
  const measure = meal [`strMeasure${i}`];
  if(ing?.trim()) ingredients.push(`${measure} ${ing}`);
}
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl md:text-2xl font-semibold text-emerald-900 text-center mb-8">{meal.strMeal}</h1>
      <div className='grid md:grid-cols-2 gap-10 items-start'>
      <div className="relative">
        <img src={meal.strMealThumb} alt={meal.strMeal} className='w-full h-64 md:h-80 object-cover rounded shadow-sm' />
     
      <div  className="absolute top-4 right-4 z-20">
      <Favbutton meal={meal} onToggle={toggle} isfav={isfavorite(meal)} />
    </div>
</div>
<div>
  <div className=' flex gap-4 text-sm'>
    <span className='px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium'>{meal.strArea}</span>
    <span className='px-4 py-2 bg-blue-100 text-green-700 rounded-full font-medium'>{meal.strCategory}</span>
  </div>
        <h2 className="text-lg font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {ingredients.map((item, i) => (
            <li key={i}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
     
      {meal.strYoutube && (
        <a href={meal.strYoutube} target=' blank' className='inline-block bg-red-600 text-white px-6 py-2  rounded font-medium hover:bg-red-700  transition'>Watch video</a>
      )}
      </div>
      <div>
        <h2 className=' bg-blue-100 text-blue-700  font-medium'>Instruction</h2>
        <div>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Mealdetails