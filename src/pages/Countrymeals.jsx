import React, {  useEffect, useState } from 'react'
import { fetchmealbyarea } from '../api/mealdb'
import Mealcart from '../components/Mealcart'
import LoadingSpinner from '../components/LoadingSpinner'


const countries=[
    { label:" Indian " ,value:"Indian"},
    {label:" Italian", value:"Italian"},
    {label:"Canadian" , value:"Canadian"}
]
const Countrymeals = () => {
     const [Acitivecountry , setAcitivecountry]= useState(null)
     const [meals,setMeals]=useState([])
     const [loading,setloading]=useState(false)

     useEffect(()=>{
        if(!Acitivecountry) return;

        setloading(true)
        fetchmealbyarea(Acitivecountry)
        .then((Response)=> setMeals(Response.data.meals ||[]))
        .catch(console.log)
        .finally(()=>setloading(false))
     },[Acitivecountry])
  return (
    <div className=' space-y-6'>
      <div className=' flex justify-center gap-4'>
        {countries.map((c)=>(
            <button key={c.value}
            onClick={()=> setAcitivecountry(c.value)}
            className={`px-5 py-2 rounded-full font-medium transition ${Acitivecountry === c.value ? "bg-emerald-700 text-white":"bg-emerald-100 text-emerald-800 hover:bg-emerald-200"}`}
            >
           {c.label}
            </button>
        ))}
      </div>
      {loading && <LoadingSpinner/>}
      {!loading && Acitivecountry && (
        <>
        <h3 className='text-xl font-semibold text-center'>{Acitivecountry}Dishes</h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'> {meals.map(meal=>(
            <Mealcart key={meal.idMeal} meal={meal}/>
        ))}</div>
        </>
      )}
      {!Acitivecountry && (
        <p className='text-center text-gray-500'>
            select your country to view Dishes
        </p>
      )}
    </div>
  )
}

export default Countrymeals
