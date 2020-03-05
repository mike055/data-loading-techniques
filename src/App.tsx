import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import RenderAsFetch from './techniques/render-as-fetch';
import FetchOnRender from './techniques/fetch-on-render';

const Global = createGlobalStyle`
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const ClickableListItem = styled.li`
  cursor: pointer;
`;

enum Technique {
  FetchOnRender,
  RenderAsFetch,
};

const hasSelectedTechnique = (technique: Technique | null) => {
  return (technique === Technique.FetchOnRender as Technique || technique === Technique.RenderAsFetch as Technique)
} 

function App() {
  const [ technique, setTechnique ] = useState<Technique | null>(null);
  return (
    <div>
      <Global />
      <h1>Data loading</h1>
      <ul>
        <ClickableListItem onClick={ ()=> setTechnique(Technique.FetchOnRender) }>Fetch On Render</ClickableListItem>
        <ClickableListItem onClick={ ()=> setTechnique(Technique.RenderAsFetch) }>Render as you Fetch</ClickableListItem>
      </ul>
      <hr />
      {
        hasSelectedTechnique(technique) && (
          <>
            <h2>Using { technique === Technique.FetchOnRender as Technique ? '"fetch on render"' : '"render as you fetch"' }</h2>
            { technique === Technique.FetchOnRender as Technique && <FetchOnRender /> }
            { technique === Technique.RenderAsFetch as Technique && <RenderAsFetch /> }
          </>
        )
      }
    </div>
  );
}

export default App;
