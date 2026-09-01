import style from "./Menu.module.css";
import Header from "../../../../components/Shared/header/Header";
import { useState } from "react";
import MealCard from "../meal/MealCard";
import { TabItem, Tabs } from "flowbite-react";

import { useMenu } from "../../../../components/Shared/Hooks/useMenu";
import { useCategories } from "../../../../components/Shared/Hooks/useCategories";
import { LoaderSpinner } from "../../../../components/Shared/LoaderSpinner/LoaderSpinner";
import { Helmet } from "react-helmet";

export function Menu() {
  let [active, setActivatecategory] = useState("all");

  const { categories } = useCategories();
  const { meals: allMeals, isLoading, isError } = useMenu();

  function getMealByCategory(category) {
    setActivatecategory(category);
  }

  const tabsList = [
    { _id: "all", name: "all", displayName: "All" },
    ...(categories || []),
  ];

  const displayMeals =
    active === "all"
      ? (allMeals ?? [])
      : (allMeals ?? []).filter((meal) => meal.productCategory.name === active);

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <LoaderSpinner></LoaderSpinner>;
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-bold text-gray-400">
          Something went wrong while loading messages.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Menu page</title>
      </Helmet>
      <section className="min-h-screen flex flex-col">
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
      </section>
    </>
  );
}
