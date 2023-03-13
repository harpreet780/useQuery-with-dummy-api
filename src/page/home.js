import React from 'react';
import products from '../api/products.json';
import { useQuery } from "react-query";

const fetchProducts = async () => {
 return await fetch("https://pokeapi.co/api/v2/pokemon")
 .then((response) => response.json())
 .then((data) => data?.results).catch((e) => {
  console.log(e)
 });
// return await fetch(products)
//  .then((data) => console.log(data)).catch((e) => {
//   console.log(e,"eee")
//  });
};

const Home = () => {
    const { data, status } = useQuery("products", fetchProducts);
    
  return (
    <div>
      {status === "error" && <p>Found error</p>}
         {status === "success" && ( data?.map((user) => {
          return (
             <p><b>{user.name}</b>: <span>{user.url}</span></p>
            // <p>{user.description}</p>
          )
       }))}
    </div>
  )
}

export default Home;