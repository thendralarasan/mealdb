import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Countrymeals from '../pages/Countrymeals';

const Header = () => {
  const [query ,setquery]=useState("");
  const navigate = useNavigate();

  const handlesearch = (e)=>{
    e.preventDefault();
    if(!query.trim())return
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }
  return (
  <header className= "bg-emerald-900 text-white p-4 shadow relative z-0 ">
    <nav className= " max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className= " flex items-center gap-6">
        <Link to="/" className= "text-xl font-bold">MealDB</Link>
        <Link to="/">Categories</Link>
        <Link to="/favorites">Favorites</Link>
              <div className="mt-4 flex justify-center items-center gap-3">

</div>

        </div>
        <form onSubmit={handlesearch}className="flex gap-3">
            <input type="text" value={query} onChange={(e)=>setquery(e.target.value)} className= "bg-white px-3 py-1 rounded outline-none  text-gray-800  w-48 sm:w-64"  placeholder='search meals'/>
            <button type='sumbit' className="bg-white text-emerald-900 px-3 py-1 rounded hover:bg-gray-100">search</button>
        </form>
    </nav>
    <div className='flex justify-center'>
      <Countrymeals/>
    </div>
 </header>

  )
}
export default Header
