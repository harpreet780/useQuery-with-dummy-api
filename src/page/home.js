import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
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
  const [showFilterOption, setshowFilterOption] = useState();
  const [isFilteredItem, setIsFilteredItem] = useState([])
  const [searchInput, setSearchInput] = useState("");
  
  const handleCategories = () => {
    setshowFilterOption(!showFilterOption);
  }

  const buttons = ['Brand', 'Category', 'Title', 'Description']

  const filterOptions = (data) => {
    const addBtnOptions = [...isFilteredItem]
    addBtnOptions.push(data);
    setIsFilteredItem(addBtnOptions);
  }
  console.log(isFilteredItem, "addd")
  console.log({ data, isFilteredItem })

  // let sortOptions = isFilteredItem ==="Brand" || isFilteredItem ==="Category" || isFilteredItem ==="title" || isFilteredItem ==="Description";
  
  const productList = isFilteredItem && searchInput ? data?.filter?.(item => 
    item[isFilteredItem]?.toLowerCase?.().includes(searchInput.toLowerCase()) === searchInput?.toLowerCase?.().includes(searchInput.toLowerCase()))
    : data
    console.log(isFilteredItem.includes(),"isFilteredItem")
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
        {showFilterOption && (
          <div className='d-flex align-items-center mt-2'>
            {buttons?.map((btn) => {
              return (
                <button className={`${isFilteredItem?.includes(btn) && "card-active"} listbtn`} onClick={() => filterOptions(btn)}  >
                  {btn}
                </button>
              )
            })}
          </div>
        )}
      </div>
      {status === "loading" &&
        <div className='loaderWrap'>
          <Spinner color="primary" />
        </div>
      }
      <div className="product-cards">
        {status === "success" &&
          (productList?.map((products) => {
            return (
              <Link to={`/product/${products.id}`} className="card">
              <div>
                <div className='imgBox'>
                  {status === "loading" ?
                    <Spinner color="primary" />
                    : <img src={products.images[0]} alt="img" className='w-100 h-100' />
                  }
                </div>
                <div className="p-3">
                  <p className='text-decoration-underline'><b>{products.title}</b></p>
                  <p>Brand: <b>{products.brand}</b></p>
                  <p>Category: <b>{products.category}</b></p>
                  <p className='desc'>{products.description}</p>
                </div>
              </div>
              </Link>
            )
          }))}
      </div>
    </div>
  )
}

export default Home;