import { Add, Remove } from '@material-ui/icons'
import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { mobile } from '../responsive'
import {publicRequest } from '../requestMethods'
import { useState, useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { addProduct } from '../redux/cartRedux'
import { updateCart } from '../redux/apiCalls'

const Container = styled.div``

const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({flexDirection :"column", padding:"10px"})}
`
const ImgContainer = styled.div`
flex:1;
padding: 0px 50px;

`
const Image = styled.img`
/* border: 3px solid red; */
width: 80%;
height: 90vh;
object-fit: cover;
${mobile({height: "40vh", marginLeft:"15px"})}
`

const InfoContainer = styled.div`
flex:1;
${mobile({padding:"10px"})}
`
const Title = styled.h1`
font-weight: 200;
`

const Description = styled.p`
margin: 20px 0px;
`

const  Price = styled.span`
font-weight: 100;
font-size: 40px;
`
const FilterContainer = styled.div`
display: flex;
width: 50%;
margin: 30px 0px;
justify-content: space-between;
${mobile({width:"100% "})}

`
const Filter = styled.div`
display: flex;
align-items: center;
`
const FilterTitle = styled.span`
font-size: 20px;
font-weight: 200;
`
const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${props=>props.color};
margin: 0px 5px;
cursor: pointer;
border: 0.5px solid black;
`
const FilterSize = styled.select`
margin-left: 10px;
padding: 5px;
` 
const FilterSizeOption = styled.option``

const AddContainer = styled.div`
display: flex;
align-items: center;
width: 50%;
justify-content: space-between;

`
const QuantityContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;
`
const Quantity = styled.span`
height: 30px;
width: 30px;
border: 1px solid teal;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
`
const Button = styled.button`
margin-top: 20px;
padding: 15px;
border: 2px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;
border-radius: 5px;
transition: all 0.2s ease;

&:hover{
    background-color: teal;
    color: white;
}
`


const Product = () => {
    const location= useLocation();
    const id= location.pathname.split("/")[2]
    const [product, setproduct] = useState({})    
    const [quantity, setquantity] = useState(1)
    const [color, setcolor] = useState("")
    const [size, setsize] = useState("")
    const dispatch = useDispatch()

    const user_Id = useSelector(state => state.user.currentUser._id)
    
    // const cart = useSelector(state => state.cart)

    useEffect(() => {
        const getproduct = async()=>{
            try{
              const res = await publicRequest.get("/products/fetchProduct/" + id);
              setproduct(res.data);
            }catch(err){
              console.log(err);
            }
        }
        getproduct();
    }, [id])

    const handleQuantity = (type)=>{
       if(type==="dec"){
           quantity>1 && setquantity(quantity-1);   //if quantity>1 then we can decrese it. But if it is 1 then we shouldn't be able to decrease it below 1.
       }
       else{
        setquantity(quantity+1);
       }
    }

    const handleClick=() =>{
        const item = { ...product, quantity, color, size}
        dispatch(
            addProduct(item),
        )
        setTimeout(() => {        //Using setTimeout so that first prev thing(i.e disptch) should get completed. Then we will send the update req using data from the cart state.
                                  //This should not be done because if someday (may be possible) dispatch takes more than 3 sec to execute then my backend req will be sent without the latest data.
            const cart=  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).cart)           
            updateCart(user_Id, {user_Id, ...cart});
        }, 3000);
        
        //***This should not be done. i.e here first i am doing changes on frontend then sending the backend request.
        //If the req fails then data will not get updated in backend but on frontend it will get updated.
        //But i am not getting any idea how to first send the req then do the frontend changes because for sending the data to the backend i am using data from the cart state.
        //So i am first updating the cart state on frontend then using it as data to send the backend update request.
    }
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                  <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                  <Title>{product.title}</Title>
                  <Description>{product.description}</Description>
                  <Price>Rs. {product.price}</Price>
                  <FilterContainer>
                      <Filter>
                          <FilterTitle>
                              Color
                          </FilterTitle>
                            { 
                            product.color &&  product.color.map((c) => {            //If product.color exists then apply map method.  Without this(product.color) it was giving error that product.color is undefined.
                               return <FilterColor color={c} key={c} onClick={()=>setcolor(c)}></FilterColor>
                          })}

                      </Filter>
                      <Filter>
                          <FilterTitle>Size</FilterTitle>
                          <FilterSize onChange={(e)=>{setsize(e.target.value)}}>
                          
                           {
                        
                            product.size && product.size.map((s) => {            //If product.size exists then apply map method.  Without this(product.size) it was giving error that product.size is undefined.
                                return <FilterSizeOption key={s} value={s}> {s}</FilterSizeOption>
                          })}
                          </FilterSize>
                          
                      </Filter>
                  </FilterContainer>
                  <AddContainer>
                          <QuantityContainer>
                              <Remove onClick={() => {handleQuantity("dec")}}/>
                              <Quantity>{quantity}</Quantity>
                              <Add onClick={() => {handleQuantity("inc")}}/> 
                          </QuantityContainer>            
                      </AddContainer>                     
                  <Button onClick={handleClick}>ADD TO CART</Button>
                </InfoContainer>
            </Wrapper>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default Product
