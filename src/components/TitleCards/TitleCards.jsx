import React, { useEffect, useRef } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({ title, category }) => {

  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY; // Permite a rolagem com o mouse
  };

  // Função que faz rolar para o card específico quando clicado
  const handleCardClick = (index) => {
    const card = cardsRef.current.children[index];
    card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  };

  useEffect(() => {
    // Adiciona o evento de rolagem ao cardsRef
    cardsRef.current.addEventListener('wheel', handleWheel);

    return () => {
      // Limpeza ao desmontar o componente
      cardsRef.current.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='titlecards'>
      {/* Se o título não for passado, exibe o valor padrão 'Popular on Netflix' */}
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => (
          <div 
            className="card" 
            key={index} 
            onClick={() => handleCardClick(index)} // Adicionando o click para rolar para o card
          >
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
