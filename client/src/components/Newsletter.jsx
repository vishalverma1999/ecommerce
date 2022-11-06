import { Send } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; //To make the items vertical.
  
`;
const Title = styled.h1`
  font-size: 70px;
  ${mobile({ fontSize: "40px", marginTop:"5px"})}
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center",})}
`;
const InputContainer = styled.div`
  display: flex;
  width: 50%;
  height: 40px;
  background-color: white;
  justify-content: space-between;
  border: 1px solid gray;
  ${mobile({ width: "80%",})}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  return (
    <div>
      <Container>
        <Title>Newsletter</Title>
        <Description>
          Get timely updates about your favorite products
        </Description>
        <InputContainer>
          <Input placeholder="Your email" />
          <Button>
            <Send />
          </Button>
        </InputContainer>
      </Container>
    </div>
  );
};

export default Newsletter;
