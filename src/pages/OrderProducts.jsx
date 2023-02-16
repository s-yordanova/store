import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 20px;
  ${mobile({ margin: "2px", fontSize: "18px" })}
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const Tr = styled.tr`
`;

const Th = styled.th`
  text-align: left;
`;

const Td = styled.td`
  font-weight: 300;
`;

const ImgTitle = styled.div`
display:  flex;
align-items: center;
`;

const Image = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
`;

const OrderProducts = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const user = useSelector((state) => state.user.currentUser);
  const orderId = location.pathname.split("/")[2];
  const [order, setOrder] = useState({});
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`orders/take/${user._id}/${orderId}`);
        setOrder(res.data);
      } catch {}
    };
    getOrders();
  }, [orderId]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        order.products.map(async (item) => {
          let res = await userRequest.get(`products/find/${item.productId}`);
          setOrderedProducts((oldArray) => [
            ...oldArray,
            {
              ...res.data,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
            },
          ]);
        });
      } catch {}
    };
    orderedProducts.length <= 0 && getProducts();
  }, [order, orderedProducts]);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Categories />
      <Wrapper>
        <InfoContainer>
          <TitleContainer>
            <Title>{t("Продукти към поръчката")}</Title>
          </TitleContainer>
          <Table>
            <Tr>
              <Th>{t("Наименование")}</Th>
              <Th>{t("Размер")}</Th>
              <Th>{t("Цвят")}</Th>
              <Th>{t("Брой")}</Th>
            </Tr>
            {orderedProducts.map((product) => (
              <Tr key={product._id}>
                <Td>
                  <ImgTitle>
                    <Image
                      src={product.img}
                    />
                    {product.title}
                  </ImgTitle>
                </Td>
                <Td>{product.size}</Td>
                <Td>{product.color}</Td>
                <Td>{product.quantity}</Td>
              </Tr>
            ))}
          </Table>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default OrderProducts;
