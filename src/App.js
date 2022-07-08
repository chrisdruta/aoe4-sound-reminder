import React, { useState, useEffect, useRef } from 'react';

import logo from './wololo.png';
import wololo from './wololo.mp3';
import zen from './zen.mp3';

import './App.css';

const audioClips = [new Audio(wololo), new Audio(zen)];

function App() {
  const [clipIndex, setClipIndex] = useState(0);
  const [play, setPlay] = useState(false);
  const [intervalTime, setIntervalTime] = useState(20);
  const [volume, setVolume] = useState(70);

  const audioRef = useRef(audioClips[clipIndex]);
  const timerRef = useRef();

  useEffect(() => {
    audioRef.current.volume = volume / 100.0;
  }, [volume]);

  useEffect(() => {
    if (play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = audioClips[clipIndex];

      audioRef.current.play();
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {audioRef.current.play()}, intervalTime * 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [play, intervalTime, clipIndex]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>AoE4 Sound Reminder-er</h1>
        <img src={logo} className="App-logo" alt="logo"
          style={{pointerEvents: "all", animationPlayState: play ? "running" : "paused"}}
          onClick={() => setClipIndex((clipIndex + 1) % (audioClips.length))}
        />
        <br />
        <p>
          Volume: {volume}
          <br/>
          <input id="volumeSlider" type="range" min={0} max={100} value={volume} onChange={(e) => {
            setVolume(e.target.value);
          }}/>
        </p>
        <p>
          Interval time: {intervalTime}
          <br />
          <input id="timeSlider" type="range" min={0} max={70} value={intervalTime} onChange={(e) => {
            setIntervalTime(e.target.value);
          }}/>
        </p>
        <button onClick={() => setPlay(!play)}>{play ? "Stop" : "Start"}</button>
      </header>
    </div>
  );
}

export default App;
