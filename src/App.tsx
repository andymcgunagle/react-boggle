import { useState } from 'react';

import { boggleDice } from './data/boggleDice';
import { superBigBoggleDice } from './data/superBigBoggleDice';

import { getRandomLetterFromDie } from './utils/getRandomLetterFromDie';

import styled from 'styled-components';

import GameTimer from './components/GameTimer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  min-height: 80vh;
  text-align: center;
`;

const Grid = styled.div<{ superBigBoggle: boolean; }>`
  display: grid;
  
  grid-template-columns: ${({ superBigBoggle }) => superBigBoggle ? 'repeat(6, 1fr)' : 'repeat(4, 1fr)'};
  gap: 0.25rem;
  
  background-color: navy;
  border-radius: 1rem;
  border: 1px solid blue;
  box-shadow: var(--box-shadow-6);
  padding: 1rem;
`;

const Die = styled.p<{ showDice: boolean; superBigBoggle: boolean; }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${({ superBigBoggle }) => superBigBoggle ? '3rem' : '4rem'};
  width: ${({ superBigBoggle }) => superBigBoggle ? '3rem' : '4rem'};

  animation: ${({ showDice }) => showDice ? 'none' : 'var(--animation-shake-x)'};
  background-color: white;
  border-radius: 0.25rem;
  color: ${({ showDice }) => showDice ? 'black' : 'white'};
  font-size: 1.5rem;
  padding: 1rem;
  
  @media only screen and (min-width: 768px) {
    height: 4rem;
    width: 4rem;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function App() {
  const [dice, setDice] = useState(boggleDice);
  const [superBigBoggle, setSuperBigBoggle] = useState(false);
  const [showDice, setShowDice] = useState(false);

  function shakeDice() {
    setShowDice(false);
    setDice([...dice.sort(() => Math.random() - 0.5)]);
  };

  function switchGames() {
    setShowDice(false);
    setDice(superBigBoggle ? boggleDice : superBigBoggleDice);
    setSuperBigBoggle(!superBigBoggle);
  };

  return (
    <Wrapper>
      <h1 className="font-16 text-align-center">
        React {superBigBoggle ? 'Super Big Boggle' : 'Boggle'}
      </h1>
      <GameTimer
        dice={dice}
        setShowDice={setShowDice}
        superBigBoggle={superBigBoggle}
      />
      <Grid superBigBoggle={superBigBoggle}>
        {dice.map(die => (
          <Die
            key={die.id}
            showDice={showDice}
            superBigBoggle={superBigBoggle}
          >
            {getRandomLetterFromDie(die.sides)}
          </Die>
        ))}
      </Grid>
      <ButtonsWrapper>
        <button
          className="font-4"
          onClick={shakeDice}
        >
          Shake
        </button>
        <button
          className="font-4 outlined"
          onClick={switchGames}
        >
          {superBigBoggle ? 'Switch to Boggle' : 'Switch to Super Big Boggle'}
        </button>
      </ButtonsWrapper>
    </Wrapper>
  );
};
