import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {mobile} from '../responsive'

const ContainerDelivery = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 50%;
  margin: 20px 20px 50px 20px;
  ${mobile({width: "90%", margin: "10px 0"})}
`;
const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 30px;
  ${mobile({ fontSize: "20px"})}
`;
const Paragraph = styled.p`
  margin: 20px 0;
  ${mobile({ fontSize: "15px"})}
`;

const Ul = styled.ul``;
const Li = styled.li``;

const Conditions = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Categories />
      <ContainerDelivery>
        <Wrapper>
          <Title>Условия и поверителност</Title>
          <Paragraph>
             Онлайн пазаруване и услуги
             <Ul>
                <Li>пускане на редовни и повтарящи се рекламни програми;</Li>
                <Li>обработване на сключени трансакции, което включва например уреждане на плащания и изпращане на стоки;</Li>
                <Li>предлагане, предоставяне и обработване на ваучери за подарък и намаления;</Li>
                <Li>предоставяне на: информация, съобщения, бюлетин и други директни съобщения</Li>
                <Li>oценка и измеримост на данните, свързани с процеса на пазаруване, включително връщания и анулиране на поръчки, направени от Потребителят</Li>
                <Li>справяне със и обработване на искания, свързани с права на потребители, например съгласно законна гаранция или връщане на стоки преди или след изпълнение на договора за продажба, а също и чрез пряк контакт (телефон, имейл)</Li>
             </Ul>
          </Paragraph>
          <Paragraph>
             Реклама и пазарно проучване, анализ на данни
             <Ul>
                <Li>създаваме целеви групи от потребители (също и в социални медии, като например Facebook) със сходни интереси и очаквания, сходен подход при използването на уеб сайта или при пазаруване (сегментация);</Li>
                <Li>разкриваме и предвиждаме модни тенденции;</Li>
                <Li>разработваме прогнози за онлайн пазаруване;</Li>
                <Li>рекламираме наши продукти и услуги;</Li>
                <Li>подобряваме и приспособяваме промоционални дейности във връзка с наши продукти и услуги.</Li>
             </Ul>
          </Paragraph>
          <Paragraph>
          Какви данни обработваме
          <Ul>
                <Li>при регистрация - имейл</Li>
                <Li>при поръчка - имена, адрес, телефон</Li>
                <Li>при плащане с карта - номер на банкова карта</Li>
             </Ul>
          </Paragraph>
        </Wrapper>
      </ContainerDelivery>
      <Footer />
    </div>
  );
};

export default Conditions;
