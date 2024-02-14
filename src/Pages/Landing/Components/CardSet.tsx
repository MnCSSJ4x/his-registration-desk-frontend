import React from 'react'
import Card from './Card';
const CardSet: React.FC = () => {
    const cardsData = [
        {
          svg: <svg height="50" width="50"><circle cx="25" cy="25" r="20" fill="#3498db" /></svg>,
          heading: 'Enhanced Efficiency',
          description: 'Revolutionize your healthcare practice with our Smart HIS. Experience intuitive navigation, from electronic health records (EHR) to real-time analytics.',
        },
        {
          svg: <svg height="50" width="50"><rect width="50" height="50" fill="#2ecc71" /></svg>,
          heading: 'Automated Scheduling',
          description: 'Features like automated appointment scheduling keep you ahead of the curve. Elevate your healthcare operations with our comprehensive Smart HIS solution.',
        },
        {
          svg: <svg height="50" width="50"><path d="M25 5 L5 45 L45 45 Z" fill="#e74c3c" /></svg>,
          heading: 'Intelligent Prescription Management',
          description: 'Empower your team with advanced technology. The Smart HIS offers intelligent prescription management to enhance patient-centric care.',
        },
      ];
    
      return (
        <div className="flex flex-wrap">
          {cardsData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      );
}

export default CardSet