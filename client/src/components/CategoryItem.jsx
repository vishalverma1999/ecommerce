import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container= styled.div`
     flex:1;
     margin : 3px;
     height: 70vh;
     position: relative;  // parent for position:absolute in Info .
`
const Image= styled.img`
width: 100%;
height: 100%;
object-fit: cover;  //So that the image doesn't look weird when we set the width and height by ourselves. Like image looking fat or elongated.. object-fit: cover wil prevent this.
${mobile({ height: "20vh",})}
`
const Info= styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const Title= styled.h1`
color: white;
margin: 20px;
${mobile({ fontSize: "25px",})}
`
const Button= styled.button`
border: none;
padding: 10px;
background-color: white;
color: gray;
cursor: pointer;
font-weight: 600;
${mobile({ marginBottom: "20px",})}
`

const CategoryItem = (props) => {
    const{item} = props;
    const{img, title}=item;
    return (
        <Container>
            <Image src={img}/>
             <Info>
                <Title>
                  {title}
                </Title>
                <Link to={`products/${item.category}`}>
                <Button>
                  SHOP NOW
                </Button>
                </Link>
             </Info>
        </Container>
    )
}

export default CategoryItem
