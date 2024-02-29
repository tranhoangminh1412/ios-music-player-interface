import React, { SetStateAction } from "react";
import { useState, useEffect } from "react";
import PlaybackAction from "./PlaybackAction";

type ProgressBarProps = {
  currentTrack: number;
  progressBarRef: React.RefObject<HTMLInputElement>;
  totalSeconds: number;
  setCurrentTrack: React.Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
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

function ProgressBar({
  currentTrack,
  progressBarRef,
  totalSeconds,
  setCurrentTrack,
  isPlaying,
  setPlaying,
  queue,
  setQueue,
}: ProgressBarProps) {
  const currentSong = queue[currentTrack];
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying && timeElapsed < totalSeconds) {
        setTimeElapsed((timeElapsed) => timeElapsed + 1); // Increment current time every second
      } else if (timeElapsed >= totalSeconds) {
        setPlaying(false);
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
      />
    </>
  );
}

export default ProgressBar;
