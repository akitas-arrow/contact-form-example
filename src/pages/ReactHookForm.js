import React from 'react'
import { useForm } from 'react-hook-form'

function ReactHookForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("name"));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">お名前</label>
        <input name="name" ref={register({ required: true})} />
        {errors.name && <span>お名前は入力必須項目です</span>}
      </div>
      <div>
        <label htmlFor="furigana">フリガナ</label>
        <input name="furigana" ref={register({ required: true })} />
      </div>
      <div>
        <label htmlFor="address">住所</label>
        <input name="address" ref={register} />
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input name="email" ref={register({ required: true })} />
      </div>
      <input type="submit" />
    </form>
  )
}

export default ReactHookForm
