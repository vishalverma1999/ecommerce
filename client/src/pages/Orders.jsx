import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fetchUserOrders } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Container = styled.div`
${mobile({overFlow : "hidden"})}
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "5px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Order = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const Top = styled.div`
  width: 95%;
  display: flex;
  font-size: 20px;  
  ${mobile(
    {flexDirection:"column",
     fontSize:"18px",
    //  width: "95%"     
    }
    )}
`;
const OrderId = styled.div`
  margin-right: 40px;
  ${mobile({marginRight:"0px"})}
`;
const OrderDate = styled.div`
  margin-right: 40px;
  ${mobile({marginRight:"0px"})}
`;
const OrderStatus = styled.div`
  margin-right: 40px;
  ${mobile({marginRight:"0px"})}
`;

const Bottom = styled.div`
  width: 95%;
  display: flex;
  ${mobile({flexDirection:"column"})}
`;
const Left = styled.div`
flex: 50%;
border-right: 1px solid gray;
margin-right: 20px;

${mobile({borderRight:"none",
borderBottom: "1px solid gray",
  flex: "100%",
  marginRight: "0px",
})}
`;
const Right = styled.div`
flex: 30%;
display: flex;
flex-direction: column;
${mobile({marginTop:"10px"})}
`;


const Product = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  
`;
const ProductDetails = styled.div`
  display: flex;
  width: 100%;
  flex: 50%;
  align-items: center;
`;
const Product_Img = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  object-fit: cover;
`;

const ProDesc = styled.div`
  display: flex;
  flex-direction: column;
  font-size  : 15px;
`;
const ProTitle = styled.div``;
const ProSize = styled.div``;
const ProColor = styled.div``;
const ProPrice = styled.div``;

const Quantity = styled.div`
  width: 100%;
  
  flex: 25%;
`;
const Price = styled.div`
  width: 100%;
  flex: 25%;
`;
const DelAddress = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 18px;
`;
const TotalAmt = styled.div`
  font-size: 25px;
`;
const AddressTitle = styled.div`
  margin-right: 20px;
`;
const Address = styled.div`
  display: flex;
  flex-direction: column;
`;
const Lane = styled.div``;
const CityStateCountry = styled.div``;

const Hr = styled.hr`
background-color: #bbbbbb;
border: none;
width: 100%;
height: 1px;
`

const Orders = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const user_Id = user.currentUser._id;

  useEffect(() => {
    fetchUserOrders(dispatch, user_Id);
  }, [user])

  const orders = useSelector(state => state.orders)
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Orders</Title>
        {orders.myOrders.map(order => (<Order key={order._id}>
          <Top>
            <OrderId>OrderId : {order._id}</OrderId>
            <OrderDate>Ordered On: {order.createdAt.substr(0,10)}</OrderDate>
            <OrderStatus>{order.status}</OrderStatus>            
          </Top>
          <Hr/>
          <Bottom>
            <Left>
            <Product>
              <ProductDetails>Product</ProductDetails>
              <Quantity>Quantity</Quantity>
              <Price>Price</Price>
            </Product>
            {order.products.map(product =>(
            <Product >
              <ProductDetails>
                <Product_Img src={product.img} />

                <ProDesc>
                  <ProTitle>{product.title}</ProTitle>
                  <ProSize>Size: {product.size}</ProSize>
                  <ProColor>Color : {product.color}</ProColor>
                  <ProPrice>Price: {product.price}</ProPrice>
                </ProDesc>
              </ProductDetails>
              <Quantity>{product.quantity}</Quantity>
              <Price>Rs {product.quantity * product.price}</Price>
            </Product>))}

            
            </Left>
            <Right>
            <DelAddress>
              <AddressTitle>Delivery Address :</AddressTitle>
              <Address>
                <Lane>{order.address.address.line1}</Lane>
                <CityStateCountry>{order.address.address.city}, {order.address.address.country}</CityStateCountry>
              </Address>
            </DelAddress>
            <TotalAmt>Total : Rs {order.amount}</TotalAmt>
             </Right>
          </Bottom>
        </Order>)
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Orders;
