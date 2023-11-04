import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { isAuth, logOut } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const authIs = useSelector(isAuth);
  const onClickLogout = () => {
    if (window.confirm("действительно хотите выйти?")) {
      dispatch(logOut());
      localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ingside</div>
          </Link>
          <div className={styles.buttons}>
            {authIs ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/registration">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
