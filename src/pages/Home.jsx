import { useEffect ,useState} from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchcategories , fetchmealbyarea} from '../api/mealdb';
import { Link } from 'react-router-dom';
import Countrymeals from './Countrymeals';
import { useSearchParams } from 'react-router-dom';
import Mealcart from'../components/Mealcart';

const Home = () => {
    const [Categories, setcategories] = useState([])
    const[meals ,setMeals] = useState([])
    const [loading, setloading] = useState(true)
 
    const [params] = useSearchParams()
    const activecountry= params.get("country")

    useEffect(()=>{
        if(activecountry)return
        setloading(true)
        fetchcategories()
        .then(Response=>setcategories(Response.data.categories ||[]))
        .catch(console.log)
        .finally(()=> 
         setloading(false)
        )
    },[activecountry]);


     useEffect(()=>{
        if(!activecountry)return
        setloading(true)
        fetchmealbyarea(activecountry)
        .then(Response=>setMeals(Response.data.meals ||[]))
        .catch(console.log)
        .finally(()=> 
         setloading(false)
        )
    },[activecountry]);



    if(loading) return <LoadingSpinner/>
      return <div className="max-w-6xl mx-auto p-3 relative z-10 mt-6">
    
    
 {activecountry ? (
        <>
          <h1 className="text-2xl md:text-3xl font-semibold text-emerald-900 text-center mb-8">
            {activecountry} Dishes
          </h1>

          {meals.length === 0 ? (
            <p className="text-center text-gray-600">No meals found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {meals.map(meal => (
                <Mealcart key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
   
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-semibold text-emerald-900 tracking-tight">
              Browse meal Categories
            </h1>
            <p className="mt-3 text-lg text-gray-500 font-semibold">
              Discover delicious recipes from around the world
            </p>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-24 bg-emerald-600 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Categories.map(cat => (
              <Link
                key={cat.idCategory}
                to={`/category/${encodeURIComponent(cat.strCategory)}`}
                className="group cursor-pointer"
              >
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="w-full rounded-lg shadow group-hover:shadow-xl transition"
                />
                <p className="mt-2 text-emerald-800 font-medium text-center">
                  {cat.strCategory}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  
}
export default Home

