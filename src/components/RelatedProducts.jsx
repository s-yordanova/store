import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const RelatedProducts = ({ product, cat }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products/main/?category=${cat}`
            : `http://localhost:5000/api/products/main/?category=${product.categories[1]}`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [product, cat]);

  useEffect(() => {
    if (product) {
      setFilteredProducts(
        products.filter((item) => {
          return item._id !== product._id;
        })
      );
    } else {
      setFilteredProducts(
        products.filter((item) => {
          return item.onSale;
        })
      );
    }
  }, [product, products]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default RelatedProducts;
