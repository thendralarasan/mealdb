import { useEffect,useState} from "react";

const STORAGE_KEY ="mealbd_favorites";

const loadfavoritesfromstorge =()=>{
    try{
        const raw = localStorage.setItem(STORAGE_KEY);
        return raw? JSON.parse(raw):[];
    }catch(err){
        console.log("failed to parse favorites from localstorge" , err);
        return [];
    }
};

export default function Usefavorites(){
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

        return exists ? prev.filter((m)=>m.idMeal !== meal.idMeal) : {...prev,meal}
    } 
)};

const isfavorite =(meal)=>favorites.some((m) =>m.idmeal === meal.idmeal);
return{favorites,toggle,isfavorite};

}