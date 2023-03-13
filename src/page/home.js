import React from 'react';
// import Products from '../api/product.json';
import { useQuery } from "react-query";
import axios from "axios";

const fetchProducts = async () => {
//  return await fetch("https://pokeapi.co/api/v2/pokemon")
//  .then((response) => response.json())
//  .then((data) => data?.results).catch((e) => {
//   console.log(e)
//  });
return await fetch("https://pokeapi.co/api/v2/pokemon")
 .then((response) => response.json())
 .then((data) => data?.results).catch((e) => {
  console.log(e)
 });
};

const Home = () => {
    const { data, status, error } = useQuery("products", fetchProducts);
    
  return (
    <div>
         {data?.map((user) => {
         console.log(user,"user")
          return (
             <p>{user.name}</p>
          )
       })}
    </div>
  )
}

export default Home;