import React, { useState, useEffect } from 'react';

import './App.css';

let wololo = new Audio("./wololo.mp3");
let timer = null;

function App() {

  const [playInterval, setPlayInterval] = useState(false);
  const [intervalTime, setIntervalTime] = useState(20);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    wololo.volume = volume / 100.0;
  }, [volume]);

  useEffect(() => {
    if (playInterval) {
      clearInterval(timer);
      wololo.play();
      timer = setInterval(() => {wololo.play()}, intervalTime * 1000);
    } else {
      if (timer) {
        clearInterval(timer);
      }
    }
  }, [playInterval, intervalTime]);

  return (
    <div className="App">
      <header className="App-header">
        <img src="./wololo.png" className="App-logo" alt="logo" style={{animationPlayState: playInterval ? "running" : "paused"}} />
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
        <button onClick={() => setPlayInterval(!playInterval)}>{playInterval ? "Stop" : "Start"}</button>
      </header>
    </div>
  );
}

export default App;
