import './App.scss';
// import React,{ useEffect } from 'react';

import GameArea from './components/game-area/game-area.component';
// import GameArea from './components/game-area/game-area-hook.component';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <GameArea />
      </header>
    </div>
  );
}

export default App;
