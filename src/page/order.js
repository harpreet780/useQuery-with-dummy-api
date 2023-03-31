import React from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { RiShoppingBagFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const Order = () => {
    const showOrderList = useSelector(state => state.submit_user_address);

    return (
        <div className='p-5'>
            <a href="/product" className='backBtn'>
                <MdOutlineArrowBackIosNew />
                <span>Back</span>
            </a>
            <h3 className='text-center mb-3 text-decoration-underline'>My Order's Bill</h3>
            <div className="d-flex align-items-center justify-content-center">
                {showOrderList.length === 0 &&
                    <div className='errorPage'>
                        <p>
                            <RiShoppingBagFill className="heart-icon d-block m-auto" />
                            <i>No order yet!!</i>
                        </p>
                    </div>
                }
                {showOrderList?.map((order) => {
                    return (
                        <div style={{width: '22%', border: '1px solid #ccc', borderRadius: 8, padding: 20, margin: 10}}>
                            <div className="orderlist">
                                <p className='title'>id:</p>
                                <p className="text">{order.id}</p>
                            </div>
                            <div className="orderlist">
                                <p className='title'>Name:</p>
                                <p className="text">{order.name}</p>
                            </div>
                            <div className="orderlist">
                                <p className='title'>Mobile no: </p>
                                <p>{order.mobile}</p>
                            </div>
                            <div className="orderlist">
                                <p className='title'>Address: </p>
                                <p className="text">{order.address}</p>
                            </div>
                            <div className="orderlist">
                                <p className='title'>Pin Code: </p>
                                <p className="text">{order.pincode}</p>
                            </div>
                            <p style={{ borderTop: '1px solid #000', textAlign: 'center', paddingTop: 10 }}>
                                <b>Total Bill: </b>
                                <span>{order.price}</span>
                            </p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Order;