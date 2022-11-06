import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/apiCalls'
import { Link } from 'react-router-dom'

const Container = styled.div`
width: 100vw;
height: 100vh;
background:  linear-gradient(                  
            rgba(255,255,255,0.5),         
            rgba(255,255,255,0.5)
            ),                           // Linearr gradient to apply opacity to the background-image.
             url("https://media.istockphoto.com/photos/shopping-online-concept-shopping-service-on-the-online-web-with-by-picture-id1133980246?k=20&m=1133980246&s=612x612&w=0&h=bwut2YUV7gtnjrv354523xU_9S-TtKQOqGTdiGMsPfs=") ;

background-size: cover; 
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
padding: 20px;
width: 25%;
background-color: white;
border-radius: 10px;
${mobile({ width: "80%",})}

`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
margin-left: 36%;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 8px 0px ;
padding: 10px;
`

const Button = styled.button`
width: 100%;   //40% means 40% of the available space of the parent element
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
/* margin-left: 29%; */
margin-bottom: 10px;
margin-top: 10px;
&:disabled{
    background-color: #dbdbdb;
    color: teal;
    cursor: not-allowed;
}

`
const Lin = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    
`
const Error = styled.span`
    color: red;
    font-size: 15px;
`

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch()

    const {isFetching, error} = useSelector((state) => state.user)  //using isFetching and error states
 
    const handleClick = (e)=>{
        e.preventDefault();
        login(dispatch, {email, password});   //calling login from apiCalls file to send api request for login
    }
    return (
        <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder="email" onChange={(e)=> setemail(e.target.value)}/>
                <Input type="password" placeholder="password" onChange={(e)=> setpassword(e.target.value)}/>
                <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>  {/*when isFetching state will be true i.e fetching the response is in progress then the login button will be disabled */}
                {error && <Error id="err">Something went wrong...</Error>} {/*if error occurs i.e the error state changes to true then this will be printed*/}
                <Lin style={{"width": "100px"}}>Forgot password ?</Lin>
                <Lin style={{"width": "50px"}}><Link to="/register">Register?</Link></Lin>
                
            </Form>
        </Wrapper>
    </Container>
    )
}

export default Login
