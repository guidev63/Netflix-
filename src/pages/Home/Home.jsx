import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
    return(
        <div className='home'>
            <Navbar/>
            <div className="hero">
                <img src={hero_banner} alt='banner-img' className="hero-img"/>
                <div className="hero-caption">
                    <img src={hero_title} alt="Hero Title" className="caption-img"/>
                    <p>Ao descobrir sua ligação com uma antiga ordem secreta, um jovem residente da moderna Istambul embarca em uma missão para proteger a cidade de um inimigo imortal.</p> 
                    <div className="hero-btns">
                       <button className='btn'><img src={play_icon} alt="" />Play</button>
                       <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>     
                    </div>
                    <TitleCards />
                </div>
            </div>
            
            <div className="more-cards">
            <TitleCards title={"Filmes de grande sucesso"} category={"top_rated"} />
            <TitleCards title={"Somente na Netflix"}  category={"popular"}/>
            <TitleCards title={"Por vir"} category={"upcoming"} />
            <TitleCards title={"Melhores fotos para você"}  category={"now_playing"}/>
            </div>
            <Footer/>
        </div>
        
    );
}

export default Home;
