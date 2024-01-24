import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IToDosWithCategory, categoriesState, toDoState } from '../atoms';

// interface IForm {
//   toDo: string;
// }

function CreateToDo() {
  const categories = useRecoilValue(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IToDosWithCategory>();
  const handleValid = ({ inputCategory }: string) => {
    // if (inputCategory in categories) return false;
    // return true;
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
}

export default CreateToDo;
