import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function CardDetails() {
  const [count, setCount] = useState(1);
  const [relatedMeal, setRealtedMeal] = useState(null);
  let { id, category } = useParams();
  let [mealDeatils, setMealDeatisl] = useState(null);

  const ingredients =
    mealDeatils?.productDescription
      ?.replace(/^Made with\s+/i, "")
      ?.replace(/^Fresh\s+/i, "")
      ?.replace(/\.$/, "")
      ?.replace(/\sand\s/g, ", ")
      ?.split(", ")
      ?.map((item) => item.trim()) || [];

  function getMealById(id) {
    axios
      .get(`https://restaurant-project-node-js.vercel.app/api/menu/${id}`)
      .then((meal) => {
        setMealDeatisl(meal.data.data);
      });
  }

  function incressCount() {
    setCount((prev) => prev + 1);
  }
  function decressCount() {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  }

  function getRelatedMeal(category) {
    axios.get(`${import.meta.env.VITE_API_URL}/menu`).then((resp) => {
      let allMeals = resp.data.data;
      let relatedMeals = allMeals.filter(
        (meal) => meal.productCategory.name == category,
      );
      setRealtedMeal(relatedMeals);
    });
  }

  useEffect(() => {
    getMealById(id);
    getRelatedMeal(category);
  }, []);

  return (
    <section className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 lg:py-16">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Image */}
          <div className="lg:col-span-7">
            <div className="rounded-4xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(43,36,32,0.25)] aspect-4/3 lg:aspect-5/4">
              <img
                src={mealDeatils?.imageUrl}
                alt={mealDeatils?.productName}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 w-fit rounded-full bg-[#AD343E]/10 px-4 py-1.5 text-[#AD343E] font-semibold text-sm">
              {mealDeatils?.productCategory?.displayName}
            </div>

            <h1 className=" text-4xl lg:text-5xl font-medium text-[#2B2420] leading-[1.05] pt-5">
              {mealDeatils?.productName}
            </h1>

            <div className="flex items-center gap-2 pt-4">
              <div className="flex text-[#E8A33D]">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
              <span className="text-[#8C8378] text-sm">4.8 · 128 reviews</span>
            </div>

            <p className="text-[#5C554C] leading-relaxed pt-5 pr-2">
              {mealDeatils?.productDescription}
            </p>

            {ingredients.length > 0 && (
              <div className="pt-6">
                <h2 className="text-sm font-semibold text-[#2B2420] pb-3">
                  Ingredients
                </h2>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-[#E7E1D8] bg-white px-3.5 py-1.5 text-sm text-[#5C554C]"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#8C8378] pb-0.5">Price</p>
                <p className="text-2xl font-semibold text-[#AD343E]">
                  ${mealDeatils?.productPrice}
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-full border border-[#E7E1D8] bg-white p-1">
                <button
                  onClick={decressCount}
                  className="size-9 rounded-full flex items-center justify-center text-[#2B2420] hover:bg-[#F4F0E8] transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <span className="w-8 text-center font-semibold text-[#2B2420]">
                  {count}
                </span>
                <button
                  onClick={incressCount}
                  className="size-9 rounded-full flex items-center justify-center text-[#2B2420] hover:bg-[#F4F0E8] transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
            </div>

            <button className="mt-4 w-full bg-[#AD343E] hover:bg-[#8F2A32] text-white font-semibold py-3.5 rounded-full transition cursor-pointer">
              <i className="fa-solid fa-cart-shopping mr-2"></i>
              Add to cart
            </button>
          </div>
        </div>

        {/* Info strip */}
        <div className="mt-14 rounded-2xl border border-[#E7E1D8] bg-white grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E7E1D8]">
          <div className="flex items-center gap-4 px-6 py-5">
            <span className="size-11 rounded-full bg-[#AD343E]/10 flex items-center justify-center shrink-0">
              <i className="fa-regular fa-clock text-[#AD343E]"></i>
            </span>
            <div>
              <p className="text-xs text-[#8C8378]">Preparation time</p>
              <p className="text-[#2B2420] font-semibold">15–30 min</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-5">
            <span className="size-11 rounded-full bg-[#AD343E]/10 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-fire-flame-curved text-[#AD343E]"></i>
            </span>
            <div>
              <p className="text-xs text-[#8C8378]">Calories</p>
              <p className="text-[#2B2420] font-semibold">320 kcal</p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-5">
            <span className="size-11 rounded-full bg-[#AD343E]/10 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-utensils text-[#AD343E]"></i>
            </span>
            <div>
              <p className="text-xs text-[#8C8378]">Category</p>
              <p className="text-[#2B2420] font-semibold">
                {mealDeatils?.productCategory?.displayName}
              </p>
            </div>
          </div>
        </div>

        {/* Related meals */}
        {relatedMeal?.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between pb-6">
              <h2 className=" text-2xl lg:text-3xl text-[#2B2420]">
                You might also like
              </h2>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
              {relatedMeal.map((meal) => (
                <div
                  key={meal._id}
                  className="snap-start shrink-0 w-56 bg-white rounded-2xl border border-[#E7E1D8] overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={meal.imageUrl}
                      alt={meal.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-[#2B2420] truncate">
                      {meal.productName}
                    </h4>
                    <span className="text-[#AD343E] font-semibold">
                      ${meal.productPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
