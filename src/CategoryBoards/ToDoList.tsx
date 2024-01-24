import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryToDosMapState, selectedCategoryState } from '../atoms';
import { CreateCategory } from './CreateCategory';
import { CreateToDo } from './CreateToDo';

function ToDoList() {
  // const toDos = useRecoilValue(toDoSelector);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const categoryToDosMap = useRecoilValue(categoryToDosMapState);
  const handleInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value as any);
  };

  // console.log('categoryToDosMap', categoryToDosMap);
  // console.log('selectedCategory', selectedCategory);
  useEffect(() => {
    if (Object.keys(categoryToDosMap).length) {
      setSelectedCategory(Object.keys(categoryToDosMap)[0]);
    }
  }, []);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      <CreateCategory />
      <hr />
      <select value={selectedCategory} onInput={handleInput}>
        {Object.entries(categoryToDosMap).map(([category, _]) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
      <CreateToDo />
      {/* {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))} */}
    </div>
  );
}

export default ToDoList;
