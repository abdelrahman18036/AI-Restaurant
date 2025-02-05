import React from 'react'

const Hero = () => {
  return (
    <div  className='hero h-[80vh] flex justify-center items-center'> 
      <div className="overlay"></div>
      <div className=" text-center">
        <h1 className='text-3xl font-semibold text-[#C19D60] italic'>Enjoy your time in our restaurant with pleasure.</h1>
        <p className='text-white mt-4 text-2xl font-bold  '>Pick What Your Stomach Wants!</p>
        <div className='flex justify-center items-center mt-2'>
          <span className='seperatedDots'></span>
        </div>
      </div>
      <img className='absolute w-full left-0 bottom-[-1px]' src="https://restabook.kwst.net/dark/images/bg/brush-dec.png" alt="" />

    </div>
  )
}

export default Hero