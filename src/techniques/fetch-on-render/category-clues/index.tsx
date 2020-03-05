import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import api from "../../../service/api";
import { Category } from "../../../types/Category";
import { Clue } from "../../../types/Clue";

type CategoryCluesProps = {
  category: Category
}

const RevealButton = styled.button`
  border: 1px solid black;
`;

const CategoryClues = ({category}: CategoryCluesProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [clues, setClues] = useState<Clue[]>([]);
  const [visibleClueAnswers, setVisibleClueAnswers] = useState<number[]>([]);

  useEffect(() => {
    api
      .clues(category.id)
      .then((clues: Clue[]) => {
        setClues(clues);
        setLoading(false);
      })
      .catch(error => {
        console.log("error!", error);
        setError(true);
        setLoading(false);
      });
  }, [category]);

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
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      <ul>
        {clues.map((c: Clue) => {
          return (
            <li key={c.id}>
              <b>For {c.value} points!</b>
              <div>
                <b>Question:</b> {c.question}
              </div>
              {
                isAnswerVisibleForClue(c.id) ? (
                  <div><b>Answer:</b> {c.answer}</div>
                ) : (
                  <RevealButton onClick={()=> setAnswerVisibleForClue(c.id)}>Reveal Answer</RevealButton>
                )
              }
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CategoryClues;
