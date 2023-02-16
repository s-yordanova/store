import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { mobile } from "../responsive"
import Categories from "../components/Categories"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import RelatedProducts from "../components/RelatedProducts"
import { useTranslation } from "react-i18next"


const Container = styled.div`

`;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })};
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px"})}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0"})}
`;
const Option = styled.option`

`;

const ProductList = () => {
  const { t } = useTranslation();  
  const location = useLocation();
  const mainCat = location.pathname.split('/')[2];
  const cat = location.pathname.split('/')[3];
  const [filters, setFilters] = useState({});
  const [sort, setSorting] = useState("Най-нови");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
        ...filters,
        [e.target.name]: value,
    });
  }

  return (
   <Container>
       <Announcement/>
       <Navbar/>
       <Categories/>
       <Title>{cat}</Title>
       <FilterContainer>
           <Filter><FilterText>{t("Филтър")}:</FilterText>
           <Select name = "color" onChange={handleFilters}>
               <Option disabled selected>{t("Цвят")}</Option>
               <Option>white</Option>
               <Option>black</Option>
               <Option>red</Option>
               <Option>blue</Option>
               <Option>yellow</Option>
               <Option>green</Option>
           </Select>
           <Select name = "size" onChange={handleFilters}>
               <Option disableds selected>{t("Размер")}</Option>
               <Option>XS</Option>
               <Option>S</Option>
               <Option>M</Option>
               <Option>L</Option>
               <Option>XL</Option>
           </Select>
           </Filter>
           <Filter><FilterText>{t("Сортирай")}:</FilterText>
           <Select onChange={e => setSorting(e.target.value)}>
               <Option value="newest">{t("Най-нови")}</Option>
               <Option value="asc">{t("Цена (възх.)")}</Option>
               <Option value="des">{t("Цена (низх.)")}</Option>
           </Select>
           </Filter>
       </FilterContainer>
       {mainCat === cat? <RelatedProducts cat={cat}/> : <Products mainCat={mainCat} cat={cat} filters={filters} sort={sort}/> }
      
       <Newsletter/>
       <Footer/>
   </Container>
  )
}

export default ProductList