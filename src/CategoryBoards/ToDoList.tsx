import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoriesState, selectedCategoryState, toDoSelector } from '../atoms';
import { CreateCategory } from './CreateCategory';

function ToDoList() {
  // const toDos = useRecoilValue(toDoSelector);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const categories = useRecoilValue(categoriesState);
  const handleInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value as any);
  };

  // console.log('selectedCategory', selectedCategory);
  useEffect(() => {
    if (Object.keys(categories).length) {
      setSelectedCategory(Object.keys(categories)[0]);
    }
  }, []);

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
