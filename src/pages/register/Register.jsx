import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/apiCalls";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://wallpaperaccess.com/full/7151647.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Agreement = styled.span`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
`;

const Register = () => {
  // handle password eye
  const [passwordEye, setPasswordEye] = useState(false);
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const { isFetching, error, success } = useSelector((state) => state.user);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setError] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = t("Please enter Email.");
          } else if (emailRegex.test(value) === false) {
            stateObj[name] = t("Please enter valid Email.");
          }
          break;
        case "username":
          if (!value) {
            stateObj[name] = t("Please enter Username.");
          } else if (value.length > 30 || value.length < 8) {
            stateObj[name] = t("Username between 8 and 30 char.");
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = t("Please enter Password.");
          } else if (value.length < 8) {
            stateObj[name] = t("Password should be at least 8 char.");
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              t("Password and Confirm Password does not match.");
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = t("Please enter Confirm Password.");
          } else if (input.password && value !== input.password) {
            stateObj[name] = t("Password and Confirm Password does not match.");
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      !errors.email &&
      !errors.username &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      const user = {
        ...input,
      };
      delete user.confirmPassword;
      register(dispatch, user);
    }
  };

  const Error = styled.span`
    color: red;
  `;

  const Success = styled.span`
    color: green;
  `;

  return (
    <Container>
      <Wrapper>
        <Title>{t("СЪЗДАЙ АКАУНТ")}</Title>
        <Form>
          <div className="outerDiv">
            <input
              className="inputRegular"
              name="email"
              placeholder={t("имейл")}
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            <p className="pColor" >{errors.email && <span className="err">{errors.email}</span>}</p>
          </div>
          <div className="outerDiv">
            <input
              className="inputRegular"
              name="username"
              placeholder={t("потребителско име")}
              value={input.username}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            <p className="pColor">
              {errors.username && (
                <span className="err">{errors.username}</span>
              )}
            </p>
          </div>

          <div className="outerDiv">
            <div className="containerPassword">
              <input
                className="password"
                name="password"
                placeholder={t("парола")}
                type={passwordEye === false ? "password" : "text"}
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput}
              />

              <Icon className="icon">
                {passwordEye === false ? (
                  <VisibilityOff onClick={handlePasswordClick} />
                ) : (
                  <Visibility onClick={handlePasswordClick} />
                )}
              </Icon>
            </div>
            <p className="pColor">
              {errors.password && (
                <span className="err">{errors.password}</span>
              )}
            </p>
          </div>

          <div className="outerDiv">
            <div className="containerPassword">
              <input
                className="password"
                name="confirmPassword"
                placeholder={t("потвърди парола")}
                type={passwordEye === false ? "password" : "text"}
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}
              />

              <Icon className="icon">
                {passwordEye === false ? (
                  <VisibilityOff onClick={handlePasswordClick} />
                ) : (
                  <Visibility onClick={handlePasswordClick} />
                )}
              </Icon>
            </div>
            <p className="pColor">
              {errors.confirmPassword && (
                <span className="err">{errors.confirmPassword}</span>
              )}
            </p>
          </div>
          <Agreement>
            {t("Със създаването на този профил, приемам личната ми информация да се обработва в съответствие с")} 
            <b>{t("ПРАВИЛАТА ЗА ПОВЕРИТЕЛНОСТ")}</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>
            {t("СЪЗДАЙ")}
          </Button>
          {error && <Error>t("Нещо се обърка..")</Error>}
          {success && <Success>t("Успешна регистрация!")</Success>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
