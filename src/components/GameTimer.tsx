import { useState, useEffect } from "react";

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Clock = styled.div<{ gameTimer: number; }>`
  display: flex;
  gap: 0.125rem;
  align-items: center;
  justify-content: center;

  background-color: var(--clr-white);
  border-radius: var(--border-radius-4);
  box-shadow: var(--box-shadow-4);
  padding: 0 0.5rem;
  
  & > * {
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ gameTimer }) => {
    if (gameTimer === 0) return 'var(--clr-danger-600)';
    else if (gameTimer <= 10) return 'var(--clr-warning-600)';
    else return 'var(--clr-gray-900)';
  }};
    font-size: var(--font-size-18);
  }
  
  & > :nth-child(1) {    
    height: 3rem;
    width: 2rem;
  }
  
  & > :nth-child(3) {    
    height: 3rem;
    width: 3rem;
  }
`;

export default function GameTimer() {
  const [gameTimer, setGameTimer] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (gameTimer > 0) setGameTimer(gameTimer - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [gameTimer]);

  return (
    <Wrapper>
      <Clock gameTimer={gameTimer}>
        <span>
          {Math.floor(gameTimer / 60)}
        </span>
        <span>:</span>
        <span>
          {gameTimer % 60 < 10 && '0'}{gameTimer % 60}
        </span>
      </Clock>
      <button
        onClick={() => setGameTimer(60 * 3)}
        className="outlined"
      >
        Restart
      </button>
    </Wrapper>
  );
};
