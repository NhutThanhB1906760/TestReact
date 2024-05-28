import React, { useContext, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const auth = useAuth()
    useEffect(() => {
        console.log(auth);

    }, [auth])
    const inforLogin = useRef()
    const navigate = useNavigate()
    const submitLogin = (value) => {
        // fetch('https://fakestoreapi.com/auth/login', {
        //     method: 'POST',
        //     body: inforLogin.current
        // })
        //     .then(res => res.json())
        //     .then(json => console.log(json))
        auth.logIn(value)
        navigate('/')
    }
    return (
        <>
            <h1 className='d-flex justify-content-center text-uppercase'>đăng nhập</h1>
            {/* <p>{auth}</p> */}
            <Formik
                initialValues={{ email: '', password: '', gender: '', checkbox: false, }}
                validationSchema={Yup.object({
                    // email: Yup.string().required('Nhập eamil'),
                    // gender: Yup.string().required('chọn gt'),
                    // checkbox: Yup.boolean()
                    //     .oneOf([true], 'You must accept the terms and conditions')
                    //     .required('Required'),
                    // password: Yup.string().min(6, 'Must be at least 6 characters').required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(values);
                        setSubmitting(false);
                        submitLogin(values)
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='container '>
                        <div >
                            <label htmlFor="email" class="form-label">Email</label>
                            <Field type="text" name="email" id='email' className="form-control" ref={inforLogin} />
                            <ErrorMessage name="email" className='text-danger' component="div" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className="form-control" ref={inforLogin} />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        {/* <label>
                            <Field name="acceptTerms" type="checkbox" value="0" ref={inforLogin}/>
                            0
                        </label>
                        <label>
                            <Field name="acceptTerms" type="checkbox" value="1" ref={inforLogin} />
                            1
                        </label> */}

                        {/* <label>
                            <Field name="gender" type="radio" value="male" />
                            Male
                        </label>
                        <label>
                            <Field name="gender" type="radio" value="female" />
                            Female
                        </label>
                        <ErrorMessage name="gender" component="div" />

                        <div>
                            <label htmlFor="country">Country</label>
                            <Field as="select" name="country">
                                <option value="" label="Select country" />
                                <option value="usa" label="USA" />
                                <option value="canada" label="Canada" />
                                <option value="uk" label="UK" />
                            </Field>
                            <ErrorMessage name="country" component="div" />
                        </div> */}

                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" disabled={isSubmitting} className='btn btn-primary  '>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

        </>

    );
};

export default Login;
