import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IToDo, categoryToDosMapState, selectedCategoryState } from '../atoms';

export const ToDo = ({ id, text }: IToDo) => {
  const [categoryToDosMap, setCategoryToDosMap] = useRecoilState(
    categoryToDosMapState
  );
  const selectedCategory = useRecoilValue(selectedCategoryState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name: targetCategory },
    } = event;
    const deletedToDos: IToDo[] = categoryToDosMap[selectedCategory].filter(
      (toDo) => toDo.id !== id
    );
    const TargetToDos: IToDo[] = categoryToDosMap[targetCategory];
    const addedToDos: IToDo[] = [...TargetToDos, { id, text }];

    setCategoryToDosMap({
      ...categoryToDosMap,
      [selectedCategory]: deletedToDos,
      [targetCategory]: addedToDos,
    });
  };
  return (
    <li>
      <span>{text}</span>
      {Object.entries(categoryToDosMap)
        .filter(([category]) => category !== selectedCategory)
        .map(([category]) => (
          <button name={category} onClick={onClick}>
            {category}
          </button>
        ))}
    </li>
  );
};
