import React, { useEffect, useState } from 'react'
import { fetchmealbyarea } from '../api/mealdb';
import LoadingSpinner from '../components/LoadingSpinner';
import Mealcart from '../components/Mealcart';


const countries =
[{name:"india"},
 {name:"italian"},
 {name:"canadian"}
];

const Topcountries = () => {
    const[data,setdata]=useState({})
    const[loading,setloading]=useState(true)

    useEffect(()=>{
        Promise.all(
            conutries.map((c)=>
           fetchmealbyarea(c.name).then((Response)=>({
            conutries:c,
            meals:Response.data.meals?.slice(0,4)||[]
           })) )
        )
       .then((Result)=>{
        const grouped ={};
        Result.forEach((r)=>{
            grouped[r.country.name]=r;
        });
        setdata(grouped);
       })
       .catch (console.log)
       .finally(()=>setloading(false))
    },[])
    if (loading) return <LoadingSpinner/>
  return (
    <div className=' max-w-6xl mx-auto p-4 space-x-10'>
   {countries.map(({name})=>(
    <div key={name}>
        <h2 className='text-2xl font-semibold mb-4'>
            {name} Dishes
        </h2>
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
            {data[name]?.meals.map((meal)=>(
                <Mealcart key={meal.idMeal} meal={meal}/>
            ))}
        </div>
    </div>
    
   ))}
      
    </div>
  )
}

export default Topcountries
