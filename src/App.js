import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Image from "./img.jpg";

function App() {
  // To display the data use the state
  const [state, setState] = useState({
    joke: "",
    searchKeyword: "",
    searchUrl: "https://api.chucknorris.io/jokes/search?query=",
  });
  // Fetch the data with async await
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get("https://api.chucknorris.io/jokes/random");
    // console.log("result==>>", result.data.value);
    // ...state ==>> keeps all the old objects(all the initial values was there before)
    // joke:result.data.value ==>> is the part I want to update
    setState({ ...state, joke: result.data.value });
    // setState({ state });
  };
  const searchJoke = (e) => {
    console.log(e.target.value);
    setState({ ...state, searchKeyword: e.target.value });
  };

  // when I press the button it fetches the jokes that related to the search word
  const fetchMyJoke = async () => {
    const result = await axios.get(state.searchUrl + state.searchKeyword);
    console.log("fetchMyJoke result", result.data.result);
    setState(state);

    const jokePosition = Math.floor(Math.random() * result.data.result.length);
    console.log("jokePosition ==>>", jokePosition); // which number joke is displayed
    setState({
      ...state,
      joke: result.data.result[jokePosition].value,
    });

    // ! ==>> Remember Math.random Math.floor
    // Math.random() // give random number 0 - 0.99999
    // Math.random() * 3  // give random number 0 - 2.99999
    // Math.floor(Math.random()*3)// 0-2
  };

  return (
    <div className="w-full h-screen bg-red-400 p-8  ">
      {/* Main Container */}
      <div className="container sm:flex-col  justify-center items-center ">
        {/* First Container */}
        <div className=" sm:flex justify-evenly ">
          {/* Image Box Container*/}
          <div className="   ">
            <h1 className="text-gray-600 sm:text-3xl font-bold  uppercase drop-shadow-2xl text-center mb-2">
              Joke Generator
            </h1>

            <img
              src={Image}
              alt="Chuck Norris"
              className="rounded-3xl w-96 h-80 mb-2"
            />
          </div>

          {/* Generate Joke container*/}
          <div className="flex-col  flex justify-center">
            <input
              onChange={searchJoke}
              type="text"
              placeholder="Search for a word"
              className="input input-bordered input-lg w-full max-w-xs mb-4"
            />

            <button
              onClick={fetchMyJoke}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            >
              Generate Joke
            </button>
          </div>
        </div>

        {/* Button Ends Here */}
      </div>
      {/* Second Container */}
      {/* <div className=" flex flex-col justify-center items-center"> */}
      <div className=" flex justify-center items-center mt-8">
        <div className="sm:text-4xl text-gray-600 font-bold mb-8">
          Here is the Joke
        </div>
      </div>
      <div className="flex justify-center items-center sm:text-2xl text-gray-300 font-bold">
        For the record: Jokes about Chuck Norris has a sexist, phobic and
        stupidly toxic context. So ignore the jokes and focus on coding please!
      </div>
      <div className="flex justify-center items-center sm:text-lg text-gray-600 font-bold mt-8">
        {state.joke}
      </div>
    </div>
  );
}

export default App;
