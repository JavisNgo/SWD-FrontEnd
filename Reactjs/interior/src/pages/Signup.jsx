import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Signin } from './Signin';
import axios from 'axios';

export const Signup = () => {
    let navigate = useNavigate()
    return (
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                        <Formik
                            initialValues={{
                                username: '',
                                name: '',
                                email: '',
                                address: '',
                                phoneNumber: '',
                                password: '',
                                role: ''
                            }}
                            validationSchema={Yup.object({
                                username: Yup.string().max(100, 'Username must be 100 characters or less').required('Required'),
                                name: Yup.string().max(100, 'Full Name must be 100 characters or less').required('Required'),
                                email: Yup.string().email('Invalid email address').required('Required'),
                                address: Yup.string().max(100, 'Address must be 100 characters or less').required('Required'),
                                phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Required'),
                                password: Yup.string().min(10, 'Password must be at least 10 characters')
                                    .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                                        'Password must contain at least one uppercase letter, one lowercase letter, and one number')
                                    .required('Required'),
                                role: Yup.string().required('Please select a role')
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                axios.post('https://localhost:7233/api/v1/accounts/register', values)
                                    .then(response => {
                                        if(response.status === 200) {
                                            navigate('/Signin')
                                        }
                                    })
                                    .catch(error => {
                                        // Xử lý lỗi (nếu có)
                                        console.error('Error creating account:', error);
                                    })
                                    .finally(() => {
                                        setSubmitting(false);
                                    });
                                // setTimeout(() => {
                                //     alert(JSON.stringify(values, null, 2));
                                //     setSubmitting(false);
                                // }, 400);
                            }}
                        >
                            <Form>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <a href="index.html">
                                        <h3 className="text-primary"><i className="fa fa-hashtag me-2" />MULTY INTERIOR</h3>
                                    </a>
                                    <h3>Sign Up</h3>
                                </div>
                                <div className="form-floating mb-3">
                                    <label htmlFor="username">Username</label>
                                    <Field type="text" name="username" id="username" className="form-control" />
                                    <ErrorMessage name="username" component="div" className="text-danger" />
                                </div>
                                <div className="form-floating mb-3">
                                    <label htmlFor="fullName">Full Name</label>
                                    <Field type="text" name="name" id="name" className="form-control" />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </div>
                                <div className="form-floating mb-3">
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" id="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="form-floating mb-3">
                                    <label htmlFor="address">Address</label>
                                    <Field type="text" name="address" id="address" className="form-control" />
                                    <ErrorMessage name="address" component="div" className="text-danger" />
                                </div>
                                <div className="form-floating mb-3">
                                    <label htmlFor="phoneNumber">PhoneNumber</label>
                                    <Field type="text" name="phoneNumber" id="phoneNumber" className="form-control" />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                                </div>
                                <div className="form-floating mb-4">
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" name="password" id="password" className="form-control" />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>
                                <div className="form-floating mb-3">
                                    <label htmlFor="role">Role</label>
                                    <Field as="select" name="role" id="role" className="form-control">
                                        <option value="" disabled>You are:</option>
                                        <option value="CUSTOMER">Customer</option>
                                        <option value="CONTRACTOR">Contractor</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="text-danger" />
                                </div>
                                {/**Nút submit */}
                                <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign Up</button>
                                <p className="text-center mb-0">Already have an Account? <Link to="/Signin" type="button">Sign in</Link></p>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};
