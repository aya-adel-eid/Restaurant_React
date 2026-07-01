import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function MealCard({title,descrip,price,image,ID,category}){
    return <>
    <Link to={`/mealDetails/${ID}/${category}`}>
    <div className="rounded-lg  shadow-md overflow-hidden">
         <img
    src={image}
    alt={title}
    className="w-full h-60 "
  />
  <div className="p-3">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {descrip}
      </p>
      <span className="text-lg font-bold text-main-500 text-center block py-2">${price}</span>

  </div>
 </div>
    </Link>
    </>
}