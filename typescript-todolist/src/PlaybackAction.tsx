import play from "./assets/play.svg";
import playback from "./assets/playback.svg";
import Ishuffle from "./assets/shuffle.svg";
import playforward from "./assets/playforward.svg";
import Irepeat from "./assets/repeat.svg";
import React, { SetStateAction, useState, useEffect } from "react";
import Songs from "./Songs";

let rotationAngle = 0;
let animationDuration = 2;

type currentTrackT = {
  id: number;
  photo: string;
  song: string;
  author: string;
  duration: string;
};

type ShuffleFunctionsT = {
  shuffleArray: () => void;
  unShuffle: () => void;
};

type setCurrentTrackT = React.Dispatch<
  React.SetStateAction<{
    id: number;
    photo: string;
    song: string;
    author: string;
    duration: string;
  }>
>;

type queueT = {
  id: number;
  photo: string;
  song: string;
  author: string;
  duration: string;
}[];

type setQueueT = React.Dispatch<
  React.SetStateAction<
    {
      id: number;
      photo: string;
      song: string;
      author: string;
      duration: string;
    }[]
  >
>;

type PlaybackActionProps = {
  isPlaying: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTrack: currentTrackT;
  setCurrentTrack: setCurrentTrackT;
  setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
  queue: queueT;
  setQueue: setQueueT;
  setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
  timeElapsed: number;
  totalSeconds: number;
};

function PlaybackAction({
  isPlaying,
  setPlaying,
  currentTrack,
  setCurrentTrack,
  setTimeElapsed,
  queue,
  setQueue,
  timeElapsed,
  setTotalSeconds,
  totalSeconds,
}: PlaybackActionProps) {
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [arrayS, setArrayS] = useState([...Songs]);
  const [objS, setObjS] = useState(Songs[0]);
  const albumcover = document.getElementById("albumcover") as HTMLImageElement;

  const getTotalSeconds = (duration: string): number => {
    const [minutes, seconds] = duration.split(":").map(Number);
    setTotalSeconds(minutes * 60 + seconds);
    return minutes * 60 + seconds;
  };

  function duplicateQueue() {
    if (!shuffle) {
      setQueue([...Songs]);
    } else {
      setQueue([objS, ...arrayS]);
    }
  }

  useEffect(() => {
    if (repeat && queue.length == 0) {
      duplicateQueue();
    }
  }, [repeat, queue, duplicateQueue]);

  useEffect(() => {
    getTotalSeconds(currentTrack.duration);
    const timer = setInterval(() => {
      if (isPlaying && timeElapsed < totalSeconds) {
        setTimeElapsed((timeElapsed) => timeElapsed + 1); // Increment current time every second
      } else if (timeElapsed >= totalSeconds && queue.length != 0) {
        setPlaying(false);
        setTimeout(() => {
          setPlaying(true);
        }, 500);
        setTimeElapsed(0);
        setCurrentTrack(queue[0]);
        setQueue(queue.slice(1));
        return () => clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    }; // Clean up the interval when component unmounts
  }, [
    isPlaying,
    totalSeconds,
    timeElapsed,
    setCurrentTrack,
    currentTrack,
    setPlaying,
  ]);

  let l: number;

  function shuffleArray() {
    let arrayWOcurrent = Songs.slice(0, currentTrack.id).concat(
      Songs.slice(currentTrack.id + 1)
    );
    let shuffleArr = [...arrayWOcurrent];
    // While there remain elements to shuffle.
    console.log("shuffled");
    for (let i = shuffleArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
    }
    setShuffle(true);
    setArrayS([currentTrack, ...shuffleArr]);
    setObjS(currentTrack);
    setQueue([...shuffleArr]);
  }

  function unShuffle() {
    setShuffle(false);
    setQueue([...Songs.slice(currentTrack.id + 1)]);
  }

  function repeatQueue() {
    setRepeat(true);
  }

  function unRepeatQueue() {
    setRepeat(false);
  }

  const handleForward = () => {
    if (!repeat && queue.length == 0) {
      console.log(queue);
      setTimeElapsed(9999);
      setPlaying(false);
    } else {
      console.log(queue);
      setCurrentTrack(queue[0]);
      setQueue(queue.slice(1));
      setTimeElapsed(0);
    }
  };

  const handleBack = () => {
    if (currentTrack.id == 0) {
      setTimeElapsed(0);
    } else if (!shuffle) {
      setQueue([Songs[currentTrack.id], ...queue]);
      setCurrentTrack(Songs[currentTrack.id - 1]);
      setTimeElapsed(0);
    } else if (shuffle && !arrayS.includes(currentTrack)) {
      l = arrayS.indexOf(currentTrack);
      setQueue([currentTrack, ...queue]);
      setCurrentTrack(arrayS[l - 1]);
      setTimeElapsed(0);
    } else if (shuffle) {
      setTimeElapsed(0);
    }
    albumcover.style.animationName = 'none'
    setTimeout(()=>{
        albumcover.style.animationName = 'spin'
    },0)
  };

  return (
    <div className="action-container">
      <img
        onClick={() => {
          !shuffle ? shuffleArray() : unShuffle();
        }}
        className="action-button"
        style={{ paddingRight: "20px" }}
        src={Ishuffle}
        alt=""
      />
      <img
        onClick={handleBack}
        className="action-button"
        src={playback}
        alt=""
      />
      <img
        onClick={() => {
          if (isPlaying) {
            setPlaying(false);
          } else {
            setPlaying(true);
          }
        }}
        className="action-button"
        src={play}
        alt=""
      />
      <img
        onClick={handleForward}
        className="action-button"
        src={playforward}
        alt=""
      />
      <img
        onClick={() => {
          !repeat ? repeatQueue() : unRepeatQueue();
        }}
        className="action-button"
        style={{ paddingLeft: "20px" }}
        src={Irepeat}
        alt=""
      />
    </div>
  );
}

export default PlaybackAction;
