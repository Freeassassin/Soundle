import "./App.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {db} from "./database";
import {getFirestore, collection, getDocs} from "firebase/firestore/lite";

toast.configure();

async function getAnswer(db) {
  const answersCol = collection(db, "answers");
  const answersSnapshot = await getDocs(answersCol);
  const answerList = answersSnapshot.docs.map((doc) => doc.data());
  return answerList;
}

async function setAnswersFromDB(setAnswers, day) {
  setAnswers(
    await getAnswer(db).then(function (result) {
      return result[0].Day[day];
    })
  );
}

function App() {
  const origin = new Date("2022-03-06");
  const today = new Date();

  const day = Math.floor(Math.abs(today - origin) / (1000 * 60 * 60 * 24));

  const [sound, setSound] = useState();
  const [guess, setGuess] = useState();
  const [answers, setAnswers] = useState();

  useEffect(() => {
    setSound(require(`./sounds/${day}.mp3`));
    setAnswersFromDB(setAnswers, day);
    console.log(answers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answers.includes(guess.toLowerCase())) {
      toast.success("YOU GOT IT!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        pauseOnHover: false,
        hideProgressBar: true,
        theme: "dark",
        limit: 3,
      });
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
        <button className="submitBtn">Guess</button>
      </form>
    </div>
  );
}

export default App;
