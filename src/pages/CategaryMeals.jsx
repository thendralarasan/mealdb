import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchMealsByCategory } from '../api/mealdb';
import Mealcart from '../components/Mealcart';

const CategaryMeals = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchMealsByCategory(decodedCategory)
      .then((response) => setMeals(response.data.meals || []))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

  }, [decodedCategory]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold capitalize mb-6 text-emerald-800">
        {decodedCategory} meals
      </h1>

      {meals.length === 0 ? (
        <p className="text-center text-gray-600">No meals found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <Mealcart key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategaryMeals;
