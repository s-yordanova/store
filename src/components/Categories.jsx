import styled from "styled-components"
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import {mobile} from '../responsive';

const Container = styled.div`
    display: flex;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ margin: "2px", fontSize: "14px"})}
`;

const Categories = () => {
    return (
        <Container>
            {categories.map(item =>(
                <CategoryItem item = {item} key = {item.id}/>
            ))}
        </Container>
    )
}

export default Categories
