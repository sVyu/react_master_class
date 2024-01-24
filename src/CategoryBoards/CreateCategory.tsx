import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { categoryToDosMapState } from '../atoms';

interface ICategory {
  category: string;
}

export const CreateCategory = () => {
  const [categoryToDosMap, setCategoryToDosMap] = useRecoilState(
    categoryToDosMapState
  );
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const handleValid = ({ category }: ICategory) => {
    if (category in categoryToDosMap) return;

    setCategoryToDosMap({ ...categoryToDosMap, [category]: [] });
    setValue('category', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('category', {
          required: 'Please write a Category',
        })}
        placeholder="Write a Category"
      />
      <button>Add</button>
    </form>
  );
};
