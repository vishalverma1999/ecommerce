import { Facebook, Instagram, MailOutline, Payment, Phone, Pinterest, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import Payment_Cards from '../Images/Payment_Cards.png'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    /* justify-content: space-between; */
    ${mobile({ flexDirection: "column", backgroundColor:"#f2fff0", marginTop:"5px"})}
`
const Left = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 20px;
`;
const Logo = styled.h1``;

const Description = styled.p``;

const SocialMediaContainer = styled.div`
display: flex;
`;

const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
background-color: ${props=>props.bgcolor};
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
`;

const Center = styled.div`
flex: 1;
padding:20px;
`;
const Title = styled.h3`
     margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;  //To remove the dots of listItem which come by default in list
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px ;
`
const Right = styled.div`
flex: 1;
padding: 20px;
`;

const ContactItem= styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`
const Payment_Block= styled.div`
    display: flex;
    align-items: center;
`
const Cards= styled.img`
    width: 50%;
    /* border: 3px solid red; */
    /* margin-top: 0px; */
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>LAMA.</Logo>
                <Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae autem minus, cupiditate, libero quia nulla consequatur mollitia incidunt et obcaecati facere molestias voluptas cum laudantium laborum enim id rem tempora?</Description>
                <SocialMediaContainer>
                    <SocialIcon bgcolor="#385999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon bgcolor="#E4405F">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon bgcolor="#55ACEE">
                        <Twitter/>
                    </SocialIcon>
                    <SocialIcon bgcolor="#E60023">
                        <Pinterest/>
                    </SocialIcon>
                </SocialMediaContainer>
            </Left>
            <Center>
                <Title>
                    Useful Links
                </Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{"marginRight":"10px"}}/>
                ABV-IIITM, Morena Link Road, Gwalior(M.P)
                </ContactItem>
                <ContactItem>
                    <Phone style={{"marginRight":"10px"}}/>
                +91 8770054128
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{"marginRight":"10px"}}/>
                imt_2019087@iiitm.ac.in
                </ContactItem>
                <Payment_Block>
                <Payment style={{"marginRight":"10px"}}/>
                <Cards src={Payment_Cards}/>
                </Payment_Block>

            </Right>
        </Container>
    )
}

export default Footer
