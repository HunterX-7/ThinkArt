import React from 'react'

const FormInput = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-[#030B11]'>
          {labelName}
        </label>
        {isSurpriseMe && (
          <button type='button' onClick={handleSurpriseMe} className='font-semibold text-xs bg-[#E3E8F3] py-1 px-2 rounded-[5px] text-black'>
            Surprise Me
          </button>
        )}
      </div>
      <input 
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-white border border-gray-300 text-[#030B11] text-sm rounded-lg focus:ring-[#303136] focus:border-[#303136] outline-none block w-full p-3'
      />
    </div>
  )
}

export default FormInput