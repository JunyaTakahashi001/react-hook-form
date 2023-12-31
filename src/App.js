import './App.css';
import { useForm } from 'react-hook-form';


/** formStateのプロパティ一覧
  errors
  isDirty:入力欄にアクセスし、入力欄をデフォルト値から変更するとfalseに変わる
  dirtyFields
  touchedFields
  isSubmitted
  isSubmitSuccessful
  isSubmitting
  submitCount
  isValid:バリデーションをパスしているかチェック（modeをデフォルトのonSubmitから変更必要）
  isValidating
*/


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
    formState: { isDirty, isValid, errors },
    trigger, // 手動でバリデーションを行う場合に呼び出すプロパティ
    // getValues, // フィールドの入力内容を取得（submit時更新される）
    watch // フィールドの入力内容を取得（入力の度更新される）
  } = useForm({
    criteriaMode: 'all', // 複数のエラーを取得
    defaultValues: { email: '', password: '' }, // デフォルトバリュー
    mode: 'onChange', // バリデーションの実行タイミング
    reValidateMode: 'onSxubmit' //2回目以降のバリデーション実行タイミング
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
          <div>{watch('email')}</div>
          {/* <div>{getValues('email')}</div> */}
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
        <button type="submit" disabled={!isDirty || !isValid}>
          ログイン
        </button>
        <button type="button" onClick={() => trigger()}>
          バリデーション
        </button>
      </form>
    </div>
  );
}

export default App;