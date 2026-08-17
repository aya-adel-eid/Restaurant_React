import style from "./LoaderSpinner.module.css";
import { TailSpin } from "react-loader-spinner";
export function LoaderSpinner() {
  return (
    <>
      <TailSpin
        height={100}
        width={100}
        radius={5}
        color="#8a2a32"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
}
