import { Facebook, Instagram, MailOutline, Phone, Pinterest, Twitter } from "@material-ui/icons";
import styled from "styled-components"
import {mobile} from '../responsive'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column"})}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1`

`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
    
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;


const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none"})}
`;

const Title = styled.h2`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 70%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:visited {
    color: black;
  }
`;

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Container>
        <Left>
            <Logo>Archer</Logo>
            <Desc>{t("Повече от 20 години на модния пазар! Качество, цена, отношение! Уцели право в десетката с нашите модни предложения!")} </Desc>
            <SocialContainer>
                <SocialIcon color = "3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color = "E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color = "55ACEE">
                    <Twitter/>
                </SocialIcon>
                <SocialIcon color = "E60023">
                    <Pinterest/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title> {t("Полезни линкове")} </Title>
            <List>
                <ListItem> {t("Начало")} </ListItem>
                <ListItem> {t("Количка")} </ListItem>
                <ListItem> {t("Мъжка мода")} </ListItem>
                <ListItem> {t("Дамска мода")} </ListItem>
                <ListItem> {t("Намаления")} </ListItem>
                <ListItem> {t("Профил")} </ListItem>
                <ListItem><StyledLink to="/shipping"> {t("Доставка")} </StyledLink></ListItem>
                <ListItem><StyledLink to="/conditions"> {t("Условия")} </StyledLink></ListItem>
            </List>
        </Center>
        <Right>
            <Title>{t("Контакти")}</Title>
            <ContactItem>
                 <Phone style = {{marginRight: "10px"}} /> +359 895 816 753
            </ContactItem>
            <ContactItem> 
                <MailOutline style = {{marginRight: "10px"}} /> archer@gmail.com
            </ContactItem>
            <Payment src= "https://i.ibb.co/Qfvn4z6/payment.png"/>
        </Right>
    </Container>
  )
}

export default Footer