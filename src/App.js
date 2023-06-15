import './App.css';
import { useForm } from 'react-hook-form';

/** デフォルトで利用できるバリデーションルール
required:
min:
max:
minLength:
maxLength:
pattern:
validate:
*/

/** useFormのMODE一覧
  Name	Type	Description
  onSubmit	string	Validation is triggered on the submit event, and inputs attach onChange event listeners to re-validate themselves.
  onBlur	string	Validation is triggered on the blur event.
  onChange	string	Validation is triggered on the changeevent for each input, leading to multiple re-renders. Warning: this often comes with a significant impact on performance.
  onTouched	string	Validation is initially triggered on the first blur event. After that, it is triggered on every change event.

  Note: when using with Controller, make sure to wire up onBlur with the render prop.
  all	string	Validation is triggered on both blur and change events.
*/

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all', // 複数のエラーを取得
    defaultValues: { email: 'john@test.com', password: 'pass' }, // デフォルトバリュー
    mode: 'onBlur',
  });

  const onSubmit = (data) => console.log(data);

  console.log(errors)
  return (
    <div className="App">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register('email', {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
            })}
          />
          {errors.email?.message && <div>{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register('password', {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'アルファベットのみ入力してください。',
              },
              minLength: {
                value: 8,
                message: '8文字以上入力してください。',
              },
            })}
            type="password"
          />
          {errors.password?.types.required && (
            <div>{errors.password.types.required}</div>
          )}
          {errors.password?.types.pattern && (
            <div>{errors.password.types.pattern}</div>
          )}
          {errors.password?.types.minLength && (
            <div>{errors.password.types.minLength}</div>
          )}
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default App;