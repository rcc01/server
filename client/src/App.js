import './App.css';
import { useState, useEffect } from "react"
import Axios from 'axios'

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieList, setMovieList] = useState([]);


  useEffect(()=> {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data)
    })
  }, [])

  const submitReview = () => {
    // API server;  
    // movie_name --> table column name : name of variable in backend
    Axios.post("http://localhost:3001/api/insert", {movieName: movieName, review: review
  }).then(() => {
    alert("successful insert");
  })
  }

  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <div className='form'>
        <label>Movie Name:</label>
         <input type="text" name="movieName" onChange={(e)=>{
          setMovieName(e.target.value)
         }}/>
        <label>Movie Review:</label>
        <input type="text" name="review" onChange={(e)=> {
          setReview(e.target.value) }} />
        <button onClick={submitReview}>Submit</button>

        {movieList.map((value, key)=> {
          return <h2 key={key}> Movie Name: {value.movie_name} || Movie Review: {value.review} </h2>
        })}
       
      </div>
    </div>
  );
}

export default App;
