import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { login, resetFailSucc } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
        ), 
        url("https://wallpaperaccess.com/full/7151665.jpg")center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%"})}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;


const Form = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;



const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;

    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`;

const StyledLink = styled(Link)`
    margin: 5px 0 ;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;

    &:visited{
    color: black;
  }
`;

const Error = styled.span`
    color:red;
`;

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user);
  const {t} = useTranslation();

  const handleLogin = (e) =>{
    e.preventDefault();
    login(dispatch, { username, password });
  }

  const resetFailSuc = () =>{
    resetFailSucc(dispatch);
  }

  return (
    <Container>
    <Wrapper>
        <Title>{t("ВХОД")}</Title>
        <Form>
            <Input placeholder = {t("потребителско име")} 
            onChange={ (e) => setUserName(e.target.value) }/>
            <Input placeholder = {t("парола")}
            type = "password"
            onChange={ (e) => setPassword(e.target.value) }/>
            <Button onClick={handleLogin} disabled={isFetching}>{t("ВХОД")}</Button>
            {error && <Error>{t("Невалидни данни..")}</Error>}
            <StyledLink to="/" >{t("ЗАБРАВЕНА ПАРОЛА?")}</StyledLink>
            <StyledLink to="/register" onClick={resetFailSuc}>{t("СЪЗДАЙ НОВ ПРОФИЛ?")}</StyledLink>
        </Form>
    </Wrapper>
</Container>
  )
}

export default Login