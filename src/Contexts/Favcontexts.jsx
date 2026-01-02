import {  useState, createContext, useContext , useEffect } from "react";


const favcontexts = createContext();
const STORAGE_KEY ="mealdb_favorites";

const loadfavoritesfromstorge =()=>{
    try{
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw? JSON.parse(raw):[];
    }catch(err){
        console.log("failed to parse favorites from localstorge" , err);
        return [];
    }
};

export const FavoritesProvider =({children})=>{
    const [favorites, setfavorites] = useState(loadfavoritesfromstorge );
    useEffect(()=>{
        try{
         localStorage.setItem(STORAGE_KEY,JSON.stringify(favorites))
        }catch(err){
            console.log("failed to save favorites",err)
        }
    },[favorites]);
    const toggle =(meal)=>{
    setfavorites((prev)=>{
        const exists = prev.some((m)=>m.idMeal === meal.idMeal);

        return exists ? prev.filter((m)=>m.idMeal !== meal.idMeal) : [...prev,meal]
    } 
    )};
   const isfavorite =(meal)=>favorites.some((m) =>m.idMeal === meal.idMeal);

   return (
  <favcontexts.Provider value={{ favorites, toggle, isfavorite }}>
    {children}
  </favcontexts.Provider>
)

};
   export const useFav =()=>{
    const context =useContext(favcontexts);
    if(!context){
        throw new Error("something went wrong")
    }
    return context;
   }



