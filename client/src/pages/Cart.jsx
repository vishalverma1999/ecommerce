import { Add, Delete, Remove } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../redux/cartRedux";
import { addOrder, updateCart } from "../redux/apiCalls";

const KEY =
  "pk_test_51K7IaVSJ7mZ97jfF3c4RNiUHjYrhFVsx4VbNP40ODEZCjDLqSbWGEerf8SQYUwA255t8O4xGDZARQ5zz1qXKqSrg00jfr9WKIk";


const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "5px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  cursor: pointer;
`;
const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  ${mobile({ display: "none" })}
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
  justify-content: space-between;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  height: 30vh;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`
  ${mobile({ marginBottom: "10px" })}
`;

const ProductId = styled.span`
  ${mobile({ marginBottom: "10px" })}
`;

const ProductColor = styled.span`
  display: flex;
  ${mobile({ marginBottom: "10px" })}
`;

const Color = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({
    flexDirection: "row",
    justifyContent: "space-around" /*border: "2px solid blue"*/,
  })}
`;
const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ marginTop: "22px" })}
`;
const Quantity = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh; //Whenever new items will get added the size of the summary box will increase. So we kept it's size like this not like 100px. ..
  ${mobile({ border: "1px solid lightgray" })}
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;

  font-weight: ${(props) =>
    props.type === "total" &&
    "500"}; //If type is total then set the font-wieght to 500
  font-size: ${(props) =>
    props.type === "total" &&
    "24px"}; //If type is total then set the font-size to 24px
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background-color: #dbdbdb;
    color: gray;
    cursor: not-allowed;
  }
`;

const RemoveItem = styled.div``;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const user_Id = user.currentUser._id;
  const navigate = useNavigate();
  const [StripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleEmptyClick = () => {
    const newCart = {
      userId: user_Id,
      products: [],
      cart_quantity: 0,
      total_amt: 0,
    };
    updateCart(user_Id, newCart);
    dispatch(emptyCart());
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: StripeToken.id,
          amount: cart.total_amt * 100,
        });

        const products = cart.products;
        const total_amt = cart.total_amt;
        const address = res.data.billing_details;
        addOrder({ products: products, address: address, amount: total_amt });
        navigate("/paymentSuccess");
        handleEmptyClick();
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    };
    StripeToken && makeRequest();
  }, [StripeToken, cart, cart.total_amt, navigate]);

  const dispatch = useDispatch();

  return (
    <div>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                CONTINUE SHOPPING
              </Link>
            </TopButton>
            {/* <TopTexts>
              <TopText>Shopping Bag ({cart.cart_quantity})</TopText>
            </TopTexts> */}
          </Top>
          <Button
            onClick={handleEmptyClick}
            style={{ width: "100px", marginLeft: "20px" }}
          >
            Empty Cart
          </Button>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}{" "}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor>
                        <b>Color: </b>
                        <Color color={product.color} />
                      </ProductColor>
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <QuantityContainer>
                      <Remove />
                      <Quantity>{product.quantity}</Quantity>
                      <Add />
                    </QuantityContainer>
                    <ProductPrice>
                      Rs {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>Rs {cart.total_amt}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>Rs 50</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>Rs -50</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>Rs {cart.total_amt}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="ecommerce"
                image="https://c8.alamy.com/comp/2E1ACFM/initial-circle-sj-letter-logo-design-vector-template-abstract-letter-sj-logo-design-2E1ACFM.jpg"
                billingAddress
                //  shippingAddress
                description={`Your total is Rs ${cart.total_amt}`}
                amount={cart.total_amt}
                token={onToken}
                stripeKey={KEY}
                //  currency={inr}
              >
                <Button
                  disabled={!cart.cart_quantity} /*onClick={handleCheckout}*/
                >
                  CHECKOUT NOW
                </Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </div>
  );
};

export default Cart;
