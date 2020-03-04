import { Category } from '../types/Category';
import { Clue } from '../types/Clue';

type Api = {
  categories: () => Promise<Category[]>,
  clues: (categoryId: number) => Promise<Clue[]>,
}

const api: Api = {
  categories: () => {
    return fetch('http://jservice.io/api/categories?count=10')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Category[]>
      })
      .then(data => {
        return data
      })
  },
  clues: (categoryId: number) => {
    return fetch(`http://jservice.io/api/clues?category=${categoryId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Clue[]>
      })
      .then(data => {
        return data
      })
  }
};

export default api;