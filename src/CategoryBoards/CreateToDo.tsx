import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IToDo, categoryToDosMapState, selectedCategoryState } from '../atoms';

interface IForm {
  toDo: string;
}

export const CreateToDo = () => {
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const [categoryToDosMap, setCategoryToDosMap] = useRecoilState(
    categoryToDosMapState
  );

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    if (selectedCategory === '') return;
    const targetToDos = categoryToDosMap[selectedCategory];
    setCategoryToDosMap({
      ...categoryToDosMap,
      [selectedCategory]: [
        ...targetToDos,
        { id: Date.now(), text: toDo } as IToDo,
      ],
    });
    setValue('toDo', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
};
