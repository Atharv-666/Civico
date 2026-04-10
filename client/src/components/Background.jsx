import React from 'react'
import { assets } from '../assets/assets'

const Background = () => {
  return (
    <div 
      style={{ backgroundImage: `url(${assets.background})` }}
      // Changed px-16 to px-8 and lg:px-36 to lg:px-12 for smaller side gaps
      className='flex flex-col items-start justify-start px-6 md:px-8 lg:px-12 bg-cover bg-center h-screen text-white relative'
    >
      {/* max-w-xl ensures the text stays on the left and doesn't hit the phone image */}
      <div className='max-w-xl -mt-20'>
        <div>
          <h1 className='text-4xl md:text-5xl lg:text-3xl font-bold text-black drop-shadow-2xl pt-70 '> 
            Don't just notice the problem.<br /> 
            Be the reason it gets fixed. 
          </h1>
        </div>

        <div className='mt-6'>
          <p className='text-slate-950 text-4xl md:text-xl leading-relaxed font-medium drop-shadow-md'>
            Turning individual concerns into collective action. Together, we 
            bridge the gap between problems and solutions, building the 
            foundation for a stronger, better community.
          </p> 
        </div>
      </div>
    </div>
  )
}

export default Background