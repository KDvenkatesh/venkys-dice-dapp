import React, { useState } from 'react';

export default App;

function App() {
  const [count, setCount] = useState(0); // count is a state variable

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increase}>➕ Increase</button>
      <button onClick={decrease} style={{ marginLeft: '10px' }}>➖ Decrease</button>
    </div>
  );
}


