import React, { useEffect, useState } from 'react'
import "./Home.scss" 
import axios from 'axios'
import {FaPlay} from "react-icons/fa"
import {AiOutlinePlus} from "react-icons/ai"

const apiKey = "f264bff113f094da8f3719dd659bd232"
const url = "https://api.themoviedb.org/3/movie/"
const imgUrl = "https://image.tmdb.org/t/p/original/"
const upcoming = "upcoming"
const nowPlaying = "now_playing"
const popular = "popular"
const topRated = "top_rated"


const Card = ({img}) =>(
<img className="card" src={img}/>
  
  )

const Row = ({title , arr=[]}) => (
  
  <div className='row'> 
    <h2>{title}</h2>
  <div>

  {
    arr.map((item,index) => (
      <Card key = {index} img={`${imgUrl}${item.poster_path}`}/>
    ))
  }

  </div>
  </div>
)

const Home = () => {

const [upcomingMovies , setUpcomingMovies] = useState([]);
const [nowPlayingMovies , setnowPlayingMovies] = useState([]);
const [popularMovies , setpopularMovies] = useState([]);
const [topRatedMovies , settopRatedMovies] = useState([]);


useEffect(() => {

  const fetchUpcoming = async() => {
    const {data : {results}} = await axios.get(`${url}${upcoming}?api_key=${apiKey}`);
    setUpcomingMovies(results);
  };

  fetchUpcoming();
  
  const fetchNowPlaying = async() => {
    const {data : {results}} = await axios.get(`${url}${nowPlaying}?api_key=${apiKey}`);
    setnowPlayingMovies(results);
  };

  fetchNowPlaying();

  const fetchPopular = async() => {
    const {data : {results}} = await axios.get(`${url}${popular}?api_key=${apiKey}`);
    setpopularMovies(results);
  };

  fetchPopular();

  const fetchTopRated = async() => {
    const {data : {results}} = await axios.get(`${url}${topRated}?api_key=${apiKey}`);
    settopRatedMovies(results);
  };

  fetchTopRated();

},[])


  return (
    <section className='home'>
      <div className="banner" 
      style={{
        backgroundImage : `url(${`${imgUrl}${popularMovies[1].poster_path}`})`
      }}>

        {popularMovies[1] && <h1>{popularMovies[1].original_title}</h1>}
        {popularMovies[1] &&  <p>{popularMovies[1].overview}</p>}
      <div>

      <button>Play <FaPlay/></button>
      <button>My List <AiOutlinePlus/></button>
      </div>

      </div>

          <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
          <Row title={"Now Playing Movies"} arr={nowPlayingMovies}/>
          <Row title={"Popular Movies"} arr={popularMovies}/>
          <Row title={"Top Rated Movies"} arr={topRatedMovies}/>
 



    </section>
  )
}

export default Home