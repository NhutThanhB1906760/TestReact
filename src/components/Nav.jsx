import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function () {
    const auth = useAuth()


    return (
        <div>
            {auth.auth ? <button onClick={() => auth.logOut()} className='btn btn-danger'>Log Out</button>
                : null
            }

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Thêm user
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <Formik
                                initialValues={{ name: '', job: '' }}
                                validationSchema={Yup.object({
                                    name: Yup.string().required('Nhập name'),
                                    job: Yup.string().min(6, 'Must be at least 6 characters').required('Required')
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        console.log(values);
                                        setSubmitting(false);
                                        fetch('https://reqres.in/api/users',{method:'POST', body:values})
                                            .then(res => {
                                                if(res.ok){
                                                    alert("Thêm thành công")
                                                }
                                                else alert("Thêm thất bại")
                                                res.json
                                            }) 
                                            .then(json => {
                                                
                                                console.log(json);
                                            })
                                    }, 400);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className='container '>
                                        <div >
                                            <label htmlFor="email" class="form-label">Name</label>
                                            <Field type="text" name="name" id='email' className="form-control" />
                                            <ErrorMessage name="name" className='text-danger' component="div" />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Job</label>
                                            <Field type="text" name="job" className="form-control" />
                                            <ErrorMessage name="job" component="div" className='text-danger' />
                                        </div>

                                        <div className="d-flex justify-content-center mt-3">
                                            <button type="submit" disabled={isSubmitting} className='btn btn-primary  '>
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
