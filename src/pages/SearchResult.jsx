import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchmeals } from '../api/mealdb';
import LoadingSpinner from '../components/LoadingSpinner';
import Mealcart from '../components/Mealcart';

const SearchResult = () => {
  const [searchparams]=useSearchParams();
  const query = searchparams.get("q")|| ""
  const[meals ,setMeals] = useState([]);
  const[loading,setLoading] =useState(true)

useEffect(()=>{
  if (!query){
    setMeals([])
    setloading(false)
    return
  }
  setLoading(true)
  searchmeals(query).then((res)=>{setMeals(res.data.meals|| [])

}).catch((err)=>{console.log(err)
  setMeals([])
}).finally(()=>{setLoading(false)})
},[query]);
if(loading) return <LoadingSpinner/>
  return (
    <div className='max-w-6xl mx-auto p-4 '>
   <h1 className='text-3xl font-semibold mb-6'>search result for"{query}"</h1>
   {meals.length===0?(<p>Not Found</p>):(<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
    {meals.map((meal)=>(
      <Mealcart key={meal.idMeal} meal={meal}/>
    ))}
   </div>
  )}
    </div>
  )

}


export default SearchResult
