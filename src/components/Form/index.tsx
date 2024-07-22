import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import './styles.css';
import { useState } from "react";

const Form = () => {

    const [wasSubmitted, setWasSubmitted] = useState(false);

    const validationSchema = yup.object().shape({
        name: yup
            .string().trim().required('Name is required.')
            .matches(/^[a-zA-Z\s]+$/, 'Must only contain letters'),
        email: yup
            .string().trim().required('Email is required.')
            .email('Enter a valid email'),
        password: yup
            .string().required('Password is required.')
            .min(8, 'Password should be of minimum 8 characters length')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                'Must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            ),
        confirmPassword: yup
            .string().required('Password confirmation is necessary.')
            .oneOf([yup.ref('password')], 'Passwords don\'t match.')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setWasSubmitted(true)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Typography variant="h4" sx={{
                marginBottom: '12px'
            }}>
                Register User
            </Typography>
            <div className="form-div">
                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />

                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>

                {wasSubmitted && (
                    <Typography variant='body1'>
                        Thanks for your submission.
                    </Typography>
                )}

            </div>
        </form>
    )
}

export default Form;