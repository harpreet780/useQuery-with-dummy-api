import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { Input, Spinner } from 'reactstrap';
import PaginationScreen from '../Components/pagination';
import PriceSlider from '../Components/priceSlider';

const fetchSkipdata = async ({ queryKey }) => {
  return await fetch(`https://dummyjson.com/products?skip=${queryKey[1]}&limit=8`)
    .then((response) => response.json())
    .then((data) => data?.products).catch((e) => {
      console.log(e)
    });
};

const Home = () => {
  const buttons = ['brand', 'category', 'Title', 'Description']
  const [showFilterOption, setshowFilterOption] = useState();
  const [isFilteredItem, setIsFilteredItem] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [sortPrice, setSortPrice] = useState("")
  const [skipPerPage, setSkipPerPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [priceRangeValue, setPriceRangeValue] = useState([0,50]);

  const { data, status } = useQuery(['products', skipPerPage], fetchSkipdata);
  const handleCategories = () => {
    setshowFilterOption(!showFilterOption);
  }

  const filterOptions = (data) => {
    const addBtnOptions = [...isFilteredItem]
    addBtnOptions.push(data);
    setIsFilteredItem(addBtnOptions);
  }

  const fetchdata = async () => {
    return await fetch(`https://dummyjson.com/products`)
      .then((response) => response.json())
      .then((data) => {
        setTotalDataLength(data?.products?.length)
      }).catch((e) => {
        console.log(e)
      });
  };

  const handlePriceRangeChange = (event: any, newValue: number ) => {
    setPriceRangeValue(newValue);
  };
  // let matchedKeys;
  // const productList = isFilteredItem && searchInput ? products?.filter?.((item) => {
  //   matchedKeys = Object.keys(item) === isFilteredItem.values()
  //   return (
  //     matchedKeys?.toLowerCase?.().includes(searchInput.toLowerCase()) === searchInput?.toLowerCase?.().includes(searchInput.toLowerCase()))
  // }
  // )
  //   : products

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageCount(newPage);
    if (skipPerPage < totalDataLength) {
      setSkipPerPage((newPage) * 8)
    }
  };
  let minValue = priceRangeValue[0];
  let maxValue = priceRangeValue[1];
  // FOR FILTER ACC TO RANGE 
    const filterPriceRange = data?.filter((item) => {
      if(item.price >= minValue && item.price <= maxValue){
        return item
      }}
    )

  useEffect(() => {
    if (skipPerPage > 1) {
      fetchSkipdata(skipPerPage)
    }
  }, [skipPerPage])

  useEffect(() => {
    if (sortPrice === "High to Low") {
      data?.sort((a, b) => a.price - b.price);
    }
    else {
      data?.sort((a, b) => b.price - a.price);
    }
  }, [sortPrice])

  useEffect(() => {
    fetchdata()
  }, [])

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
        <div className="pricebar">
          <PriceSlider
            priceRangeValue={priceRangeValue}
            handlePriceRangeChange={handlePriceRangeChange}
          />
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            className="sorting-select"
            onChange={(e) => {
              setSortPrice(e?.target?.value)
            }}
          >
            <option value="Low to High"> Low to high </option>
            <option value="High to Low">High to low </option>
          </Input>
        </div>
      </div>
      {status === "loading" &&
        <div className='loaderWrap'>
          <Spinner color="primary" />
        </div>
      }
      <div className="product-cards">
        {status === "success" &&
          (data.map((products) => {
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
                    <p>Price: <b>{products.price}</b></p>
                    <p className='desc'>{products.description}</p>
                  </div>
                </div>
              </Link>
            )
          }))}
      </div>
   {priceRangeValue > [0, 50] ? null : (
     <PaginationScreen
        pageCount={pageCount}
        handleChangePage={handleChangePage}
        pageLength={totalDataLength}
      />
   )}
    </div>
  )
}

export default Home;