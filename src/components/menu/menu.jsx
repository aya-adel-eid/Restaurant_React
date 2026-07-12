import { useEffect } from "react";
import style from "./Menu.module.css";
import Header from "../Shared/header/Header";
import { useState } from "react";
import axios from "axios";
import MealCard from "../meal/MealCard";
export function Menu() {
  let [allCategories, setCategories] = useState(null);
  let [allMeals, setAllMeals] = useState(null);
  let [disolayMeals, setDisplayMeals] = useState(null);
  let [active, setActivatecategory] = useState("all");
  function getAllCategories() {
    axios
      .get(`https://restaurant-project-node-js.vercel.app/api/category`)
      .then((apiResponce) => {
        console.log(apiResponce.data.data);
        setCategories(apiResponce.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      });
  }
  function getAllMeals() {
    axios
      .get(`https://restaurant-project-node-js.vercel.app/api/menu`)
      .then((responce) => {
        setAllMeals(responce.data.data);
        setDisplayMeals(responce.data.data);
      })
      .catch((apiResponce) => {
        console.log(apiResponce.responce.data.errorMessage);
      });
  }
  function getMealByCategory(category) {
    setActivatecategory(category);
    if (category === "all") {
      setDisplayMeals(allMeals);
      return;
    }
    const filterMeal = allMeals.filter(
      (meal) => meal.productCategory.name == category,
    );
    setDisplayMeals(filterMeal);
  }
  useEffect(() => {
    getAllCategories();
    getAllMeals();
  }, []);
  return (
    <>
      <section>
        <Header
          hightlight={"What We Serve"}
          text={"our menu"}
          decripOne={
            "We consider all the drivers of change giving you the components you need to"
          }
          decripTwo={"create a truly happy experience."}
        ></Header>
        {/* lists of category */}
        <div className="py-8">
          <div className="py-6">
            <ul className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 place-items-center justify-items-center">
              <li
                onClick={() => getMealByCategory("all")}
                className={`px-8 py-3 rounded-full font-semibold cursor-pointer transition-all duration-300 border
    ${
      active === "all"
        ? "bg-main-600 text-white border-main-600 shadow-lg scale-105"
        : "bg-white text-gray-700 border-gray-200 hover:bg-main-600 hover:text-white hover:border-main-600 hover:-translate-y-1"
    }`}
              >
                All
              </li>

              {allCategories?.map((category) => (
                <li
                  key={category._id}
                  onClick={() => getMealByCategory(category.name)}
                  className={`px-8 py-3 rounded-full font-semibold cursor-pointer transition-all duration-300 border
    ${
      active === category.name
        ? "bg-main-600 text-white border-main-600 shadow-lg scale-105"
        : "bg-white text-gray-700 border-gray-200 hover:bg-main-600 hover:text-white hover:border-main-600 hover:-translate-y-1"
    }`}
                >
                  {category.displayName}
                </li>
              ))}
            </ul>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 px-15 gap-4">
            {disolayMeals ? (
              disolayMeals.map((meal) => (
                <MealCard
                  title={meal.productName}
                  descrip={meal.productDescription}
                  price={meal.productPrice}
                  image={meal.imageUrl}
                  key={meal._id}
                  ID={meal._id}
                  category={meal.productCategory.name}
                ></MealCard>
              ))
            ) : (
              <p>Meals Not Found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
