import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { authIs, fetchUserData } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(authIs)
  const dispatch = useDispatch()
  console.log(isAuth);
  const {register,handleSubmit,setError,formState:{errors,isValid}} = useForm({
    defaultValues:{
      email: '',
      password: ''
    }
  })
const onSubmit = (values)=>{
 dispatch(fetchUserData(values))
}
if(isAuth){
  return <Navigate to='/'/>
  
}
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
   <form onSubmit={handleSubmit(onSubmit)} >
   <TextField
   type="email"
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required: 'укажите почту'})}
        fullWidth
      />
      <TextField className={styles.field}
      
       label="Пароль"
       error={Boolean(errors.password?.message)}
       helperText={errors.password?.message}
        {...register('password', {required: 'укажите пароль'})} fullWidth />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Войти
      </Button>
   </form>
    </Paper>
  );
};
