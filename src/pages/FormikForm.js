import React from 'react'
import {navigate} from 'gatsby'
import { Formik, Form, Field, ErrorMessage} from 'formik'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function FormikForm() {
  return (
    <Formik
      initialValues={{
        name:'',
        email:'',
        message:'',
        privacy:false,
      }}
      onSubmit={
        (values, actions) => {
          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact-form", ...values })
          })
          .then(() => {
            // alert('Success');
            actions.resetForm()
            navigate('/thanks/')
          })
          .catch(() => {
            alert('Error');
          })
          // .finally(() => actions.setSubmitting(false))
        }
      }
      validate={values => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const errors = {};
        if(!values.name) {
          errors.name = 'お名前を入力してください'
        }
        if(!values.email || !emailRegex.test(values.email)) {
          errors.email = 'メールアドレスを入力してください'
        }
        if(!values.message) {
          errors.message = 'お問い合わせ内容を入力してください'
        }
        if(!values.privacy) {
          errors.privacy = 'チェックしてください'
        }
        return errors;
      }}
    >
      {() => (
        <Form
          name="contact-form"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <Field type="hidden" name="form-name" />
          <Field type="hidden" name="bot-field" />
          <div>
            <label htmlFor="name">Name: </label>
            <Field name="name" />
            <ErrorMessage name="name" />
          </div>

          <div>
            <label htmlFor="email">Email: </label>
            <Field name="email" />
            <ErrorMessage name="email" />
          </div>

          <div>
            <label htmlFor="message">Message: </label>
            <Field name="message" component="textarea"/>
            <ErrorMessage name="message" />
          </div>

          <div>
            <Field name="privacy" type="checkbox"/>
            <label htmlFor="privacy">同意する </label>
            <ErrorMessage name="privacy" />
          </div>

          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikForm
