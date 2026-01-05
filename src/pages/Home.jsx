import { useEffect ,useState} from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchcategories } from '../api/mealdb';
import { Link } from 'react-router-dom';


const Home = () => {
    const [Categories, setcategories] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(()=>{
        fetchcategories()
        .then((Response)=>setcategories(Response.data.categories))
        .catch((err)=>console.log(err) )
        .finally(()=> {
         setloading(false);
        })
    },[]);
    if(loading) return <LoadingSpinner/>
      return <div className="max-w-6xl mx-auto p-3">
    
        <div className="text-center mb-10 mt-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-emerald-900 tracking-tight">Browse meal Categories</h1>
            <p className='mt-3 text-lg text-gray-500 font-semibold '>discover delicious recipes from around the world</p>
            <div className="mt-4 flex justify-center">
            <div className='h-1 w-24 bg-emerald-600 rounded-full'> </div>
        </div>
        </div>
        <div className= "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {Categories.map((cat)=>(
            <Link to={`/category/${cat.strCategory}`} key={cat.idCategory} className="group cursor-pointer">
                 <img src={cat.strCategoryThumb} alt={cat.strCategory} 
                 className='w-full rounded-lg shadow 
                 group-hover:shadow-xl transition '/>
                 <p className='mt-2  text-emerald-800 font-medium text-center'>{cat.strCategory}</p>
            </Link>
        ))}
        </div>

     </div>
}
export default Home

