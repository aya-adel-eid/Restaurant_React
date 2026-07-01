import { useEffect, useState } from "react";
import style from "./CardDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
export function CardDetails() {
  const [count,setCount]=useState(0)
  const [relatedMeal,setRealtedMeal]=useState(null)
 let {id,category}=useParams()
 let [mealDeatils,setMealDeatisl]=useState(null)
const ingredients =
  mealDeatils?.productDescription
    ?.replace(/^Made with\s+/i, "")
    ?.replace(/^Fresh\s+/i, "")
    ?.replace(/\.$/, "")
    ?.replace(/\sand\s/g, ", ")
    ?.split(", ")
    ?.map((item) => item.trim()) || [];
 function getMealById(id){
axios.get(`https://restaurant-project-node-js.vercel.app/api/menu/${id}`).then((meal)=>{
console.log(meal.data.data);
setMealDeatisl(meal.data.data)


})
 }
 function incressCount(){
setCount((prev)=>prev+1)
 }
 function decressCount(){
  if (count>0) {
    
    setCount((prev)=>prev-1)
  }
 }
 function getRelatedMeal(category){
     axios.get(`https://restaurant-project-node-js.vercel.app/api/menu`).then((resp)=>{
      let allMeals=resp.data.data;
      let relatedMeals=allMeals.filter((meal)=>meal.productCategory.name==category);
      setRealtedMeal(relatedMeals)
     })
 }

  useEffect(() => {
  getMealById(id);
  getRelatedMeal(category)
    
  }, []);
  return (
    <>
      <section className="p-10">
        <div>
{/*  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-4">
  <div className="lg:col-span-8 ">
    {/* Image */}
  <div className="lg:col-span-8">
  <div className="overflow-hidden rounded-3xl shadow-xl">
    <img
      src={mealDeatils?.imageUrl}
      alt={mealDeatils?.productName}
      className="w-full h-[500px]  hover:scale-105 transition duration-500"
    />
  </div>
</div>
  </div>

    {/* Details */}
  <div className="lg:col-span-4">
    <div className="border-b border-b-gray-200 py-8 ">
      {/* badge */}
      <div className="bg-red-100 rounded-full px-4 py-2 text-red-700 font-bold flex w-fit items-center justify-center gap-x-1.5">
        <span><img src={mealDeatils?.imageUrl} alt=""  className="size-8 rounded-full"/></span>
        <span>

        {mealDeatils?.productCategory?.displayName}</span>
        </div>
        {/* title */}
        <h2  className="text-2xl py-6 lg:text-4xl font-bold leading-5 tracking-wide">{mealDeatils?.productName}</h2>
        {/* stars */}
        <div className="space-x-1.5 py-4">
          <span><i class="fa-solid fa-star text-yellow-300 lg:text-lg"></i></span>
            <span><i class="fa-solid fa-star text-yellow-300 lg:text-lg"></i></span>
              <span><i class="fa-solid fa-star text-yellow-300 lg:text-lg"></i></span>
                <span><i class="fa-solid fa-star text-yellow-300 lg:text-lg"></i></span>
                <span><i class="fa-solid fa-star-half-stroke text-yellow-300 lg:text-lg"></i></span>
                <span className="text-gray-400 font-semibold">4.8 (128 reviews)</span>
        </div>
        {/* price */}
        <h3 className="text-main-500 lg:text-3xl font-bold py-1.5">$ {mealDeatils?.productPrice}</h3>
        {/* description */}
        <p className="text-lg text-gray-400 leading-6 pt-2">{mealDeatils?.productDescription}</p>
    </div>
    <div>
    {/* ingredint */}
    <h2 className="py-1.5 text-lg font-bold">ingredients</h2>
   <div className="flex flex-wrap gap-2 py-4">
  {ingredients.map((ingredient, index) => (
    <span
      key={index}
      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap"
    >
      {ingredient}
    </span>
  ))}
</div>
    <div className="flex flex-col lg:flex-row  lg:items-center lg:justify-between py-4 gap-3">

    {/* quantity */}
    <div className="flex items-center gap-x-2">
    <h4 className="text-gray-500 font-medium text-lg">Quantity</h4>
   <div className="inline-flex items-center gap-4 px-3 py-2 bg-white border border-gray-200 rounded-full shadow-md">

  <button
    onClick={decressCount}
    className="size-7 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition duration-300 cursor-pointer"
  >
    <i className="fa-solid fa-minus"></i>
  </button>

  <span className="min-w-8 text-center text-xl font-bold">
    {count}
  </span>

  <button
    onClick={incressCount}
    className="size-7 rounded-full bg-main-500 text-white hover:bg-main-600 transition duration-300 cursor-pointer"
  >
    <i className="fa-solid fa-plus"></i>
  </button>

</div>

    </div>
<button className="bg-main-500 text-white py-2 px-4 rounded-full"><i class="fa-solid fa-cart-shopping pe-2"></i> Add to Cart</button>
    </div>
    <div>

    </div>

    </div>
  </div>
</div>
{/* duration */}
<div className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

  {/* Preparation Time */}
  <div className="flex items-center justify-center gap-3 p-4 border-b sm:border-b-0 sm:border-r border-gray-200">
    <span className="size-10 md:size-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
      <i className="fa-regular fa-clock text-main-500"></i>
    </span>

    <div>
      <p className="text-xs md:text-sm text-gray-500">
        Preparation Time
      </p>
      <span className="text-main-500 text-sm md:text-lg font-semibold">
        15-30 min
      </span>
    </div>
  </div>

  {/* Calories */}
  <div className="flex items-center justify-center gap-3 p-4 border-b sm:border-b-0 sm:border-r border-gray-200">
    <span className="size-10 md:size-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
      <i className="fa-solid fa-fire-flame-curved text-main-500"></i>
    </span>

    <div>
      <p className="text-xs md:text-sm text-gray-500">
        Calories
      </p>
      <span className="text-main-500 text-sm md:text-lg font-semibold">
        320 kcal
      </span>
    </div>
  </div>

  {/* Category */}
  <div className="flex items-center justify-center gap-3 p-4">
    <span className="size-10 md:size-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
      <i className="fa-solid fa-utensils text-main-500"></i>
    </span>

    <div>
      <p className="text-xs md:text-sm text-gray-500">
        Category
      </p>
      <span className="text-main-500 text-sm md:text-lg font-semibold">
        {mealDeatils?.productCategory?.displayName}
      </span>
    </div>
  </div>

</div>

{/* RelatedMeals */}
<div>
<h2 className="text-main-500 text-xl lg:text-2xl py-4 font-semibold">Related Product</h2>
<div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 py-4 gap-4">
{relatedMeal?.map((meal)=> <div className="flex justify-center items-center bg-white p-4 gap-4 shadow-lg rounded-4xl">
  <img src={meal.imageUrl} alt={meal.productName} className="size-30 rounded-3xl" />
  <div>
    <h4 className="text-lg font-medium">{meal.productName}</h4>
    <span className="text-main-500 font-semibold text-lg">{meal.productPrice}</span>
  </div>
</div>)}

</div>
</div>

        </div>
      </section>
    </>
  );
}
