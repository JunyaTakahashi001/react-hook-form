import './App.css';
import { useForm } from 'react-hook-form';

/**
  watchを利用して表示状態を変更する
*/

const App = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const watchShowAge = watch('showAge', false);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="checkbox" {...register('showAge')} />
        </div>

        {watchShowAge && (
          <div>
            <input type="number" {...register('age', { min: 50 })} />
            {errors.age && <div>50以上を入力してください</div>}
          </div>
        )}

        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    </div>
  );
};

export default App;