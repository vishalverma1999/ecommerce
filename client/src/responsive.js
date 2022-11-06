import {css} from "styled-components";

export const mobile = (props) => {
    return css`
     @media only screen and (max-width: 480px) {
         ${props}
     }   
    `
}

/*  We can aso create for other devices like : 

export const tablet = (props) => {
    return css`
     @media only screen and (max-width: 640px) {
         ${props}
     }   
    `
}
*/