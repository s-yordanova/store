import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import RelatedProducts from "../components/RelatedProducts";
import { useTranslation } from "react-i18next";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })};
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  border: ${props => props.border ? "2px solid black" : "1px solid gray"};
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const RelatedWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  ${mobile({ padding: "10px", flexDirection: "column" })};
`;

const TitleRelated = styled.h1`
  font-weight: 600;
  padding: 0 20px 20px 20px ;
`;

const Error = styled.p`
  color: red;
  margin-top: 10px ;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState(false);
  const [activeButton, setActive] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    //update cart
    if(color && size){
      setError(false);
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  } else {
    setError(!error);
  }

  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Categories />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc} </Desc>
          <Price>{product.price} BGN</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>{t("Цвят")}</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor border={activeButton} color={c} key={c} onClick={() =>{setActive(!activeButton); setColor(c);}} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>{t("Размер")}</FilterTitle>
              <FilterSize onClick={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption  key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>{t("ДОБАВИ В КОЛИЧКА")}</Button>
          </AddContainer> 
          { error && <Error>{t("Не сте избрали цвят или размер...")}</Error>}
        </InfoContainer>
      </Wrapper>
      <RelatedWrapper>
      <TitleRelated>{t("Може да харесате също...")}</TitleRelated>
      <RelatedProducts product={product}/>
      </RelatedWrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
