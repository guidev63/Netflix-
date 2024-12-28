import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    typeof: '',
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDMwNDRjYWJhNjYzNmU2NzY5MmE3ZjY0YTY5ZjczMSIsIm5iZiI6MTczNTMwNDg3Ny44MTQwMDAxLCJzdWIiOiI2NzZlYTZhZGQwYjA4Zjk3MTg2MTU4OTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MMR3c2ytE2EF8zgOmGT8BVGOM3ZI5_uXjeLZLMgXY6c',
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      {/* Botão de voltar */}
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => navigate('/')} // Redireciona para a página inicial
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
