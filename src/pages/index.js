import React from "react"
import { Formik, Form, Field, ErrorMessage} from 'formik'

export default function Home() {
  return (
    <Formik
      initialValues={{
        name:'',
        email:'',
        message:'',
        privacy:false,
      }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
      validate={values => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const errors = {};
        if(!values.name) {
          errors.name = 'Name Required'
        }
        if(!values.email || !emailRegex.test(values.email)) {
          errors.email = 'Valid Email Required'
        }
        if(!values.message) {
          errors.message = 'Message Required'
        }
        if(!values.privacy) {
          errors.privacy = 'Check Required'
        }
        return errors;
      }}
    >
      {() => (
        <Form>
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
