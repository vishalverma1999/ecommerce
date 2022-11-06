
import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import { mobile } from '../responsive'

const Container = styled.div`
`

const Title = styled.h1`
margin: 20px;
`
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
`
const Filter = styled.div`
margin: 20px;
${mobile({margin:"0px 20px", display:"flex", flexDirection:"column"})}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({marginRight:"0px"})}
`
const Select= styled.select`
padding: 10px;
margin-right: 20px;
${mobile({margin:"10px 0px"})};
font-family: cursive;
`
const Option= styled.option`

`
  
const ProductList = () => {

    const location = useLocation();
    const category = location.pathname.split("/")[2];    //This will split the url around "/". Eg: If the path name is localhost:3000/products/shirt   .Then split("/")[2] will give us shirt. Thus we can extract category from the url.

    const [filters, setFilters] = useState({});    // filter variable will contain values of size and color.
    const [sort, setSort] = useState("newest");

    const handleFilters= (e)=>{
        const value= e.target.value;
        setFilters({
            ...filters,          //spread operator. because we have to set more than one fields in filter object
         [e.target.name]:value
        })
    }
    const handleSort = (e)=>{
       setSort(e.target.value);
    }
    
    return (
        <Container>
            <Announcement/>
            <Navbar/>
            
            <Title>{category}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products: </FilterText>

                     <Select name="color" onChange={handleFilters}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>

                    <Select  name="size"  onChange={handleFilters}>
                        <Option disabled>
                            Size
                            </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                        
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select name="sort" onChange={handleSort} defaultValue="newest">
                        <Option selected value="newest">
                            Newest
                            </Option>
                        <Option value="price_asc">Price (asc)</Option>
                        <Option value="price_desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort}/>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default ProductList
