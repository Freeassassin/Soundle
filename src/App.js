import "./App.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {db} from "./database";
import {collection, getDocs} from "firebase/firestore/lite";
import ReactDOM from 'react-dom'
import React from 'react'

toast.configure();

async function getAnswer(db) 
{
  const answersCol = collection(db, "answers");
  const answersSnapshot = await getDocs(answersCol);
  const answerList = answersSnapshot.docs.map((doc) => doc.data());
  return answerList;
}

async function setAnswersFromDB(setAnswers, day) 
{
  setAnswers(
    await getAnswer(db).then(function (result) {   return result[0].Day[day];
    })
  );
}

function App() {
  const origin = new Date("2022-03-06");
  const today = new Date();

  const day = Math.floor(Math.abs(today - origin) / (1000 * 60 * 60 * 24));
  // const day = 1;

  const [sound, setSound] = useState();
  const [guess, setGuess] = useState();
  const [answers, setAnswers] = useState();
  const [women,setWomen] = useState();
  const [atempts, setAtempts] = useState([]);
  useEffect(() => {
    setSound(require(`./sounds/${day}.mp3`));
    setAnswersFromDB(setAnswers, day);
    console.log(answers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (women)
    // {
    //   toast.success("YASSSSS QUEEEEN", {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 1000,
    //     pauseOnHover: false,
    //     hideProgressBar: true,
    //     theme: "dark",
    //     limit: 3,
    //   });

    // }
    // else 
    if (answers.includes(guess.toLowerCase())) {
      toast.success("YOU GOT IT!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        pauseOnHover: false,
        hideProgressBar: true,
        theme: "dark",
        limit: 3,
      });
      setGuess("");
      console.log("YOU GOT IT!!!!!");
    } else {
      toast.error("sucks to suck lol", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 500,
        pauseOnHover: false,
        hideProgressBar: true,
        theme: "dark",
        limit: 3,
      });
      
      if (atempts.length ==0)
      {
        setAtempts([<div className="atempt text" id={atempts.length}>{guess}</div>]);
      }
      else
      {
        setAtempts([...atempts, <div className="atempt text" id={atempts.length}>{guess}</div>]);
      }


      // ReactDOM.render(atempts, document.getElementById('atempts'));
      setGuess("");

    }
  };

  return (
    <div className="App">
      <AudioPlayer
        className="player"
        src={sound}
        autoPlay={false}
        showJumpControls={false}
        showDownloadProgress={false}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        // other props here
      />

      <form onSubmit={handleSubmit}>
        <label className="text">Guess the Sound:</label>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        {/* <label className = "text" for="women">Is thou a female?</label>
        <input onChange={()=>{setWomen(true)}}  type="checkbox" id="women" name="women" /> */}
        
        <button className="submitBtn">Guess</button>
      </form>

      <div className="atempts" id="atempts"/>{atempts}</div>
  );
}

export default App;
