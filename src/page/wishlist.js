import React, { useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { useLocation } from "react-router-dom";
import { useQuery } from 'react-query';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const fetchWishData = async () => {
    return await fetch(`https://dummyjson.com/products`)
        .then((response) => response.json())
        .then((data) => data?.products).catch((e) => {
            console.log(e)
        });
};

const Wishlist = () => {
    const { data, status } = useQuery(['products'], fetchWishData);
    let location = useLocation();
    const propsData = location?.state;

    let result = data?.filter?.((x) => propsData.some((y) => y.id == x.id))

    useEffect(() => {
        fetchWishData()
        JSON.parse(localStorage.getItem("wishList"))
    }, [])

    return (
        <div className='m-5'>
            <a href="/product" className='backBtn'>
                <MdOutlineArrowBackIosNew />
                <span>Back</span>
            </a>
            <h3 className='text-center mb-3 text-decoration-underline'>My Wishlist</h3>
            <div className="product-cards">
                {status === "loading" &&
                    <div className='loaderWrap'>
                        <Spinner color="primary" />
                    </div>
                }
                {result?.length == 0 && <p className='loaderWrap'><i>Your wishlist is empty!!</i></p>}
                {status === "success" && (result?.map((wish) => {
                    return (
                        <div className="card">
                            <div className='imgBox'>
                                {status === "loading" ?
                                    <Spinner color="primary" />
                                    : <img src={wish.images[0]} alt="img" className='w-100 h-100' />
                                }
                            </div>
                            <div className="p-3">
                                <p className='text-decoration-underline'><b>{wish.title}</b></p>
                                <p>Brand: <b>{wish.brand}</b></p>
                                <p>Category: <b>{wish.category}</b></p>
                                <p>Price: <b>{wish.price}</b></p>
                                <p className='desc'>{wish.description}</p>
                            </div>
                        </div>
                    )
                }))}
            </div>
        </div>
    )
}

export default Wishlist;