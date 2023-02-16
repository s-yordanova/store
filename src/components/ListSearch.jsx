import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";



const Container = styled.div`
  top: 100%;
  width: 100%;
  cursor: pointer;
  background-color: white;
  position: absolute;
  display: inline-block;
  z-index: 9999;
  
  ${mobile({ width: "500%" ,left: "0%"})};
`;

const DropDownItem = styled.div`
  color: black;
  padding: 12px 10px;
  text-decoration: none;
  display: block;
  
  &:hover {
    background-color: #ddd;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:visited{
    color: black;
  }
`;


const ListSearch = ({ data, query }) => {
    return (
      <Container>{data.map((item) => (
            query && <StyledLink to= {`/product/${item._id}`}><DropDownItem> {item.title}</DropDownItem> </StyledLink>
          ))}
      </Container>
    );
  };
  
  export default ListSearch;