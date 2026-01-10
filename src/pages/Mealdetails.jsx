import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMealById } from "../api/mealdb";
import LoadingSpinner from "../components/LoadingSpinner";

const MealDetails = () => {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMealById(id)
      .then((res) => {
        setMeal(res.data.meals?.[0] || null);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!meal) return <p className="text-center mt-10">Meal not found</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ing && ing.trim()) {
      ingredients.push(`${measure} ${ing}`);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
    
      <h1 className="text-2xl md:text-3xl font-bold text-emerald-900 text-center mb-8">
        {meal.strMeal}
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-start mb-10">
       
        <div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-72 md:h-96 object-cover rounded shadow"
          />
        </div>

        <div>
           <div className="flex gap-4 mt-4 text-center ">
            <span className=" text-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
              {meal.strArea}
            </span>
            <span className=" text-center px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
              {meal.strCategory}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

    
      {meal.strYoutube && (
        <div className="text-center mb-10">
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded font-medium hover:bg-red-700 transition"
          >
            ▶ Watch Recipe Video
          </a>
        </div>
      )}

     
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {meal.strInstructions}
        </p>
      </div>
    </div>
  );
};

export default MealDetails;
