import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, resetFailSucc } from "../redux/apiCalls";
import { removeCart } from "../redux/cartRedux";
import ListSearch from "./ListSearch";
import axios from "axios";
import { useTranslation } from "react-i18next";
//import { removeCart } from "../redux/cartRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const Select = styled.select`
  border: 0px;
  outline: 0px;
  scroll-behavior: smooth;
`;

const Option = styled.option`
  border: none;
  &:active {
    outline: none;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  margin-left: 25px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  ${mobile({ margin: "2px", fontSize: "14px" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:visited {
    color: black;
  }
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("language"));

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [ i18n, language]);

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(dispatch);
    dispatch(removeCart());
  };

  const handleReset = () => {
    resetFailSucc(dispatch);
  };

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/products/search?q=${query}`
      );
      setData(res.data);
    };
    if (query.length !== 0 || query.length > 2) fetchData();
  }, [query]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>
            <Select
            defaultValue={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                localStorage.setItem("language", e.target.value);
              }}
            >
              <Option value="bg">BG</Option>
              <Option value="en">EN</Option>
            </Select>
          </Language>
          <ResultContainer>
            <SearchContainer>
              <Input
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
            {<ListSearch data={data} query={query} />}
          </ResultContainer>
        </Left>
        <Center>
          <StyledLink to="/">
            {" "}
            <Logo>Archer</Logo>{" "}
          </StyledLink>
        </Center>
        <Right>
          {user ? (
            <StyledLink to="/account">
              {" "}
              <MenuItem> {t("ПРОФИЛ")}</MenuItem>{" "}
            </StyledLink>
          ) : null}
          {user ? (
            <StyledLink to="/" onClick={handleLogout}>
              {" "}
              <MenuItem>{t("ИЗХОД")} </MenuItem>{" "}
            </StyledLink>
          ) : null}
          {!user ? (
            <StyledLink to="/register">
              {" "}
              <MenuItem>{t("РЕГИСТРАЦИЯ")}</MenuItem>{" "}
            </StyledLink>
          ) : null}
          {!user ? (
            <StyledLink to="/login" onClick={handleReset}>
              {" "}
              <MenuItem>{t("ВХОД")}</MenuItem>{" "}
            </StyledLink>
          ) : null}
          <StyledLink to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
