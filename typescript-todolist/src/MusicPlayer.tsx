import dots from "./assets/dots.svg";
import arrowdown from "./assets/arrowdown.svg";
import ellipse from "./assets/Ellipse.svg";
import heart from "./assets/heart.svg";
import Songs from "./Songs";
import ProgressBar from "./ProgressBar";
import PlaybackAction from "./PlaybackAction";
import "./assets/Ellipse.svg";
import { useRef, useState, useEffect } from "react";

const originalQueue = [...Songs];

function MusicPlayer() {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [queue, setQueue] = useState([...originalQueue.slice(1)]);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [currentTrack, setCurrentTrack] = useState(originalQueue[0]);

  return (
    <div className="screen">
      <div className="header-box">
        <img src={arrowdown} alt="" />
        <div className="album-name">English Songs</div>
        <img src={dots} alt="" />
      </div>
      <div className="ellipse-container">
        <div className="ellipse-1"></div>
        <img
          id="albumcover"
          className={isPlaying ? "ellipse-2-spin" : "ellipse-2"}
          src={currentTrack.photo}
          alt=""
        />
      </div>
      <div className="songinfo-container">
        <div className="songinfo-container-info">
          <div className="songinfo-name">{currentTrack.song}</div>
          <div className="songinfo-author">{currentTrack.author}</div>
        </div>
        <img
          style={{ position: "absolute", top: "40px", right: "24px" }}
          src={heart}
          alt=""
        />
      </div>
      <ProgressBar
        currentTrack={currentTrack}
        progressBarRef={progressBarRef}
        totalSeconds={totalSeconds}
        setCurrentTrack={setCurrentTrack}
        isPlaying={isPlaying}
        setPlaying={setPlaying}
        queue={queue}
        setQueue={setQueue}
        setTotalSeconds={setTotalSeconds}
      />
    </div>
  );
}

export default MusicPlayer;
