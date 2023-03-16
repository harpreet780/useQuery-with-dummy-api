import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md"

const Products = () => {
    const params = useParams();
    const [singleProduct, setSingleProduct] = useState([]);
    console.log(params, "params")
    const fetchdata = async () => {
        return await fetch(`https://dummyjson.com/products/${params.productId}`)
            .then((response) => response.json())
            .then((data) => setSingleProduct([data])).catch((e) => {
                console.log(e)
            });
    };
    useEffect(() => {
        fetchdata()
    }, [params.id])

    console.log(singleProduct, "prooooooo")
    return (
        <>
            <div className='single-card'>
            <h3 className='text-center mb-3 text-decoration-underline'>Product Detail page</h3>
                <a href="/" className='backBtn'>
                    <MdOutlineArrowBackIosNew />
                    <span>Back</span>
                </a>
                {singleProduct?.map((pro) => {
                    return (
                        <div>
                            <div className='imgBox'>
                                <img src={pro.images[0]} alt="img" className='w-100 h-100' />
                            </div>
                            <div className="p-3">
                                <p className='text-decoration-underline'><b>{pro.title}</b></p>
                                <p>Brand: <b>{pro.brand}</b></p>
                                <p>Category: <b>{pro.category}</b></p>
                                <p>{pro.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Products;