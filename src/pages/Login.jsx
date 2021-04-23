import React from 'react'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import handleApi from '../api/handleApi'

export default function Login({ history, setIsAuthenticated }) {

  const login = (values, { setSubmitting, resetForm }) => {
    const formdata = new FormData();
    formdata.append("email", values.email);
    formdata.append("password", values.password);

    handleApi('/auth/login', 'post', false, formdata)
    .then(res => {
      if(res.data.status === 0){
        resetForm()
        setSubmitting(false)
        return toast.error(res.data.message)
      }
      if(res.data.status === 1){
        localStorage.setItem('assignment_token', res.data.data.token)
        setIsAuthenticated(true)
        history.push('/home')
        return toast.success('Logged in successfully!')
      }
    })
  }

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => login(values, { setSubmitting, resetForm })});

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <form className="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 m-auto" onSubmit={handleSubmit} noValidate>
        <h1 className="h1 mb-3 text-center font-weight-bold text-uppercase">login</h1>
        <div className="mb-2">
          <input 
            type="email" 
            className="form-control"
            placeholder="example@gmail.com"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="mb-2">
          <input 
            type="password" 
            className="form-control"
            placeholder="123456" 
            name="password" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.password} 
          />
          {errors.password && touched.password && <span className="error">{errors.password}</span>}
        </div>
        <button 
          type="submit" 
          className="w-100 btn btn-lg btn-primary" 
          disabled={isSubmitting}
        >Sign in</button>
      </form>
    </div>
  )
}
