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
      body: encode({"form-name": "contact-form",...data})
    })
      .then(() => navigate("/thanks/"))
      .catch(() => console.log("お問い合わせに失敗しました"));
  };
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
        <label>
          お名前
          <input name="name" ref={register({ required: 'お名前を入力してください'})} />
          {errors.name && errors.name.message}
        </label>
      </div>
      <div>
        <label>
          フリガナ
          <input
            name="furigana"
            ref={register({
              required: 'お名前を入力してください',
              pattern:{
                value: /^[ァ-ヶー　]+$/,
                message: '全角カタカナで入力してください'
              }
            })}
          />
          {errors.furigana && errors.furigana.message}
        </label>
      </div>
      <div>
        <label>
          メールアドレス
          <input name="email" ref={register({ required: true })} />
          {errors.email && <span>メールアドレスは入力必須項目です</span>}
        </label>
      </div>
      <div>
        <label>
          電話番号
          <input name="tel" ref={register({ required: true })} />
          {errors.tel && <span>電話番号は入力必須項目です</span>}
        </label>
      </div>
      <div>
        <label>
          会社名
          <input name="company-name" ref={register} />
        </label>
      </div>
      <div>
        <label>
          郵便番号
          <input name="postal-code" ref={register} />
        </label>
      </div>
      <div>
        <label>
          住所
          <input name="address" ref={register} />
        </label>
      </div>
      <div>
        <label>
          お問い合わせ内容
          <textarea name="message" ref={register({ required: true })} />
          {errors.message && <span>お問い合わせ内容は入力必須項目です</span>}
        </label>
      </div>
      <div>
        <label>
          同意する
          <input type="checkbox" name="privacy" ref={register({ required: true })} />
          {errors.privacy && <span>チェックをしてください</span>}
        </label>
      </div>
      <input type="submit" />
    </form>
  )
}

export default ReactHookForm
