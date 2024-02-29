import dots from "./assets/dots.svg";
import arrowdown from "./assets/arrowdown.svg";
import ellipse from "./assets/Ellipse.svg";
import heart from "./assets/heart.svg";
import Songs from "./Songs";
import ProgressBar from "./ProgressBar";
import PlaybackAction from "./PlaybackAction";
import "./assets/Ellipse.svg"
import { useRef, useState, useEffect } from "react";

const originalQueue = [...Songs]

function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [queue,setQueue] = useState([...originalQueue])
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Calculate total duration of the song in seconds
    const getTotalSeconds = (duration: string): number => {
      const [minutes, seconds] = duration.split(":").map(Number);
      return minutes * 60 + seconds;
    };

    // Set total duration of the song in seconds
    setTotalSeconds(getTotalSeconds(queue[currentTrack].duration));
  }, []);

  return (
    <div className="screen">
      <div className="header-box">
        <img src={arrowdown} alt="" />
        <div className="album-name">English Songs</div>
        <img src={dots} alt="" />
      </div>
      <div className="ellipse-container">
        <div className="ellipse-1"></div>
        <img className="ellipse-2" src={queue[currentTrack].photo} alt="" />
      </div>
      <div className="songinfo-container">
        <div className="songinfo-container-info">
          <div className="songinfo-name">{queue[currentTrack].song}</div>
          <div className="songinfo-author">{queue[currentTrack].author}</div>
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
      />
    </div>
  );
}

export default MusicPlayer;
