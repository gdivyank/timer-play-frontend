import React, { useState, useEffect } from "react";
import { throttle, debounce } from "lodash";

function App() {
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(false);

  const startCounterThrottled = throttle(() => {
    setRunning(true);
  }, 1000);

  const pauseCounter = () => {
    setRunning(false);
  };

  const resetCounterDebounced = debounce(() => {
    setCounter(0);
    setRunning(false);
  }, 1000);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running]);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      {running ? (
        <button onClick={pauseCounter}>Pause</button>
      ) : (
        <button onClick={startCounterThrottled}>Start</button>
      )}
      <button onClick={resetCounterDebounced}>Reset</button>
    </div>
  );
}

export default App;
