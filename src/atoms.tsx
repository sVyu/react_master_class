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
export interface ICategoryToDosMap {
  [key: string]: IToDo[];
}

const defaultCategories = ['TO_DO', 'DOING', 'DONE'];

export const categoryToDosMapState = atom<ICategoryToDosMap>({
  key: 'categoryToDosMap',
  default: defaultCategories.reduce((acc, category) => {
    return { ...acc, [category]: [] };
  }, {}),
});

export const selectedCategoryState = atom<string>({
  key: 'selectedCategory',
  default: '',
});

// export const toDoState = atom<IToDo[]>({
//   key: 'toDo',
//   default: [],
// });

// export const toDoSelector = selector({
//   key: 'toDoSelector',
//   get: ({ get }) => {
//     const categoryToDosMap = get(categoryToDosMapState);
//     const selectedCategory = get(selectedCategoryState);
//     return categoryToDosMap[selectedCategory];
//   },
// });
