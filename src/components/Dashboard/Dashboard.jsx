import { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
export function Dashboard() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div>Dashboard</div>
    </>
  );
}
