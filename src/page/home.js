import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Input, Spinner } from 'reactstrap';
import PaginationScreen from '../Components/pagination';
import PriceSlider from '../Components/priceSlider';
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { GiShoppingCart } from "react-icons/gi";

const fetchSkipdata = async ({ queryKey }) => {
  return await fetch(`https://dummyjson.com/products?skip=${queryKey[1]}&limit=8`)
    .then((response) => response.json())
    .then((data) => data?.products).catch((e) => {
      console.log(e)
    });
};

const Home = () => {
  const navigate = useNavigate();
  const buttons = ['brand', 'category', 'Title', 'Description']
  const [showFilterOption, setshowFilterOption] = useState();
  const [isFilteredItem, setIsFilteredItem] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [sortPrice, setSortPrice] = useState("")
  const [skipPerPage, setSkipPerPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [priceRangeValue, setPriceRangeValue] = useState([0, 50]);
  const [wishCount, setWishCount] = useState([]);
  const { data, status } = useQuery(['products', skipPerPage], fetchSkipdata);
  //store data into state for quantity update
  const [newData, setNewData] = useState([]);

  //store data into state to send for add to cart
  const [addCart, setAddCart] = useState([]);

  const handleCategories = () => {
    setshowFilterOption(!showFilterOption);
  }
  // multi filter option 
  const filterOptions = (data) => {
    const addBtnOptions = [...isFilteredItem]
    addBtnOptions.push(data);
    setIsFilteredItem(addBtnOptions);
  }

  //single filter 
  const productList = isFilteredItem && searchInput ? data?.filter?.(item => 
    item[isFilteredItem]?.toLowerCase?.().includes(searchInput.toLowerCase()) === searchInput?.toLowerCase?.().includes(searchInput.toLowerCase()))
    : newData

  // for pagination
  const fetchdata = async () => {
    return await fetch(`https://dummyjson.com/products`)
      .then((response) => response.json())
      .then((data) => {
        setTotalDataLength(data?.products?.length)
      }).catch((e) => {
        console.log(e)
      });
  };

  const handlePriceRangeChange = (event: any, newValue: number) => {
    setPriceRangeValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageCount(newPage);
    if (skipPerPage < totalDataLength) {
      setSkipPerPage((newPage) * 8)
    }
  };
  // FOR FILTER ACC TO RANGE 
  let minValue = priceRangeValue[0];
  let maxValue = priceRangeValue[1];
  const filterPriceRange = data?.filter((item) => {
    if (item.price >= minValue && item.price <= maxValue) {
      return item
    }
  })

  // FOR WISHLIST
  const addToWishList = (products,index) => {
    // let isWish = !products.wishlist;
    // let add = [...newData]
    // add[index].wishlist = isWish
    // setNewData(arr)

    let obj = {
      id: products.id,
      wishlist: true
    }

    let arr = [...wishCount]
    arr.push(obj)
    setWishCount(arr)
    localStorage.setItem("wishList", JSON.stringify(wishCount))
  }

  // FOR SKIP FUNCTION
  useEffect(() => {
    if (skipPerPage > 1) {
      fetchSkipdata(skipPerPage)
    }
  }, [skipPerPage])

  //price filter
  useEffect(() => {
    if (sortPrice === "High to Low") {
      newData?.sort((a, b) => a.price - b.price);
    }
    else {
      newData?.sort((a, b) => b.price - a.price);
    }
  }, [sortPrice])

  //add to cart function for button
  const addToCart = (products) => {
    let arr = [...addCart]
    arr?.push(products)
    setAddCart(arr);
    localStorage.setItem("addToCart", JSON.stringify(addCart))
  }

  // initial api data
  useEffect(() => {
    fetchdata()

  }, [])
  // make function to add quantity key to api data

  useEffect(() => {
    if (data) {
      let arr = data?.map((item) => {
        item.quantity = 0
        item.wishlist = false
        return item;
      })
      setNewData(arr);
    }
  }, [data])

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
        <div className="pricebar mt-4">
          <div>
            <Link to={{
              pathname: '/product/wishlist',
            }}
              state={wishCount}
            >
              <HiHeart className='heart-icon' />
              My wishlist
            </Link>
            <Link to={{ pathname: `/product/cart` }}
              state={addCart}
              style={{ marginLeft: 20 }}
            >
              <GiShoppingCart className='heart-icon' />
              My Cart
            </Link>
          </div>
          <div className='d-flex'>
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
      </div>
      {status === "loading" &&
        <div className='loaderWrap'>
          <Spinner color="primary" />
        </div>
      }
      <div className="product-cards">
        {status === "success" &&
          (productList?.map((products, index) => {
            return (
              <div className="card pb-4">
                <div className='wishlistIcon' onClick={() => addToWishList(products)}>
                  {products.wishlist === true ?
                    <HiHeart />
                    :
                    <HiOutlineHeart />
                  }
                </div>
                <div
                  onClick={() => navigate(`/product/${products.id}`)}
                >
                  <div>
                    <div className='imgBox'>
                      {status === "loading" ?
                        <Spinner color="primary" />
                        : <img src={products.images[0]} alt="img" className='w-100 h-100' />
                      }
                    </div>
                  </div>
                  <div className="p-3">
                    <p className='text-decoration-underline'><b>{products.title}</b></p>
                    <p>Brand: <b>{products.brand}</b></p>
                    <p>Category: <b>{products.category}</b></p>
                    <p>Price: <b>{products.price}</b></p>
                    <p className='desc'>{products.description}</p>
                  </div>
                </div>
                {/* quantity btn */}
                <div className='d-flex align-items-center justify-content-center mb-3'>
                  <b>Quantity: </b>
                  <button className="quantityBtn" onClick={() => {
                    let num = products.quantity - 1;
                    let arr = [...newData]
                    if(num >0) {
                    arr[index].quantity = num
                    setNewData(arr)
                    }
                  }}
                  >
                    -
                  </button>
                  {products.quantity}
                  <button className="quantityBtn" onClick={() => {
                    let num = products.quantity + 1;
                    let arr = [...newData]
                    arr[index].quantity = num
                    setNewData(arr)
                  }}
                  >
                    +
                  </button>
                </div>
                <button className='listbtn d-block w-75 m-auto primaryColor' onClick={() => addToCart(products)}>
                  Add to Cart
                </button>
              </div>
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