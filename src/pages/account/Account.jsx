import { Publish, Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../../components/Announcement";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";
import "./account.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { update } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethods";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 100px;
  ${mobile({ padding: "20px 25px", width: "85%" })}
`;

const AccountInfo = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const UpdateAccount = styled.div`
  flex: 1;
  border: 0.5px solid lightgrey;
    border-radius: 10px;
    padding: 20px
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 20px 10px;
`;

const OrderHistory = styled.div`
  flex: 2;
  padding-left: 80px;
  ${mobile({paddingLeft: "0px", margin: "40px 0 0 0" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin: 10px;
  ${mobile({ margin: "2px", fontSize: "18px" })}
`;

const UpdatePicture = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: inherit;
  margin-top: 10px;
  padding-bottom: 30px;
`;

const UpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding-bottom: 20px;
`;

const UpdateIcon = styled.div`
  cursor: pointer;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 18px;
`;

const PasswordInput = styled.div`
  border: none;
  width: 252px;
  height: 25px;
  border-bottom: 1px solid gray;
  grid-template: 30px;
  display: flex;
  flex-direction: row;
  justify-content: inherit;
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: inherit;
`;

const LabelUpload = styled.label`
  margin-bottom: 5px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 35%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: left;
`;

const Td = styled.td`
  font-weight: 300;
`;

const ButtonStatus = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  background-color: #e5faf2;
  color: #${(props) => (props.type === "approved" && "3bb077") || (props.type === "declined" && "d95087") || (props.type === "pending" && "2a7ade")};
`;

const ButtonView = styled.button`
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-right: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:visited {
    color: black;
  }
`;

const Account = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [passwordEye, setPasswordEye] = useState(false);
  const { t } = useTranslation();
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const { error, success } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState();
  const dispatch = useDispatch();

  const [input, setInput] = useState({});

  const [errors, setError] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const onInputChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    validateInput(e);
  };
  /* const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
*/
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (emailRegex.test(value) === false) {
            stateObj[name] = t("Please enter valid Email.");
          }
          break;
        case "username":
          if (value.length > 30 || value.length < 8) {
            stateObj[name] = t("Username between 8 and 30 char.");
          }
          break;

        case "password":
          if (value.length < 8) {
            stateObj[name] = t("Password should be at least 8 char.");
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
            t("Password and Confirm Password does not match.");
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (input.password && value !== input.password) {
            stateObj[name] = t("Password and Confirm Password does not match.");
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (
      (!errors.email &&
        !errors.username &&
        !errors.password &&
        !errors.confirmPassword) ||
      file
    ) {
      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const updateUser = {
                ...user,
                ...input,
                img: downloadURL,
              };
              updateUser.password === "" && delete updateUser.password;
              delete updateUser.confirmPassword;
              update(dispatch, user._id, updateUser);
            });
          }
        );
      } else {
        const updateUser = {
          ...user,
          ...input,
        };
        delete updateUser.confirmPassword;
        console.log(updateUser);
        update(dispatch, user._id, updateUser);
      }
    }
  };

  const Error = styled.span`
    color: red;
  `;

  const Success = styled.span`
    color: green;
  `;

  //ORDERS

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`orders/find/${user._id}`);
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, [user]);


  return (
    <Container>
      <Announcement />
      <Navbar />
      <Categories />
      <Wrapper>
        <AccountInfo>
          <UpdateAccount>
            <Title>{t("Актуализиране на профила")}</Title>
            <Form>
              <UpdatePicture>
                <Image
                  src={
                    img ||
                    user.img ||
                    "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                  }
                ></Image>
                <LabelUpload>
                  <UpdateIcon>
                    <Publish />
                  </UpdateIcon>

                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      const [filei] = e.target.files;
                      setImg(URL.createObjectURL(filei));
                    }}
                  ></input>
                </LabelUpload>
              </UpdatePicture>
              <UpdateItem>
                <Label>{t("Потребителско име")}</Label>
                <input
                  name="username"
                  className="inputAccount"
                  placeholder={user.username}
                  onChange={onInputChange}
                ></input>
                <p className="pColor">
                  {errors.username && (
                    <span className="err">{errors.username}</span>
                  )}
                </p>
              </UpdateItem>
              <UpdateItem>
                <Label>{t("Имейл")}</Label>
                <input
                  name="email"
                  className="inputAccount"
                  placeholder={user.email}
                  onChange={onInputChange}
                ></input>
                <p className="pColor">
                  {errors.email && <span className="err">{errors.email}</span>}
                </p>
              </UpdateItem>
              <UpdateItem>
                <Label>{t("Нова Парола")}</Label>
                <PasswordInput>
                  <input
                    name="password"
                    type={passwordEye === false ? "password" : "text"}
                    className="inputPassword"
                    onChange={onInputChange}
                    placeholder="password"
                  ></input>
                  <Icon className="icon">
                    {passwordEye === false ? (
                      <VisibilityOff onClick={handlePasswordClick} />
                    ) : (
                      <Visibility onClick={handlePasswordClick} />
                    )}
                  </Icon>
                </PasswordInput>
                <p className="pColor">
                  {errors.password && (
                    <span className="err">{errors.password}</span>
                  )}
                </p>
              </UpdateItem>
              <UpdateItem>
                <Label>{t("Потвърди паролата")}</Label>
                <PasswordInput>
                  <input
                    name="confirmPassword"
                    type={passwordEye === false ? "password" : "text"}
                    className="inputPassword"
                    placeholder="confirm password"
                    onChange={onInputChange}
                  ></input>
                  <Icon className="icon">
                    {passwordEye === false ? (
                      <VisibilityOff onClick={handlePasswordClick} />
                    ) : (
                      <Visibility onClick={handlePasswordClick} />
                    )}
                  </Icon>
                </PasswordInput>
                <p className="pColor">
                  {errors.confirmPassword && (
                    <span className="err">{errors.confirmPassword}</span>
                  )}
                </p>
              </UpdateItem>
              <Button onClick={handleClick}>{t("Промени")}</Button>
              {error && <Error>{t("Нещо се обърка..")}</Error>}
              {success && <Success>{t("Успешна регистрация!")}</Success>}
            </Form>
          </UpdateAccount>
          <OrderHistory>
            <Title>{t("История на поръчките")}</Title>
            <Table>
              <Tr>
                <Th>{t("Дата")}</Th>
                <Th>{t("Обща сума")}</Th>
                <Th>{t("Статус")}</Th>
                <Th>{t("Детайли")}</Th>
              </Tr>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>
                    {
                      (  moment(order.createdAt)
                        .format('MMMM Do YYYY')
                        )
                    }
                  </Td>
                  <Td>{order.amount} BGN</Td>
                  <Td>
                    <ButtonStatus type={order.status}>
                      {order.status}
                    </ButtonStatus>
                  </Td>
                  <Td>
                  <StyledLink to={"/details/" + order._id}>
                  <ButtonView>
                  {t("Преглед")}
                  </ButtonView>
                  </StyledLink>
                  </Td>
                </Tr>
              ))}
            </Table>
          </OrderHistory>
        </AccountInfo>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Account;
