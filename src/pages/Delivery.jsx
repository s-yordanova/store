import { DirectionsCar } from "@material-ui/icons";
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

const Delivery = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Categories />
      <ContainerDelivery>
        <Wrapper>
          <Title>Всичко за доставката на артикули от Archer</Title>
          <Paragraph>
            <DirectionsCar /> 30-дневен срок за връщане! Връщането винаги е
            безплатно!
          </Paragraph>
          <Paragraph>
            Куриер Speedy - ДО ОФИС - цена 3.84 BGN до 3кг, цената варира в
            зависимост от килограмите. Доставка до 5 работни дни на територията
            на България.{" "}
          </Paragraph>
          <Paragraph>
            Куриер Speedy - ДО АДРЕС - цена 5.26 BGN до 3кг, цената варира в
            зависимост от килограмите. Доставка до 5 работни дни на територията
            на България.{" "}
          </Paragraph>
          <Paragraph>
            Куриер Econt - ДО ОФИС - цена 6.00 BGN до 3кг, цената варира в
            зависимост от килограмите. Доставка до 5 работни дни на територията
            на България.{" "}
          </Paragraph>
          <Paragraph>
            Куриер Econt - ДО АДРЕС - цена 7.56 BGN до 3кг, цената варира в
            зависимост от килограмите. Доставка до 5 работни дни на територията
            на България.{" "}
          </Paragraph>
          <Paragraph>
            Доставката е напълно проследима и уведомления за нея се изпращат
            чрез SMS, имейли също се предоставят от куриера. Куриерът ще се
            опита да достави поръчката до предоставения адрес два пъти. Ако не
            успее, пакетът ще се върне в нашия онлайн склад. Куриер може да
            достави пакета Ви между 9 - 17 ч.
          </Paragraph>
          <Paragraph>
            За международните пратки цената е 30 BGN до 2кг. Пратката ще бъде
            изпратена чрез Блъгарски пощи.
          </Paragraph>
        </Wrapper>
      </ContainerDelivery>
      <Footer />
    </div>
  );
};

export default Delivery;
