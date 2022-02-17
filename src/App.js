import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import Category from './components/category/Category';
import Navbar from './components/navbar/Navbar';
import ProductDetails from './components/productDetails/ProductDetails';
import Modal from './components/modal/Modal';
import Cart from './components/cart/Cart';
import NotFound from './components/not-found/NotFound';
import './App.css';

const GET_DATA = gql`
  query GetData{
    categories{
      name
      products{
        id
        name
        inStock
        gallery
        description
        category
        brand
        prices{
          amount
          currency{
            label
            symbol
          }
        }
        attributes{
          items{
            value
            displayValue
            id
          }
        }
      }
    }
  }
`

const GET_Currencies = gql`
  query GetCurrencies{
    currencies{
      label
      symbol
    }
  }
`

const GET_PRODUCTDETAILS = gql`
  query GetProductDetails{
    category{
      name
      products{
        id
        name
        inStock
        brand
        category
        gallery
        description

        prices{
          amount
          currency{
            label
            symbol
          }
        }
        attributes{
          name
          items{
            displayValue
            value
            id
          }
        }
      }
    }
  }
`



function App() {
  const [openModal, setOpenModal] = useState(false);
  const { loading, error, data } = useQuery(GET_DATA);
  const { data: currenciesData } = useQuery(GET_Currencies)
  const { data: productData } = useQuery(GET_PRODUCTDETAILS);
  const [cart, setCart] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [totalPrice, setTotalPrice] = useState();



  if (loading) return (<p>Loading...</p>);
  if (error) return (<p>{error.message}</p>)

  return (
    <div className="App">
      <Navbar
        openModal={openModal}
        setModal={setOpenModal}
        data={data}
        currenciesData={currenciesData}
        cart={cart}
        setCurrency={setCurrency} />
      <Routes>
        <Route path='/' element={<Navigate to={'category/all'} />} />
        <Route path='cart' element={<Cart cart={cart} currency={currency} setCart={setCart} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
        <Route path='category/:type' element={<Category currency={currency} setCart={setCart} cart={cart} productData={productData} />} />
        <Route path='category/:type/:id' element={<ProductDetails productData={productData} currency={currency} setCart={setCart} cart={cart} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Modal isOpen={openModal} cart={cart} currency={currency} productData={productData} setCart={setCart} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />

    </div>
  );
}

export default App;
