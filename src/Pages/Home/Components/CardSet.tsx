// CardSet.js

import React from 'react';

const CardSet = () => {
  const cards = [
    { title: 'Add New Patient', clipart: '👩‍⚕️', description: 'Click to add a new patient record.' },
    { title: 'Add Consultation', clipart: '👨‍⚕️', description: 'Click to add a consultation for an existing patient.' },
    { title: 'Edit Patient Details', clipart: '📝', description: 'Click to edit details of an existing patient.' },
    { title: 'View Records', clipart: '🔍', description: 'Click to view patient records and history.' },
    { title: 'Transfers', clipart: '🚑', description: 'Click to initiate patient transfers between departments.' },
    { title: 'Delete Records', clipart: '🗑️', description: 'Click to delete patient records (with caution).' },
  ];

  const handleCardClick = (title:string) => {
    // Handle the click event for each card
    console.log(`Clicked on "${title}"`);
    // You can add specific actions or navigation based on the clicked card
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-8 py-32">
      {cards.map((card, index) => (
        <div
          key={index}
          className="cursor-pointer bg-white p-8 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-hoverUi"
          onClick={() => handleCardClick(card.title)}
        >
          <div className="text-4xl mb-4">{card.clipart}</div>
          <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardSet;
