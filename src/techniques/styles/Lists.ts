import styled from 'styled-components';

export const List = styled.ul`
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  height: 50px;
  display: flex;
  align-items:center;
  border-top: 1px solid black;
  cursor: pointer;
  justify-content: space-between;

  &:hover {
    background-color: #eeeeee;
  }
`;