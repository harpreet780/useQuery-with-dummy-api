import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Spinner } from 'reactstrap';

const Products = () => {
    const params = useParams();
    const [singleProduct, setSingleProduct] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchdata = async () => {
        setLoading(true);
        return await fetch(`https://dummyjson.com/products/${params.productId}`)
            .then((response) => response.json())
            .then((data) => {
                setLoading(false)
                setSingleProduct([data])
            })
            .catch((e) => {
                console.log(e)
            });
    };
    useEffect(() => {
        fetchdata()
    }, [params.id])

    return (
        <>
            <div className='single-card'>
                <a href="/product" className='backBtn'>
                    <MdOutlineArrowBackIosNew />
                    <span>Back</span>
                </a>
                <h3 className='text-center mb-3 text-decoration-underline'>Product Detail page</h3>
                {loading ?
                    <div className='loaderWrap'>
                        <Spinner color="primary" />
                    </div>
                    : singleProduct?.map((pro) => {
                        return (
                            <div>
                                <div className='imgBox'>
                                    <img src={pro.images[0]} alt="img" className='w-100 h-100' />
                                </div>
                                <div className="p-3">
                                    <p className='text-decoration-underline'><b>{pro.title}</b></p>
                                    <p>Brand: <b>{pro.brand}</b></p>
                                    <p>Category: <b>{pro.category}</b></p>
                                    <p>Price: <b>{pro.price}</b></p>
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