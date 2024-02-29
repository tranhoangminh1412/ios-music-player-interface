import play from "./assets/play.svg";
import playback from "./assets/playback.svg";
import Ishuffle from "./assets/shuffle.svg";
import playforward from "./assets/playforward.svg";
import Irepeat from "./assets/repeat.svg";
import React, { SetStateAction, useState } from "react";
import Songs from "./Songs";

type PlaybackActionProps = {
  isPlaying: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTrack: number;
  setCurrentTrack: React.Dispatch<SetStateAction<number>>;
  setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
  queue: {
    id: number;
    photo: string;
    song: string;
    author: string;
    duration: string;
  }[];
  setQueue: React.Dispatch<
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
};

function PlaybackAction({
  isPlaying,
  setPlaying,
  currentTrack,
  setCurrentTrack,
  setTimeElapsed,
  queue,
  setQueue,
}: PlaybackActionProps) {
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  let songArr = [];
  for (let i = currentTrack; i < songArr.length; i++) {
    songArr.push(Songs[i]);
  }

  function shuffleArray(
    array: {
      id: number;
      photo: string;
      song: string;
      author: string;
      duration: string;
    }[],
    setArray: React.Dispatch<
      React.SetStateAction<
        {
          id: number;
          photo: string;
          song: string;
          author: string;
          duration: string;
        }[]
      >
    >
  ) {
    let currentIndex = array.length,
      randomIndex;

    let obj = array[currentIndex]
    let newArr = [...array.slice(currentIndex+1)];

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [newArr[currentIndex], newArr[randomIndex]] = [
        newArr[randomIndex],
        newArr[currentIndex],
      ];
    }
    setShuffle(true);
    setCurrentTrack(0)
    setQueue([obj,...newArr]);
  }

  function unShuffle(current : number) {
    setShuffle(false);
    setCurrentTrack(queue[current].id)
    setQueue([...Songs.slice(queue[current].id)])
    console.log('Current Track Id: ' + queue[current].id)
    console.log('Queue Now: ' + Songs.slice(queue[current].id))
  }

  const handleForward = () => {
    if (currentTrack + 1 == queue.length) {
      setTimeElapsed(9999);
    } else {
      setCurrentTrack((currentTrack) => currentTrack + 1);
      setTimeElapsed(0);
    }
  };

  const handleBack = () => {
    if (currentTrack == 0) {
      setTimeElapsed(0);
    } else {
      setCurrentTrack((currentTrack) => currentTrack - 1);
      setTimeElapsed(0);
    }
  };

  return (
    <div className="action-container">
      <img
        onClick={() => shuffle? shuffleArray(queue, setQueue) :  unShuffle(currentTrack)}
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
        onClick={() => setPlaying(!isPlaying)}
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
        className="action-button"
        style={{ paddingLeft: "20px" }}
        src={Irepeat}
        alt=""
      />
    </div>
  );
}

export default PlaybackAction;
