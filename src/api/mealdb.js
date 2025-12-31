 import axios from "axios";

 const Base = "https://www.themealdb.com/api/json/v1/1";
   
 export const fetchcategories =()=> axios.get(`${Base}/categories.php`)
 export const fetchmeabyCategory =(cat)=> axios.get (`${Base}/filter.php?c=${cat}`)
 export const fetchmealbyId =(id)=>axios.get(`${Base}/lookup.php?i=${id}`)
 export const searchmeals =(query)=> axios.get(`${Base}/search.php?s=${query}`)