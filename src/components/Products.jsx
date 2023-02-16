import { useEffect, useState } from "react";
import styled from "styled-components"
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const Products = ({mainCat,cat,filters,sort}) => {

  const [products,setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async () => {
      try{
        const res = await axios.get(cat ? `${process.env.REACT_APP_API_URL}/products/${mainCat}/?category[]=${cat}&category[]=${mainCat}` 
        : `${process.env.REACT_APP_API_URL}/products/p` );
        setProducts(
          res.data.filter((item) => {
            return item.inStock && item.quantity > 0;
          })
        );
      }catch(err){

      }
    };
    getProducts();
  },[mainCat,cat]);


  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => 
        Object.entries(filters).every(([key,value])=>
          item[key].includes(value)
        )
      )
    );
  },[products,cat,filters]);

  useEffect(() => {
    if(sort === "newest"){
      setFilteredProducts(prev =>
        [...prev].sort((a,b) => a.createdAt - b.createdAt)
        );
    } else if ((sort === "asc")){
      setFilteredProducts(prev =>
        [...prev].sort((a,b) => a.price - b.price)
        );
    } else {
      setFilteredProducts(prev =>
        [...prev].sort((a,b) => b.price - a.price)
        );
    }
  },[sort]);

  return (
    <Container>
        {cat? filteredProducts.map(item => (
            <Product item = {item} key = {item._id}/>
        )) : products.slice(0,5).map(item => (
          <Product item = {item} key = {item._id}/>
      ))}
    </Container>
  )
}

export default Products

