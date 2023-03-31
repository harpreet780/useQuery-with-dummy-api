import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const getCartItems = useSelector((state) => state.addToCart);
    const calculate_total_bill = useSelector((state) => state.bill);

    const calculateBill = (cart) => {
        const sum = cart.price * cart.quantity;
        return sum;
    }

    return (
        <div className='m-4'>
            <h3 className='text-center mb-3 text-decoration-underline'>My Cart Products</h3>
            {getCartItems?.length == 0 ?
                <div className='errorPage'>
                    <p>
                    <GiShoppingCart className="heart-icon d-block m-auto" />
                    <i>Your cart is empty,<br /> go to shopping Page</i>
                    </p>
                </div> 
                :
                <>
                    <table className='table mb-4'>
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
                            {getCartItems?.map((cart, index) => {

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
                                <td colSpan={6}><b>Total Bill</b></td>
                                <td><b>{calculate_total_bill}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className='backBtn m-auto d-block'
                        onClick={() => navigate("/product/address")}
                    >
                        checkout
                    </button>
                </>
            }
        </div>
    )
}

export default Cart;