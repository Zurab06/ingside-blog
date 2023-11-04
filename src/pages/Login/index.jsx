import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { isAuth, fetchUser } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const authIs = useSelector(isAuth);
  const dispatch = useDispatch();
  console.log(authIs);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchUser(values));
    if (!data.payload) {
      console.log("не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (authIs) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          className={styles.field}
          label="E-Mail"
          {...register("email", { required: "укажите email" })}
          helperText={errors.email?.message}
          error={Boolean(errors.email?.message)}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "введите пароль" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
