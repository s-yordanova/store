import {
  FavoriteBorder,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div``;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const ItemContainer = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  /* width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;*/
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;

  ${mobile({ zIndex: "0" })}
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const DescContainer = styled.div`
 padding: 10px 5px;
 display: flex;
 flex-direction: column;
 justify-content: space-around;
`;

const PriceContainer = styled.div`
 display: flex;
 flex-direction: row;
`;

const Title = styled.span`
font-weight: 300;
margin-bottom: 5px;
`;

const Price = styled.span`
font-weight: ${props => props.sale ? "300" : "600"};
font-size: 20px;
text-decoration: ${props => props.sale && "line-through"};
`;

const PriceSale = styled.span`
font-weight: 600;
font-size: 20px;
padding-left: 10px;
color: ${props => props.sale && "red"};
`;

const Product = ({ item }) => {
  return (
    <Container>
      <ItemContainer>
        <Circle />
        <Image src={item.img} />
        <Info>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorder />
          </Icon>
        </Info>
      </ItemContainer>
      <DescContainer>
          <Title>{item.title}</Title>
          <PriceContainer>
          <Price sale={item.onSale}> {item.onSale ? item.price * 2 : item.price} BGN</Price>
        {item.onSale && <PriceSale sale={item.onSale}>{item.price} BGN </PriceSale>}
        </PriceContainer>
      </DescContainer>
    </Container>
  );
};

export default Product;
