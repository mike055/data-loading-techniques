import { Category } from '../types/Category';
import { Clue } from '../types/Clue';
import wrapPromise, { SuspenseResponse } from './wrapPromise';

type SuspenseApi = {
  categories: () => SuspenseResponse,
  clues: (categoryId: number) => SuspenseResponse,
}

const suspenseApi: SuspenseApi = {
  categories: () => {
    const promise = fetch('http://jservice.io/api/categories?count=10')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Category[]>
      })
      .then(data => {
        return data
      });

      return wrapPromise(promise);
  },
  clues: (categoryId: number) => {
    const promise = fetch(`http://jservice.io/api/clues?category=${categoryId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<Clue[]>
      })
      .then(data => {
        return data
      });

      return wrapPromise(promise);
  }
};

export default suspenseApi;