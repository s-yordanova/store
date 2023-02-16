import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import styled from "styled-components";

const Container = styled.div`
 height: 100vh;
 display: flex;
 flex-direction: column;
 align-items: center;
justify-content: center;
`;

const Image = styled.img`
  height: 400;
  width: 500px;
  border-radius: 50%;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  margin-top: 20px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:visited {
    color: black;
  }
`;

const Success = () => {
  const location = useLocation();
 const data = location.state.stripeData;
  const cart = location.state.products;
  const isPaid = location.state.isPaid;
  const discount = location.state.code;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const [prodInStock, setProdStock] = useState(true);

  


 useEffect(() => {
  const productsCheck = () => {
    return new Promise((resolve, reject) => {
      cart.products.map(async (item) => {
        var today= new Date();
         console.log(today);
        const res = await userRequest.get(`products/find/${item._id}`);
        if (res.data.quantity < 1 || res.data.quantity < item.quantity) {
          setProdStock(false);
          reject(false);
          return;
        }
        else{
          const res= await userRequest.put(`/products/quantity/${item._id}`,{quantity: item.quantity});
          resolve(true)
        }
      });
  })
  }
    const createOrder = async () => {
      try {
        const checkForUpdate = await productsCheck();
        if(checkForUpdate){
         // cart.products.map(async (item) => {
         //   const res= await userRequest.put(`/products/quantity/${item._id}`,{quantity: item.quantity});
        // });
            const res = await userRequest.post("/orders", {
              userId: currentUser._id,
              fullName: data.name || "",
              phone: data.phone || "",
              products: cart.products.map((item) => ({
                productId: item._id,
                quantity: item._quantity,
                size: item.size,
                color: item.color,
              })),
              amount: discount>0? (1-discount/100) * cart.total  : cart.total,
              address: data.billing_details.address,
              paid: isPaid,
            });
            setOrderId(res.data._id);
  
        }
        else{
          console.log("Ima izcherpan product!");
        }
        
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser, isPaid, discount]);

  return (
    <Container>
      {orderId
        ? <Image src="https://freedesignfile.com/upload/2018/12/Cartoon-hand-drawn-cute-gift-box-vector.jpg"/>
        : <Image src="https://static.vecteezy.com/system/resources/previews/006/786/094/original/sad-cardboard-character-inside-the-box-cartoon-illustration-isolated-object-free-vector.jpg"/>}
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Sorry, something went wrong...`}
      <StyledLink to="/">
        <Button >Go to Homepage</Button>
      </StyledLink>
    </Container>
  );
};

export default Success;
