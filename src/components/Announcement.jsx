import styled from "styled-components"
import { useTranslation } from "react-i18next";

const Container = styled.div`
height: 30px;
background-color: teal;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: bold;
`;

function Announcement() {
    const { t } = useTranslation();
    return (
        <Container>
            {t("Безплатна доставка за поръчки над 30лв!")} <i className="fas fa-shipping-fast shipicon"></i>
        </Container>
    )
}

export default Announcement
