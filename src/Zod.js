import './App.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

/**Zodバリデーションを利用
*https://zod.dev/
*/


const schema = z.object({
  email: z
    .string()
    .email({ message: 'メールアドレスの形式ではありません。' })
    .min(1, { message: '1文字以上入力する必要があります。' }),
  password: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
});

function App() {
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
});

  const onSubmit = (data) => console.log(data);

  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register('email', { required: true })} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" {...register('password')} type="password" />
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default App;