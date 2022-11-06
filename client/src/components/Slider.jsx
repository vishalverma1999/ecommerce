import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState} from "react";
import styled from "styled-components";
import {sliderItems} from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh; // 100 vh means that 100% of the view port(i.e 100% of the screen)
  display: flex;
  /* background-color: teal; */
  position: relative;
  overflow: hidden; // To prevent the content from going out of the page horizontally
  ${mobile({  height: "90vh"})}
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center; //short form : aic
  justify-content: center; //short form : jcc
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) =>
    props.direction === "left" && "10px"}; //props. If direction is left then set left property to 10px
  right: ${(props) =>
    props.direction === "right" && "10px"}; //props. If direction is right then set right property to 10px
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;  //To bring the arrow above the image.
`
const Wrapper = styled.div`
  height: 100%;
  display: flex; //To make the slides come horizontal after one another
  transition: all 1.5s ease; //To move the slides smoothly in 1.5 sec.
  transform: translateX(${props=>props.slideIndex * -100}vw); //For moving the slider (i.e move the slides in X direction). {{  For left moving use (-) . For right use (+  or nothing).  (SHAYAD)}}
                                 // vw means viewport width. 100vw means 100% of viewport.  {{  (-) means move to left direction. (SHAYAD) }}
`                                 
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${props=> props.bg};  //Passing backgound color as props.
  ${mobile({ flexDirection: "column"})}
`
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  /* border: 3px solid green; */
  ${mobile({  height: "50%"})}
`
const Image = styled.img`
  height: 80%;
  margin-left: 20px;
  margin-top: 30px;
  ${mobile({ height: "90%", marginTop:"15px"})}

`
const InfoContainer = styled.div`
  flex: 1.5;
  padding: 50px;
  ${mobile({  padding: "10px", display:"flex", flexDirection: "column", alignItems: "center"})}
`
const Title = styled.h1`
font-size: 70px;
${mobile({  fontSize: "20px"})}
`
const Description = styled.p`
margin: 50px 0px;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;
${mobile({ margin: "20px 0px", fontSize:"18px", textAlign:"center"})}
`
const Button = styled.button`
padding: 10px;
font-size: 20px;
background: transparent;
cursor: pointer;
${mobile({  padding: "5px", fontSize:"15px"})}
`
const Slider = () => {
  const [SlideIndex, setSlideIndex] = useState(0)  //created a sate variable SlideIndex which will be passed in translateX()
  
  const handleClick = (direction)=>{
    if(direction==="left"){                       //changing the value of slideIndex 
      setSlideIndex(SlideIndex>0 ? SlideIndex-1 : 2);  //Because if slideIndex is 0 then it should go to -200 and not on 100. Because our slides exists on 0,-100 and -200.
    }
    else{
      setSlideIndex(SlideIndex<2 ? SlideIndex+1 : 0);
    }
  }

  return (
    <div>
      <Container>
        <Arrow direction="left" onClick={()=>{handleClick("left")}}> {/*direction is passed as a prop here*/}
          <ArrowLeftOutlined />  {/*Left Arrow on Slider. Taken from Material UI */}
        </Arrow>
        <Wrapper slideIndex={SlideIndex}>
          {sliderItems.map((item)=>{
           return <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src= {item.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
                <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
          })}
        </Wrapper>
        <Arrow direction="right" onClick={()=>{handleClick("right")}}> {/*direction is passed as a prop here*/}
          <ArrowRightOutlined />  {/*Right Arrow on Slider. Taken from Material UI */}
        </Arrow>
      </Container>
    </div>
  );
};

export default Slider;
