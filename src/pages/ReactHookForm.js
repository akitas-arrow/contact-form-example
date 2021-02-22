import React from 'react'
import { useForm } from 'react-hook-form'
import {navigate} from 'gatsby'

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};


function ReactHookForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(data)
    })
      .then(() => navigate("/thanks/"))
      .catch(() => console.log("お問い合わせに失敗しました"));
  };
  // const onSubmit = data => console.log(data);

  // console.log(watch("name"));
  return (
    <form
      name="contact-form"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)}
      >
      <input type="hidden" name="form-name" />
      <input type="hidden" name="bot-field" />
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
