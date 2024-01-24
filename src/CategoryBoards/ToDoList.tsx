import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoriesState, selectedCategoryState, toDoSelector } from '../atoms';
import { CreateCategory } from './CreateCategory';

function ToDoList() {
  // const toDos = useRecoilValue(toDoSelector);
  const [selectedCategory, SetSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const categories = useRecoilValue(categoriesState);
  const handleInput = (event: React.FormEvent<HTMLSelectElement>) => {
    SetSelectedCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      <CreateCategory />
      <hr />
      <select value={selectedCategory} onInput={handleInput}>
        {Object.entries(categories).map(([category, _]) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
      {/* <CreateToDo /> */}
      {/* {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))} */}
    </div>
  );
}

export default ToDoList;
