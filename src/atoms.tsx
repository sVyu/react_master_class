import { atom, selector, useRecoilValue } from 'recoil';

// export enum Categories {
//   'TO_DO' = 'TO_DO',
//   'DOING' = 'DOING',
//   'DONE' = 'DONE',
// }

export interface IToDo {
  id: number;
  text: string;
}
export interface IToDosWithCategory {
  [key: string]: IToDo[];
}

export const defaultCategories = ['TO_DO', 'DOING', 'DONE'];

export const categoriesState = atom<IToDosWithCategory>({
  key: 'categories',
  default: defaultCategories.reduce((acc, category) => {
    return { ...acc, [category]: [] };
  }, {}),
});

export const selectedCategoryState = atom<string>({
  key: 'selectedCategory',
  default: '',
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const categories = get(categoriesState);
    const selectedCategory = get(selectedCategoryState);
    return categories[selectedCategory];
  },
});
