import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import foodVideo from "../assets/food.mp4";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={foodVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-6"
        >
          Discover the world of food
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl"
        >
          Explore delicious meals, browse categories,  
          and save your favorites — all in one place 🍽️
        </motion.p>

    
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-6"
        >
          <button
            onClick={() => navigate("/category")}
            className="px-8 py-4 bg-white text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition"
          >
            Categories
          </button>

          <button
            onClick={() => navigate("/favorites")}
            className="px-8 py-4 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition"
          >
            Favorites
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
