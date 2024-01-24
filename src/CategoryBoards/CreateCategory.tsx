import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { categoriesState } from '../atoms';

interface ICategory {
  category: string;
}

export const CreateCategory = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const handleValid = ({ category }: ICategory) => {
    if (category in categories) return;

    setCategories({ ...categories, [category]: [] });
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
