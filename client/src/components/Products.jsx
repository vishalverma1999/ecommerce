import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Product from './Product'
import axios from 'axios'

const production  = 'https://ecommerce-z4sf.onrender.com/api';
const development = 'http://localhost:5000/api';
const BASE_URL = (process.env.NODE_ENV ? production : development);

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
`
const Products = (props) => {
  const{category, filters, sort} = props;
  const [Products, setProducts] = useState([])
  const [filteredProducts, setfilteredProducts] = useState([])    //Whenever our filters will change we will update filteredProducts
  const [sortedProducts, setsortedProducts] = useState([])

  useEffect(() => {
    const getProducts = async()=>{
      try{
        const res= await axios.get( 
          category 
          ? `${BASE_URL}/products/fetchAllProducts?category=${category}`    //If category is present then fetchdata using this link. When we will click on one of the cars from 3 cards present on the honepage. Then category will be passed in the url and this url will be used.
          : `${BASE_URL}/products/fetchAllProducts`                         // Else use this link. For displaying products on the home page this link will be used because no category will be passed and no category is required for data on home page
        );
        setProducts(res.data);
      }catch(err){
        // res.json(err);
        console.log(err)
      }
    }
    getProducts();
  }, [category])  // [category] is called dependency. It means that whenever our category will change useEffect will rget called.
  
  useEffect(() => {
     category && setfilteredProducts(
       Products.filter((item) => 
        Object.entries(filters).every(([key, value])=>
        item[key].includes(value))
        )
     )
  }, [Products, category, filters])

  useEffect(() => {
  if(sort === "newest"){
    setfilteredProducts((prev) => 
      [...prev].sort((a,b) => a.createdAt - b.createdAt)
    );
  }
  else if(sort === "price_asc"){
    setfilteredProducts((prev)=>
      [...prev].sort((a,b) => a.price - b.price)
    )
  }
  else{
    setfilteredProducts((prev)=>
      [...prev].sort((a,b) => b.price - a.price)
    )
  }
}, [sort])

  return (
        <Container>
                                      {/*If categories is present then show the filtered products else show all the products(all the products will be shown on the home page because there category will not be present)*/}
          {category                         
          ?filteredProducts.map((item)=>{
           return <Product item={item} key={item.id}/>   //Whenever we are using map method we should specify key which should be something unique.
          })
          : Products.slice(0,8).map((item)=>{     //slice because we are displaying only 8 items
            return <Product item={item} key={item.id}/>   
           })
        }  
        </Container>
    )
}

export default Products
