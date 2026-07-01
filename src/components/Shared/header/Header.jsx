import style from './Header.module.css';
export default function Header({hightlight,text,decripOne,decripTwo}){
    console.log(hightlight,text);
    
    return <>
   <header className={`${style.headerImage} min-h-87.5 w-full`}>
        <div className='flex justify-center items-center h-full'> 
            <div className='py-20 text-center'>

<h5 className='text-[#bb2d2d] font-bold text-xl leading-3.5'>{hightlight}</h5>
<h2 className='upperCase font-bold text-5xl text-white leading-20'>{text}</h2>
<p className='font-medium text-lg text-gray-300'>{decripOne}
     <br></br> {decripTwo} </p>
        </div>
            </div>
    </header>
    </>
}