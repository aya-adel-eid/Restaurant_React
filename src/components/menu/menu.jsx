import { useEffect } from "react";
import style from "./Menu.module.css";
import Header from "../Shared/header/Header";
import { useState } from "react";
import axios from "axios";
import MealCard from "../meal/MealCard";
import { TabItem, Tabs } from "flowbite-react";
import { BallTriangle, Circles } from "react-loader-spinner";

export function Menu() {
  let [allCategories, setCategories] = useState(null);
  let [allMeals, setAllMeals] = useState(null);
  let [displayMeals, setDisplayMeals] = useState(null);
  let [active, setActivatecategory] = useState("all");

  function getAllCategories() {
    axios
      .get(`https://restaurant-project-node-js.vercel.app/api/category`)
      .then((apiResponce) => {
        setCategories(apiResponce.data.data);
      })
      .catch((error) => {
        console.log(error?.response?.data?.errorMessage || error.message);
      });
  }

  function getAllMeals() {
    axios
      .get(`https://restaurant-project-node-js.vercel.app/api/menu`)
      .then((responce) => {
        setAllMeals(responce.data.data);
        setDisplayMeals(responce.data.data);
      })
      .catch((error) => {
        console.log(error?.response?.data?.errorMessage || error.message);
      });
  }

  function getMealByCategory(category) {
    setActivatecategory(category);
    if (category === "all") {
      setDisplayMeals(allMeals);
      return;
    }
    const filterMeal = allMeals.filter(
      (meal) => meal.productCategory.name === category,
    );
    setDisplayMeals(filterMeal);
  }

  const tabsList = [
    { _id: "all", name: "all", displayName: "All" },
    ...(allCategories || []),
  ];

  useEffect(() => {
    getAllCategories();
    getAllMeals();
  }, []);

  return (
    <>
      <section className="min-h-screen flex flex-col">
        {allMeals ? (
          <div>
            <Header
              hightlight={"What We Serve"}
              text={"our menu"}
              decripOne={
                "We consider all the drivers of change giving you the components you need to"
              }
              decripTwo={"create a truly happy experience."}
            ></Header>
            {/* lists of category */}
            <div className="py-8 px-3 lg:px-6">
              <div className="py-6">
                <div className="flex justify-center py-3 overflow-x-auto">
                  <Tabs
                    aria-label="Pills"
                    variant="pills"
                    onActiveTabChange={(tabIndex) =>
                      getMealByCategory(tabsList[tabIndex].name)
                    }
                    theme={{
                      tablist: {
                        base: "flex flex-nowrap sm:flex-wrap sm:justify-center gap-2",
                        tabitem: {
                          base: "shrink-0",
                          variant: {
                            pills: {
                              active: {
                                on: "bg-main-500 text-white px-4 sm:px-8 py-2 rounded-full whitespace-nowrap",
                                off: "bg-gray-100/50 rounded-full px-4 sm:px-8 py-2 border border-gray-200 text-black whitespace-nowrap",
                              },
                            },
                          },
                        },
                      },
                    }}
                  >
                    {tabsList.map((category) => (
                      <TabItem
                        key={category._id}
                        title={category.displayName}
                        className="active:bg-main-600"
                      />
                    ))}
                  </Tabs>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 px-4 sm:px-8 lg:px-15 gap-4">
                {displayMeals && displayMeals.length > 0 ? (
                  displayMeals.map((meal) => (
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
                  <p className="col-span-full text-center text-gray-400 py-10">
                    Meals Not Found
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <Circles
              height={100}
              width={100}
              radius={5}
              color="#8a2a32"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </section>
    </>
  );
}
