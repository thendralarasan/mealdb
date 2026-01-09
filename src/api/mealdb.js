import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";


export const fetchCategories = () => {
  return axios.get(`${BASE_URL}/categories.php`);
};


export const fetchMealsByCategory = (category) => {
  return axios.get(`${BASE_URL}/filter.php?c=${category}`);
};


export const fetchMealById = (id) => {
  return axios.get(`${BASE_URL}/lookup.php?i=${id}`);
};


export const searchMeals = (query) => {
  return axios.get(`${BASE_URL}/search.php?s=${query}`);
};


export const fetchMealsByArea = (area) => {
  return axios.get(`${BASE_URL}/filter.php?a=${area}`);
};
