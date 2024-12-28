import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
 
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDMwNDRjYWJhNjYzNmU2NzY5MmE3ZjY0YTY5ZjczMSIsIm5iZiI6MTczNTMwNDg3Ny44MTQwMDAxLCJzdWIiOiI2NzZlYTZhZGQwYjA4Zjk3MTg2MTU4OTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MMR3c2ytE2EF8zgOmGT8BVGOM3ZI5_uXjeLZLMgXY6c'
    }
  };



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
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
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
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`}
            className="card"
            key={index}
            onClick={() => handleCardClick(index)} // Adicionando o click para rolar para o card
          >
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
