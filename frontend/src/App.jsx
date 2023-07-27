import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-2 border-b-4 border-[#E3E8F3]'>
        <Link to='/'>
          <img src={logo} alt="logo" className='w-36 object-contain' />
        </Link>
        <Link to='/create-post'>
          <button className='font-medium bg-[#030B11] text-white px-4 py-2 rounded-[8px] hover:bg-[#303136]'>
            Create
          </button>
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9f9f9] min-h-[calc(100vh-60px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
