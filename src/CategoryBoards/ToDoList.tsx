import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryToDosMapState, selectedCategoryState } from '../atoms';
import { CreateCategory } from './CreateCategory';
import { CreateToDo } from './CreateToDo';
import { ToDo } from './ToDo';

export const ToDoList = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const categoryToDosMap = useRecoilValue(categoryToDosMapState);
  const handleInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value as any);
  };

  console.log('categoryToDosMap', categoryToDosMap);
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
      {categoryToDosMap[selectedCategory]?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
};
