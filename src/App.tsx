import { useState } from 'react';

import { allDice } from './data/allDice';

import { getRandomLetterFromDie } from './utils/getRandomLetterFromDie';

import styled from 'styled-components';

import GameTimer from './components/GameTimer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  height: 80vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;
  
  background-color: navy;
  border-radius: 1rem;
  border: 1px solid blue;
  box-shadow: var(--box-shadow-6);
  padding: 1rem;
`;

const Die = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4rem;
  width: 4rem;

  background-color: white;
  border-radius: 0.25rem;
  font-size: 1.5rem;
  padding: 1rem;
`;

export default function App() {
  const [dice, setDice] = useState(allDice);

  const shakeDice = () => setDice([...allDice.sort(() => Math.random() - 0.5)]);

  return (
    <Wrapper>
      <h1 className="font-20">
        React Boggle
      </h1>
      <GameTimer />
      <Grid>
        {dice.map(die => (
          <Die key={die.id}>
            <p className="font-16">
              {getRandomLetterFromDie(die.sides)}
            </p>
          </Die>
        ))}
      </Grid>
      <button onClick={shakeDice}>
        Shake
      </button>
    </Wrapper>
  );
};
