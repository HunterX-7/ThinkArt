import React from 'react';
import { download } from '../assets';
import { downloadImg } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img 
        className='w-full h-auto object-cover rounded-xl'
        src={photo} 
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-primary m-2 p-4 rounded-md'>
        <p className='text-white text-md overflow-y-auto prompt'>
          {prompt}
        </p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-terciary flex justify-center items-center text-black text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>
              {name}
            </p>

          </div>
          <button 
              type='button'
              onClick={() => downloadImg(_id, photo)}
              className='outline-none bg-transparent border-none'
          >
            <img src={download} alt="download" className='w-7 h-7 object-contain invert' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card