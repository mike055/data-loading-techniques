import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Lazy from './techniques/lazy';
import Traditional from './techniques/traditional';

const Global = createGlobalStyle`
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const ClickableListItem = styled.li`
  cursor: pointer;
`;

enum Technique {
  Traditional,
  Lazy,
};

const hasSelectedTechnique = (technique: Technique | null) => {
  return (technique === Technique.Traditional as Technique || technique === Technique.Lazy as Technique)
} 

function App() {
  const [ technique, setTechnique ] = useState<Technique | null>(null);
  return (
    <div>
      <Global />
      <h1>Data loading</h1>
      <ul>
        <ClickableListItem onClick={ ()=> setTechnique(Technique.Traditional) }>Traditional</ClickableListItem>
        <ClickableListItem onClick={ ()=> setTechnique(Technique.Lazy) }>Lazy</ClickableListItem>
      </ul>
      <hr />
      {
        hasSelectedTechnique(technique) && (
          <>
            <h2>Using { technique === Technique.Traditional as Technique ? 'Traditional ' : 'Lazy ' } data loading</h2>
            { technique === Technique.Traditional as Technique && <Traditional /> }
            { technique === Technique.Lazy as Technique && <Lazy /> }
          </>
        )
      }
    </div>
  );
}

export default App;
