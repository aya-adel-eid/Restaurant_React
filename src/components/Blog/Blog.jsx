import { useEffect, useState } from "react";
import style from "./Blog.module.css";
export function Blog() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div>Blog</div>
    </>
  );
}
