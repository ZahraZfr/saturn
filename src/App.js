import React from 'react';
import config from './services/config';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">{JSON.stringify(config, null, 2)}</header>
  //   </div>
  // );
  return <button onClick={methodDoesNotExist}>Break the world</button>;
}

export default App;
