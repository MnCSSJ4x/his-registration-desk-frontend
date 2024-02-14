import React from 'react'

const Showcase = () => {
  return (
    <div className='px-4'><div className="flex flex-col items-center md:flex-row bg-ui01 p-8 rounded-xl">
    {/* Left side with caption and description */}
    <div className="md:w-1/2 px-2">
      <h2 className="text-text01 text-8xl font-bold mb-4">Smart HIS</h2>
      <p className="text-text01 text-lg">
      Embrace innovation, enhance patient outcomes, and embark on a journey towards a smarter, more efficient healthcare ecosystem with our state-of-the-art Smart Hospital Information System.
      </p>
    </div>

    {/* Right side with image */}
    <div className="md:w-1/2 mt-4 md:mt-0">
      <img
        src="https://via.placeholder.com/500x300"
        alt="Smart HIS Illustration"
        className="w-full h-auto rounded-md shadow-md"
      />
    </div>
  </div></div>
  )
}

export default Showcase