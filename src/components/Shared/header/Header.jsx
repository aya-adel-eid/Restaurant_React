import style from "./Header.module.css";
export default function Header({ hightlight, text, decripOne, decripTwo }) {
  console.log(hightlight, text);

  return (
    <>
      <header
        className={`${style.headerImage} min-h-60 sm:min-h-72 lg:min-h-87.5 w-full`}
      >
        <div className="flex justify-center items-center h-full">
          <div className="py-10 sm:py-16 lg:py-20 px-4 text-center">
            <h5 className="text-[#bb2d2d] font-bold text-lg sm:text-xl leading-3.5">
              {hightlight}
            </h5>
            <h2 className="upperCase font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight sm:leading-tight lg:leading-20 py-2">
              {text}
            </h2>
            <p className="font-medium text-sm sm:text-base lg:text-lg text-gray-300">
              {decripOne}
              <br></br> {decripTwo}{" "}
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
