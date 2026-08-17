import { useEffect, useState } from "react";
import style from "./Blog.module.css";
import Header from "../Shared/header/Header";
import pasta from "../../assets/pasta2.png";
import past1 from "../../assets/pasta (1).png";
import pancake from "../../assets/pancake (1).png";
import ltbeta from "../../assets/5ltbeta (1).png";
import potato from "../../assets/potato (1).png";
import { TabItem, Tabs } from "flowbite-react";

export function Blog() {
  const BLOG_CATEGORIES = [
    "All",
    "Recipes",
    "Cooking Tips",
    "Healthy Eating",
    "Desserts",
  ];

  const BLOG_ARTICLES = [
    {
      id: 1,
      image: `${past1}`,
      category: "Recipes",
      date: "January 3, 2024",
      title: "How to Prepare a Delicious Gluten-Free Sushi",
      description:
        "Think sushi has to be off-limits if you are gluten-free? Think again. We break down every step to crafting beautiful, safe, and utterly delicious sushi rolls at home.",
    },
    {
      id: 2,
      image: `${pancake}`,
      category: "Desserts",
      date: "January 15, 2024",
      title: "Exclusive Baking Lessons From the Pastry King",
      description:
        "Our award-winning pastry chef shares his most guarded secrets — from achieving the perfect croissant lamination to baking a flawless tarte tatin every single time.",
    },
    {
      id: 3,
      image: `${potato}`,
      category: "Cooking Tips",
      date: "January 22, 2024",
      title: "How to Prepare Perfect Fries in an Air Fryer",
      description:
        "Crispy on the outside, fluffy on the inside — the perfect fry is an art form. Discover our foolproof method for air-fryer fries that rival any deep-fried version.",
    },
    {
      id: 4,
      image: `${ltbeta}`,
      category: "Healthy Eating",
      date: "February 1, 2024",
      title: "10 Superfoods to Add to Your Diet This Season",
      description:
        "Eating healthy does not have to be boring. We explore ten nutrient-dense superfoods that are easy to incorporate into everyday meals and absolutely bursting with flavor.",
    },
    {
      id: 5,
      image: `${past1}`,
      category: "Recipes",
      date: "February 8, 2024",
      title: "The Secret Behind Our Signature Pasta Sauce",
      description:
        "After years of requests from our loyal guests, our head chef is finally revealing the story and technique behind Bistro Bliss's most beloved pasta sauce.",
    },
    {
      id: 6,
      image: `${pancake}`,
      category: "Cooking Tips",
      date: "February 14, 2024",
      title: "A Beginner's Guide to Wine Pairing With Food",
      description:
        "Wine pairing can feel intimidating, but it does not have to be. Our sommelier breaks down the basics so you can confidently elevate your next dinner party or date night.",
    },
  ];

  const [blogCategoryDisplay, setBlogCategoryDisplay] = useState(BLOG_ARTICLES);

  function getBlogByCategory(category) {
    console.log(category);

    const allBlogCatgory = structuredClone(BLOG_ARTICLES);
    if (category === "All") {
      setBlogCategoryDisplay(allBlogCatgory);
      return;
    }
    const fillterByCatgory = allBlogCatgory.filter(
      (blog) => blog.category === category,
    );
    setBlogCategoryDisplay(fillterByCatgory);
  }

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log("mount");
  }, []);

  return (
    <>
      <section>
        <Header
          hightlight={"Latest Updates"}
          text={"our Blog & Articles"}
          decripOne={
            "We consider all the drivers of change — giving you the insights you need to"
          }
          decripTwo={"stay ahead in the culinary world."}
        ></Header>
        <div className="py-15 px-4 sm:px-8 lg:px-15 bg-white">
          {/* header */}
          <div className="pb-6">
            <h5 className="font-bold text-sm text-main-500">Featured</h5>
            <h3 className="font-bold text-xl py-1.5 leading-6 tracking-wide  ">
              Editor's Pick
            </h3>
          </div>
          {/*  */}
          <div className="p-8 border rounded-2xl border-gray-200 shadow-2xs shadow-gray-200 grid gap-3 grid-cols-1 lg:grid-cols-2">
            {/* left */}
            <div className="flex justify-center items-center py-5">
              <img
                src={pasta}
                alt="pasta"
                className="w-full lg:max-w-120 h-60 sm:h-72 lg:h-80 object-cover px-4"
              />
            </div>
            {/* right */}
            <div>
              <h3 className="text-[15px] lg:text-lg font-bold text-main-500">
                Cooking Tips
              </h3>
              <h2 className="text-[18px] py-1.5 lg:text-2xl font-bold">
                The Art of French Cuisine: A Deep Dive Into <br />
                Classic Techniques
              </h2>
              <span className="space-x-2 text-gray-400 text-xs font-medium block py-2">
                <i className="fa-regular fa-calendar"></i>
                <span>February 10, 2024</span>
              </span>
              <p className="py-4 text-gray-400 text-lg">
                French cuisine has long been considered the gold standard of
                fine dining. From mastering the perfect béchamel to crafting an
                elegant soufflé, we explore the foundational techniques every
                food lover should know. Join our head chef as he walks you
                through the essentials that transform a good cook into a great
                one.
              </p>
              <button className="text-lg font-semibold border text-main-500 py-2 px-4 rounded-3xl border-main-500 hover:bg-main-500 hover:text-white">
                Read Article{" "}
                <span>
                  <i className="fa-solid fa-arrow-right-long px-1"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="py-15 px-4 sm:px-8 lg:px-15">
          {/* header */}
          <div className="text-center">
            <h4 className="text-main-500 font-bold text-[18px] leading-5">
              All Articles
            </h4>
            <h2 className="font-bold text-2xl lg:text-3xl leanding-9">
              Fresh From The Kitchen
            </h2>
          </div>
          {/* blog */}
          <div className="py-3 ">
            <div className="flex justify-center py-3 overflow-x-auto">
              <Tabs
                aria-label="Pills"
                variant="pills"
                onActiveTabChange={(tabIndex) =>
                  getBlogByCategory(BLOG_CATEGORIES[tabIndex])
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
                            off: "bg-gray-100/50  rounded-full  px-4 sm:px-8 py-2  border border-gray-200 text-black whitespace-nowrap",
                          },
                        },
                      },
                    },
                  },
                }}
              >
                {BLOG_CATEGORIES?.map((blog) => (
                  <TabItem
                    key={blog}
                    title={blog}
                    className="active:bg-main-600"
                  />
                ))}
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
              {blogCategoryDisplay?.map((article) => (
                <div
                  key={article.id}
                  className="bg-white  rounded-2xl group
                   hover:shadow-xl hover:shadow-gray-300 overflow-hidden transition-all duration-500"
                >
                  <div className="relative ">
                    <img
                      src={article.image}
                      className="w-full h-60 object-cover rounded-t-2xl group-hover:scale-105 transition-all duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-400">
                      <i className="fa-regular fa-calendar"></i> {article.date}
                    </p>
                    <h3 className="font-bold text-lg py-2">{article.title}</h3>
                    <p className="text-sm text-gray-500">
                      {article.description}
                    </p>
                    <a
                      href="#"
                      className="text-main-500 font-semibold text-sm py-3 inline-block"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
