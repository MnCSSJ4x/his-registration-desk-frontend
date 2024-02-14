import React from 'react'
interface CardProps {
    svg: React.ReactNode;
    heading: string;
    description: string;
}
const Card: React.FC<CardProps> = ({svg, heading,description}) => {
  return (
    <div className="flex items-stretch w-full md:w-1/3 p-4">
      <div className="bg-ui02 rounded-lg p-6 shadow-xl">
        <div className="text-center">
          {/* SVG */}
          <div className="mb-4">{svg}</div>
          {/* Heading */}
          <h3 className="text-xl font-bold mb-2">{heading}</h3>
        </div>
        {/* Description */}
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  )
}

export default Card