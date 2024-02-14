import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-ui02 p-4 flex flex-wrap justify-between items-center">
      {/* Logo on the left */}
      <a href="/" className="text-link01 text-4xl font-bold mb-4 md:mb-0 md:mr-4">HealthPlus</a>

      {/* Navigation links on the right */}
      <div className="flex flex-wrap space-x-4 px-12">
        <a href="/" className="hover:text-hoverPrimaryText text-link01 text-lg">Home</a>
        <a href="/about" className="hover:text-hoverPrimaryText text-link01 text-lg">About</a>
        <a href="/help" className="hover:text-hoverPrimaryText text-link01 text-lg">Help</a>
      </div>
    </nav>
  )
}

export default Navbar