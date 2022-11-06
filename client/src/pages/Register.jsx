import React from 'react'
import styled from 'styled-components'
import { register } from '../redux/apiCalls'
import { mobile } from '../responsive'
import { useDispatch , useSelector} from 'react-redux'
import { useState } from 'react'
import {Link} from "react-router-dom"
const Container = styled.div`
width: 100vw;
height: 100vh;
background:  linear-gradient(                  
            rgba(255,255,255,0.5),         
            rgba(255,255,255,0.5)
            ),                           // Linear gradient to apply opacity to the background-image.
             url("https://media.istockphoto.com/photos/shopping-online-concept-shopping-service-on-the-online-web-with-by-picture-id1133980246?k=20&m=1133980246&s=612x612&w=0&h=bwut2YUV7gtnjrv354523xU_9S-TtKQOqGTdiGMsPfs=") ;
background-size: cover; 
overflow: hidden;

display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
padding: 20px;
width: 40%;
background-color: white;
border-radius: 10px;
${mobile({ width: "80%",})}
`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;

`

const Form = styled.form`
display: flex;
flex-wrap: wrap;
`

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`
const Agreement = styled.span`
font-size: 12px;
margin-top: 20px;
margin-left: 0;
margin-right: 0;
margin-bottom: 10px;
`
const GoToLogin = styled.span`
font-size: 12px;
margin-left: 0;
margin-right: 0;
margin-bottom: 20px;
`;

const Button = styled.button`
width: 40%;   //40% means 40% of the available space of the parent element
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
margin-left: 29%;
`

const Error = styled.span`
    color: red;
    font-size: 15px;
`
const Register = () => {

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    
    const {error} = useSelector(state => state.user)
    
    const dispatch = useDispatch();
    
    const handleClick =  (e)=>{
        e.preventDefault();
        if(document.getElementById("confPass").value === password){
          register(dispatch, {username, email, password}); 
          }
    }
    const checkConfPass = (e)=>{
      if(e.target.value === password){
        document.getElementById("confPass").style.border = "2px solid green"
      }else{
        document.getElementById("confPass").style.border = "2px solid red"
      }

    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="username" onChange={(e)=>{setusername(e.target.value)}}/>
                    <Input placeholder="email" onChange={(e)=>{setemail(e.target.value)}}/>
                    <Input placeholder="password" onChange={(e)=>{setpassword(e.target.value)}}/>
                    <Input id="confPass" placeholder="Confirm password" onChange={checkConfPass}/>
                    {error && <Error id="err">Something went wrong...</Error>}
                    <Agreement>By creating an account, I consert to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
                    <GoToLogin>Already have an account? <Link to="/login">Login</Link></GoToLogin>
                    <Button onClick={handleClick} >CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
