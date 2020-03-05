import React, { useState } from "react";
import styled from 'styled-components';
import { SuspenseResponse } from "../../../service/wrapPromise";
import { Category } from "../../../types/Category";
import { Clue } from "../../../types/Clue";

import { ClueWrapper, ClueItem } from '../../styles/Clues';

type CategoryCluesProps = {
  category: Category,
  resource: SuspenseResponse
}

const RevealButton = styled.button`
  border: 1px solid black;
`;

const CategoryClues = ({category, resource}: CategoryCluesProps) => {
  const clues = resource.read() as Clue[];

  const [visibleClueAnswers, setVisibleClueAnswers] = useState<number[]>([]);

  const isAnswerVisibleForClue = (id: number) => {
    return visibleClueAnswers.includes(id);
  }

  const setAnswerVisibleForClue = (id: number) => {
    setVisibleClueAnswers( current => {
      return [
        ...current,
        id,
      ]
    })
  }
  
  return (
    <>
      <h3>{category.title}</h3>
      <ClueWrapper>
        {clues.map((c: Clue) => {
          return (
            <ClueItem key={c.id}>
              <div>For {c.value} points!</div>
              <div>
                <b>Question:</b>{c.question}
              </div>
              {
                isAnswerVisibleForClue(c.id) ? (
                  <div><b>Answer:</b> {c.answer}</div>
                ) : (
                  <RevealButton onClick={()=> setAnswerVisibleForClue(c.id)}>Reveal Answer</RevealButton>
                )
              }
            </ClueItem>
          );
        })}
      </ClueWrapper>
    </>
  );
};

export default CategoryClues;
