import React, {  useEffect, useState } from 'react'
import { fetchmealbyarea } from '../api/mealdb'
import Mealcart from '../components/Mealcart'
import LoadingSpinner from '../components/LoadingSpinner'
import { useNavigate, useSearchParams} from 'react-router-dom'


const countries=[
    { label:" Indian " ,value:"Indian"},
    {label:" Italian", value:"Italian"},
    {label:"Canadian" , value:"Canadian"}
]
const Countrymeals = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams();

const activecountry = params.get("country")

     const [meals,setMeals]=useState([])
     const [loading,setloading]=useState(false)

     useEffect(()=>{
        if(!activecountry) return

        setloading(true)
        fetchmealbyarea(activecountry)
        .then((Response)=> setMeals(Response.data.meals ||[]))
        .catch(console.log)
        .finally(()=>setloading(false))
     },[activecountry])
  return (
    <div className=' space-y-6'>
      <div className=' flex justify-center gap-4'>
        {countries.map((c)=>(
            <button key={c.value}
            onClick={()=> navigate(`/?country=${c.value}`)}
            className={`px-5 py-2 rounded-full font-medium transition ${activecountry === c.value ? "bg-emerald-700 text-white":"bg-emerald-100 text-emerald-800 hover:bg-emerald-200"}`}
            >
           {c.label}
            </button>
        ))}
      </div>
      {loading && <LoadingSpinner/>}
      {!loading && activecountry && (
        <>
        <h3 className='text-xl font-semibold text-center'>{activecountry}Dishes</h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'> {meals.map(meal=>(
            <Mealcart key={meal.idMeal} meal={meal}/>
        ))}</div>
        </>
      )}
      {!activecountry && (
        <p className='text-center text-gray-500'>
            select your country to view Dishes
        </p>
      )}
    </div>
  )
}

export default Countrymeals
