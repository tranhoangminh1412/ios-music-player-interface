import React, { SetStateAction } from "react";
import { useState, useEffect } from "react";
import PlaybackAction from "./PlaybackAction";
import Songs from "./Songs";
import { time } from "console";

type currentTrackT = {
  id: number;
  photo: string;
  song: string;
  author: string;
  duration: string;
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

type ProgressBarProps = {
  currentTrack: currentTrackT;
  progressBarRef: React.RefObject<HTMLInputElement>;
  totalSeconds: number;
  setCurrentTrack: setCurrentTrackT;
  isPlaying: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  queue: queueT;
  setQueue: setQueueT;
  setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
};

function ProgressBar({
  currentTrack,
  progressBarRef,
  totalSeconds,
  setCurrentTrack,
  isPlaying,
  setPlaying,
  queue,
  setQueue,
  setTotalSeconds,
}: ProgressBarProps) {
  const currentSong = currentTrack;
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [repeat,setRepeat] = useState(false);

//   const getTotalSeconds = (duration: string): number => {
//     const [minutes, seconds] = duration.split(":").map(Number);
//     setTotalSeconds(minutes * 60 + seconds)
//     return minutes * 60 + seconds;
//   };

//   useEffect(() => {
//     getTotalSeconds(currentTrack.duration)
//     const timer = setInterval(() => {
//       if (isPlaying && timeElapsed < totalSeconds) {
//         setTimeElapsed((timeElapsed) => timeElapsed + 1); // Increment current time every second
//       } else if (timeElapsed >= totalSeconds && queue.length != 0) {
//         setPlaying(false);
//         setTimeout(() => {
//           setPlaying(true);
//         }, 500);
//         setTimeElapsed(0);
//         setCurrentTrack(queue[0]);
//         setQueue(queue.slice(1));
//         return () => clearInterval(timer);
//       }

//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     }; // Clean up the interval when component unmounts
//   }, [
//     isPlaying,
//     totalSeconds,
//     timeElapsed,
//     setCurrentTrack,
//     currentTrack,
//     setPlaying,
//   ]);

  const handleProgressChange = () => {
    console.log(progressBarRef.current?.value);
    setTimeElapsed(
      parseInt(
        progressBarRef.current?.value ? progressBarRef.current.value : "0"
      )
    );
  };

  const currentTime = () => {
    if (timeElapsed > totalSeconds) {
      setTimeElapsed(totalSeconds);
    }
    let mins: number = Math.floor(timeElapsed / 60); // Calculate minutes
    let seconds: number = timeElapsed % 60; // Calculate remaining seconds
    let str = `${mins.toString()}:${seconds.toString().padStart(2, "0")}`; // Format string with leading zeros
    return str;
  };

  return (
    <>
      <div className="progressbar-container">
        <div className="slider-container">
          {" "}
          <input
            className="slider"
            onChange={handleProgressChange}
            type="range"
            max={totalSeconds}
            ref={progressBarRef}
            value={timeElapsed}
          />
        </div>
        <div className="container-time">
          <span
            style={{ position: "absolute", left: "0px", paddingLeft: "24px" }}
            className="time-text"
          >
            {currentTime()}
          </span>
          <span
            style={{ position: "absolute", right: "0px", paddingRight: "24px" }}
            className="time-text"
          >
            {currentSong.duration}
          </span>
        </div>
      </div>
      <PlaybackAction
        isPlaying={isPlaying}
        setPlaying={setPlaying}
        setCurrentTrack={setCurrentTrack}
        currentTrack={currentTrack}
        setTimeElapsed={setTimeElapsed}
        queue={queue}
        setQueue={setQueue}
        setTotalSeconds={setTotalSeconds}
        totalSeconds={totalSeconds}
        timeElapsed={timeElapsed}
      />
    </>
  );
}

export default ProgressBar;
