import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const Cart = () => {
    let location = useLocation();
    const addToCartData = location?.state;
    console.log(addToCartData, "adddatacart");

    const calculateBill=(cart)=>{
        const sum = cart.price * cart.quantity;
        return sum;
    }

    const total_Bill = () => {  
       let total_value = addToCartData?.map((item) => {
        return (parseInt(item.price) * parseInt(item.quantity));
         
       })
     return total_value.reduce((a, b) => a + b, 0)

    }

    useEffect(() => {
        JSON.parse(localStorage.getItem("addToCart"))
    }, [])


    return (
        <div className='m-4'>
            <h3 className='text-center mb-3 text-decoration-underline'>My Cart Products</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Product image</th>
                        <th>Product Brand</th>
                        <th>Product Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Bill</th>
                    </tr>
                </thead>
                <tbody>
                    {addToCartData?.length == 0 && <tr className='loaderWrap w-100 m-auto'>No Data Found</tr>}
                    {addToCartData?.map((cart, index) => {
                        

                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={cart.images[0]} alt="img" className='w-25 h-25' />
                                </td>
                                <td>{cart.brand}</td>
                                <td>{cart.category}</td>
                                <td>{cart.price}</td>
                                <td>{cart.quantity}</td>
                                <td>{calculateBill(cart)}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan={6}>Total Bill</td>
                        <td>{total_Bill()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Cart;