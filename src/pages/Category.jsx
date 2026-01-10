import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  fetchCategories,
  fetchMealsByCategory,
  fetchMealsByArea,
  fetchMealById, 
} from "../api/mealdb";

import Mealcart from "../components/Mealcart";
import LoadingSpinner from "../components/LoadingSpinner";

const Category = () => {
  const [searchParams] = useSearchParams();

 
  const selectedCategory = searchParams.get("category");
  const selectedCountry = searchParams.get("country");

  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchCategories()
      .then((res) => {
        setCategories(res.data.categories || []);
      })
      .catch(() => {
        setCategories([]);
      });
  }, []);

 
  useEffect(() => {
    if (!selectedCategory && !selectedCountry) {
      setMeals([]);
      return;
    }

    setLoading(true);

 
    if (selectedCategory && !selectedCountry) {
      fetchMealsByCategory(selectedCategory)
        .then((res) => {
          setMeals(res.data.meals || []);
        })
        .catch(() => setMeals([]))
        .finally(() => setLoading(false));
      return;
    }

    
    if (!selectedCategory && selectedCountry) {
      fetchMealsByArea(selectedCountry)
        .then((res) => {
          setMeals(res.data.meals || []);
        })
        .catch(() => setMeals([]))
        .finally(() => setLoading(false));
      return;
    }

    
    if (selectedCategory && selectedCountry) {
      fetchMealsByCategory(selectedCategory)
        .then(async (res) => {
          const mealsByCategory = res.data.meals || [];

         
          const detailedMeals = await Promise.all(
            mealsByCategory.map((meal) =>
              fetchMealById(meal.idMeal).then(
                (r) => r.data.meals[0]
              )
            )
          );

     
          const filteredMeals = detailedMeals.filter(
            (meal) => meal.strArea === selectedCountry
          );

          setMeals(filteredMeals);
        })
        .catch(() => setMeals([]))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory, selectedCountry]);


  return (
    <div className="max-w-6xl mx-auto p-4">
      
      {!selectedCategory && !selectedCountry && (
        <>
          <h1 className="text-2xl font-semibold text-center mb-8">
            Browse Categories
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.idCategory}
                to={`/category?category=${encodeURIComponent(
                  cat.strCategory
                )}`}
                className="group"
              >
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="w-full rounded-lg shadow group-hover:shadow-lg transition"
                />
                <p className="mt-2 text-center font-medium text-emerald-800">
                  {cat.strCategory}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}

     
      {(selectedCategory || selectedCountry) && (
        <>
          <h2 className="text-2xl font-semibold text-center my-8">
            {selectedCategory && selectedCountry
              ? `${selectedCountry} ${selectedCategory} Meals`
              : selectedCategory
              ? `${selectedCategory} Meals`
              : `${selectedCountry} Meals`}
          </h2>

          {loading ? (
            <LoadingSpinner />
          ) : meals.length === 0 ? (
            <p className="text-center text-gray-600">
              No meals found
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {meals.map((meal) => (
                <Mealcart key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Category;
