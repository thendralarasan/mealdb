import React from 'react'

const Favbutton = ({ meal,onToggle, isfav}) => {
  return (   <button onClick={(e)=>{
    onToggle(meal);
  }} className={` cursor-pointer absolute right-2 top-1 p-2.5 rounded-full ${isfav ? " bg-red-500 text-white":"bg-white/30 text-gray-700"} text-xl `}>{isfav? " ♡":" ♥"}</button>
); 
}

export default Favbutton