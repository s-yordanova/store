import React, {  useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../../components/Announcement";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";
import box from "../payCash/sealed-kawaii-animated-cardboard-box-in-colorful-vector-19333636.jpg";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: inherit;
  margin-top: 10px;
  padding-bottom: 30px;
  padding: 20px 100px;
  ${mobile({ padding: "20px 25px", width: "85%" })}
`;
const FormWrapper = styled.div`
  flex: 1;
  padding: 20px;
  border: 0.5px solid lightgrey;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 20px 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin: 10px;
  ${mobile({ margin: "2px", fontSize: "18px" })}
`;

const Label = styled.label`
  margin-bottom: 5px;
  margin-top: 20px;
  font-size: 18px;
`;

const BoxContainer = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 400px;
  height: 500px;
  ${mobile({ display: "none"})}
`;

const Button = styled.button`
  width: 35%;
  border: none;
  margin-top: 20px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
 color:red;
`;

const PayCash = () => {
  const location = useLocation();
  const cart = location.state.products;
  const discount = location.state.code;
  const [input, setInput] = useState({});
  const [errors, setError] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation();

  
  const onInputChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };



  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (input.name && input.phone && input.address) {
        const data = {
            name: input.name,
            phone: input.phone,
            billing_details:{address: input.address},
        }
        navigate("/success", {
            state: {
              stripeData: data,
              products: cart,
              isPaid: false,
              code: discount,
            },
          });
    } else {
      setError(true);
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Categories />
      <Wrapper>
        <FormWrapper>
          <Title>{t("Информация за поръчката")}</Title>
          <Form>
            <Label>{t("Full Name")}</Label>
            <input
              name="name"
              className="inputAccount"
              type="text"
              placeholder="name"
              onChange={onInputChange}
            ></input>
            <Label>{t("Phone")}</Label>
            <input
              name="phone"
              className="inputAccount"
              type="phone"
              placeholder="phone"
              onChange={onInputChange}
            ></input>
            <Label>{t("Address")}</Label>
            <input
              name="address"
              className="inputAccount"
              type="text"
              placeholder="address"
              onChange={onInputChange}
            ></input>
            <Button onClick={handleSubmit}>{t("Поръчай")}</Button>
          </Form>
          {errors && <Error>{t("Попълнете всички полета!")}</Error>}
        </FormWrapper>
        <BoxContainer>
          <Image src={box}></Image>
        </BoxContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default PayCash;
