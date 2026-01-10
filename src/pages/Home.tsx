import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchMealsByArea } from "../api/mealdb";
import Mealcart from "../components/Mealcart";
import foodVideo from "../assets/food.mp4";
import { motion, AnimatePresence } from "framer-motion";
type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const Home = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const country = params.get("country");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!country) {
      setMeals([]);
      return;
    }

    setLoading(true);
    fetchMealsByArea(country)
      .then((res) => {
        setMeals(res.data.meals || []);
      })
      .catch(() => setMeals([]))
      .finally(() => setLoading(false));
  }, [country]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">

        {country ? (
          <motion.div
            key="country-meals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto p-4"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl md:text-3xl font-semibold text-emerald-900 text-center mb-8"
            >
              {country} Dishes
            </motion.h1>

            {loading ? (
              <p className="text-center text-gray-600">Loading meals...</p>
            ) : meals.length === 0 ? (
              <p className="text-center text-gray-600">No meals found</p>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.08 }
                  }
                }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
              >
                {meals.map((meal ,index) => (
                  <motion.div
                    key={meal.idMeal}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <Mealcart meal={meal} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ) : (
    
          <motion.div
            key="home-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-[90vh] overflow-hidden"
          >
        
            <motion.video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <source src={foodVideo} type="video/mp4" />
            </motion.video>

         
            <div className="absolute inset-0 bg-black/40"></div>

       
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-5xl font-bold text-white mb-4"
              >
                Your Next Favorite Meal Starts Here 
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-200 mb-8"
              >
               Explore hand-Picked recipes and flavors from every corner of the world
              </motion.p>


              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/category")}
                  className="px-6 py-3 bg-white text-emerald-900 font-medium rounded-lg"
                >
                  Categories
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/favorites")}
                  className="px-6 py-3 bg-emerald-700 text-white font-medium rounded-lg"
                >
                  Favorites
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
