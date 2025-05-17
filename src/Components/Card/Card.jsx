import React from 'react'

const Card = ({item}) => {
  return (
    <div className='text-center rounded-lg shadow-lg bg-white p-6 max-w-sm mx-auto'>
        <h3 className='font-medium text-lg mb-2'>
            {item.heading}
        </h3>
        <p className='text-[#64748b]'>
           {item.desc}
        </p>
    </div>
  )
}

export default Card