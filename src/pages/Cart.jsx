import { Add, Delete, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";
import { decQuantity, incQuantity, removeProduct } from "../redux/cartRedux";
import { useTranslation } from "react-i18next";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ whileSpace: "wrap", margin: "5px" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 150px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 5px 0;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Form = styled.form`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 120px;
  padding: 10px;
  background-color: black;
  color: white;
  white-space: nowrap;
  font-weight: 600;
  cursor: pointer;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: self-end;
  justify-content: center;
  padding-right: 50px;
  ${mobile({
    margin: "5px 15px",
    padding: "0",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  })}
`;

const ProductAmountContainer = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductAmount = styled.span`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
  text-decoration: ${(props) => props.sale && "line-through"};
  ${mobile({ marginBottom: "20px" })}
`;

const ProductDelete = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  ${mobile({ margin: "0 , 0" })}
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PriceSale = styled.span`
  font-weight: 600;
  font-size: 30px;
  padding-left: 10px;
  color: ${(props) => props.sale && "red"};
`;

const Error = styled.p`
  color: red;
`;

const ErrorProduct = styled.h2`
color:red;
text-align: center;
`;

const Cart = () => {
  const KEY = process.env.REACT_APP_STRIPE;
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paid, setPaid] = useState(false);
  const [input, setInput] = useState({});
  const [error, setError] = useState(false);
  const [codeValue, setCodeValue] = useState(0);
  const { t } = useTranslation();
  const [prodInStock, setProdStock] = useState(true);
  const [productOutStock, setProductOut] = useState("");

  const onInputChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const productsCheck = () => {
    return new Promise((resolve, reject) => {
      cart.products.map(async (item) => {
        const res = await userRequest.get(`products/find/${item._id}`);
        if (res.data.quantity < 1 || res.data.quantity < item.quantity) {
          setProdStock(false);
          setProductOut(item);
          resolve(false);
          return;
        }
        else{
          resolve(true)
        }
      });
  })
  }

  const onToken = async (token) => {
    const result = await productsCheck();  
    if (result) {
      setStripeToken(token);
    }
  };

  useEffect(() => {
   const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });

        navigate("/success", {
          state: {
            stripeData: res.data,
            products: cart,
            isPaid: paid,
            code: codeValue,
          },
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, cart, navigate, paid, codeValue]);

  const onCashPayment = async (e) => {
    const result = await productsCheck();  
    if (!user) {
      navigate("/login");
    } else if (cart.total > 0 && user && result) {
      navigate("/cash", {
        state: {
          products: cart,
          code: codeValue,
        },
      });
    }
  };

  const codeCheck = async (e) => {
    e.preventDefault();
    let res = null;
    try {
      if (input) {
        res = await userRequest.get("code/" + input.code);
        if (res.status === 200) {
          setCodeValue(await res.data[0].persentage);
          setError(false);
        }
      }
    } catch {
      setError(true);
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Categories />
      <Wrapper>
        <Title>{t("ТВОЯТА КОЛИЧКА")}</Title>
        <Top>
          <TopButton>{t("ПРОДЪЛЖИ ДА ПАЗАРУВАШ")}</TopButton>
          <TopTexts>
            <TopText>{t("Количка")} (2)</TopText>
            <TopText>{t("Любими")} (0)</TopText>
          </TopTexts>
          <TopButton type="filled">{t("ИЗПРАЗНИ КОЛИЧКА")}</TopButton>
        </Top>
        <Bottom>
          <Info>
          {!prodInStock && <ErrorProduct>ПОРЪЧКАТА Е НЕУСПЕШНА! БРОЙКАТА НА ПРОДУКТЪТ {productOutStock.title} Е ОГРАНИЧЕНА!</ErrorProduct>}
            {cart.products.map((product) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>{t("Продукт")}:</b>
                        {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b>
                        {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>{t("Размер")}:</b>
                        {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductDelete>
                      {" "}
                      <Delete
                        onClick={() => {
                          dispatch(removeProduct(product._id));
                        }}
                      />
                    </ProductDelete>
                    <ProductAmountContainer>
                      <Add
                        onClick={() => {
                          dispatch(incQuantity(product._id));
                        }}
                      />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove
                        onClick={() => dispatch(decQuantity(product._id))}
                      />
                    </ProductAmountContainer>
                    <PriceContainer>
                      <ProductPrice sale={product.onSale}>
                        {product.onSale
                          ? product.price * 2 * product.quantity
                          : product.price * product.quantity}{" "}
                        лв.
                      </ProductPrice>
                      {product.onSale && (
                        <PriceSale sale={product.onSale}>
                          {product.price * product.quantity}
                          лв.
                        </PriceSale>
                      )}
                    </PriceContainer>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>{t("Общо")}:</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>{t("Междинна сума")}:</SummaryItemText>
              <SummaryItemPrice>{cart.total} лв.</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>{t("Доставка")}:</SummaryItemText>
              <SummaryItemPrice>5.00 лв.</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>{t("Отстъпка")}:</SummaryItemText>
              <SummaryItemPrice>-5.00 лв.</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>{t("Общо")}:</SummaryItemText>
              <SummaryItemPrice>
                {codeValue > 0
                  ? (1 - codeValue / 100) * cart.total
                  : cart.total}{" "}
                лв.
              </SummaryItemPrice>
            </SummaryItem>
            <Form>
              <FormInput>
                <input
                  name="code"
                  type="text"
                  placeholder={t("Код за отстъпка")}
                  onChange={onInputChange}
                ></input>
                {codeValue <= 0 && (
                  <Button onClick={codeCheck}>{t("ПРИЛОЖИ")}</Button>
                )}
              </FormInput>
              {error && <Error>{t("Невалиден код...")}</Error>}
            </Form>

            <ButtonWrapper>
              {user && (
                <StripeCheckout
                  name="Archer"
                  image=""
                  billingAddress
                  shippingAddress
                  description={`Твоята обща сума е ${
                    codeValue > 0
                      ? (1 - codeValue / 100) * cart.total
                      : cart.total
                  } лв.`}
                  amount={
                    codeValue > 0
                      ? (1 - codeValue / 100) * cart.total * 100
                      : cart.total * 100
                  }
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button
                    onClick={(e) => {
                      setPaid(true);
                    }}
                  >
                    {t("ПЛАТИ С КАРТА")}
                  </Button>
                </StripeCheckout>
              )}
              <Button onClick={onCashPayment}>{t("ПЛАТИ В БРОЙ")}</Button>
            </ButtonWrapper>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
