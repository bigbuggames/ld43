import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Keyboard from './Components/Keyboard';
import Bird from './Components/Bird';
import Spawner from './Components/Spawner';

import Config from 'constants/Config';
import { Button } from './Components/Elements';

import foregroundImage from '../assets/images/foreground.png';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
  }
`;

const Screen = styled.div`
  width: 1920px;
  height: 1080px;
  transform: scale(0.7);
  overflow: hidden;
`;

const Foreground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${foregroundImage});
  background-color: #D46C32;
`;

const LogicContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

function Game() {
  const allowedSoundKeys = Config.sounds.map(sound => sound.key);

  return (
    <Screen>
      <GlobalStyle />
      <Foreground />

      <Keyboard allowedKeys={allowedSoundKeys}>
        {pressedKeys => (
          <div>
            <Bird pressedKeys={pressedKeys} />
            <Spawner pressedKeys={pressedKeys} spawnRate={2} />
          </div>
        )}
      </Keyboard>
    </Screen>
  );
}


const rootElement = document.getElementById('root');
ReactDOM.render(<Game />, rootElement);

if (process.env.NODE_ENV !== 'production') {
  // Enables hot module reloading
  if(module.hot) {
    module.hot.accept();
  }
}
