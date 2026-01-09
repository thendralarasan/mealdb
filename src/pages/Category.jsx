import { useEffect, useState } from "react";
import { fetchCategories, fetchMealsByCategory } from "../api/mealdb";
import { Link, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Mealcart from "../components/Mealcart";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [params] = useSearchParams();
  const activeCategory = params.get("category");

 
  useEffect(() => {
    if (activeCategory) return;

    setLoading(true);
    fetchCategories()
      .then(res => setCategories(res.data.categories || []))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  
  useEffect(() => {
    if (!activeCategory) return;

    setLoading(true);
    fetchMealsByCategory(activeCategory)
      .then(res => setMeals(res.data.meals || []))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      {activeCategory ? (
        <>
          <h1 className="text-2xl font-semibold text-center mb-6">
            {activeCategory} Meals
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {meals.map(meal => (
              <Mealcart key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Browse Categories
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.idCategory}
                to={`/category?category=${encodeURIComponent(cat.strCategory)}`}
                className="text-center"
              >
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="rounded shadow hover:shadow-lg transition"
                />
                <p className="mt-2 font-medium">{cat.strCategory}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
