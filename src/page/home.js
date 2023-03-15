import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { Spinner } from 'reactstrap';

const fetchdata = async () => {
  return await fetch("https://dummyjson.com/products?skip=0&limit=50")
    .then((response) => response.json())
    .then((data) => data?.products).catch((e) => {
      console.log(e)
    });
};

const Home = () => {
  const { data, status } = useQuery("products", fetchdata);
  // const [products, setProducts] = useState([]);
  const [showFilterOption, setshowFilterOption] = useState();
  const [isFilteredItem, setIsFilteredItem] = useState("")
  const [searchInput, setSearchInput] = useState("");

  // useEffect(() => {
  //   setProducts(data)
  // }, [data])

  const handleCategories = () => {
    setshowFilterOption(!showFilterOption);
  }
  console.log({ data, isFilteredItem })
  const productList = isFilteredItem && searchInput ? data?.
    filter?.(item =>
      item[isFilteredItem]?.toLowerCase?.().includes(searchInput.toLowerCase()) === searchInput?.toLowerCase?.().includes(searchInput.toLowerCase()))
    : data

  return (
    <div className="productListWrap">
      <div className='header'>
        <div className='d-flex align-items-center my-2'>
          <div className='d-flex align-items-center w-100'>
            <button
              className='listbtn'
              style={{ backgroundColor: '#ffa021', fontWeight: 500, border: 'none' }}
              onClick={handleCategories}
            >
              Filter
            </button>
            <input
              type="text"
              name="search"
              placeholder='Search'
              value={searchInput}
              className='SearchOption'
              onChange={(e) => {
                setSearchInput(e?.target?.value)
              }}
            />
          </div>
        </div>
        {/* <select className="input w-50 m-2" name="selectItems" onChange={(e) => setSearchInput(e?.target?.value)}>
          <option value="brand">Brand</option>
          <option value="category">Category</option>
          <option value="title">Title</option>
          <option value="description">Description</option>
        </select> */}
        {showFilterOption &&
          <div className='d-flex align-items-center mt-2'>
            <button className={`${isFilteredItem === "brand" && "card-active"} listbtn`} onClick={() => {
              setIsFilteredItem("brand")
            }}>
              Brand
            </button>
            <button className={`${isFilteredItem === "category" && "card-active"} listbtn`} onClick={() => {
              setIsFilteredItem("category")
            }}>
              Category
            </button>
            <button className={`${isFilteredItem === "title" && "card-active"} listbtn`} onClick={() => {
              setIsFilteredItem("title")
            }}>
              Title
            </button>
            <button className={`${isFilteredItem === "description" && "card-active"} listbtn`} onClick={() => {
              setIsFilteredItem("description")
            }}>
              Description
            </button>
          </div>
        }
      </div>
      {status === "loading" &&
        <div className='loaderWrap'>
          <Spinner color="primary" />
        </div>
      }
      <div className="product-cards">
        {status === "success" && 
         (productList?.map((user) => {
            return (
              <div className="card">
                <div className='imgBox'>
                  {status === "loading" ?
                    <Spinner color="primary" />
                    : <img src={user.images[0]} alt="img" className='w-100 h-100' />
                  }
                </div>
                <div className="p-3">
                  <p className='text-decoration-underline'><b>{user.title}</b></p>
                  <p>Brand: <b>{user.brand}</b></p>
                  <p>Category: <b>{user.category}</b></p>
                  <p className='desc'>{user.description}</p>
                </div>
              </div>
            )
          }))}
      </div>
    </div>
  )
}

export default Home;