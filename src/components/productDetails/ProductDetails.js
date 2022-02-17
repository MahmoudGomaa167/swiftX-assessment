import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css'

const ProductDetails = ({ productData, currency, setCart, cart }) => {

    const { id } = useParams();
    const [product, setProduct] = useState();
    const [price, setPrice] = useState();
    const bigImage = useRef()

    useEffect(() => {
        if (productData) {
            setProduct(productData.category.products.filter(product => product.id === id)[0]);
            setPrice(productData.category.products.filter(product => product.id === id)[0].prices
                .filter(price => price.currency.label === 'USD')[0])
        }
        if (product) {
            setPrice(product.prices.filter(price => price.currency.label === currency)[0]);

        }

    }, [id, productData, product, currency])

    const handleSmallImageClick = (e) => {
        bigImage.current.src = e.target.src
    }

    const handleItemsClick = (e) => {
        let allItems = [...e.target.closest('ul').children];
        allItems.forEach(item => { item.classList.remove('active') });
        e.target.classList.add('active')
    }

    const handleCart = (product) => {
        if (!product.inStock) return;
        const exist = cart.find(item => item.id === product.id)
        if (exist) {
            setCart(cart.map(item => item.id === product.id ? { ...product, qty: exist.qty + 1, total: Number(exist.prices.filter(price => price.currency.label === currency)[0].amount) } : item))
        } else {
            setCart([...cart, { ...product, qty: 1, total: Number(product.prices.filter(price => price.currency.label === currency)[0].amount) }])

        }

    }

    return (
        <main className='product-details'>
            <div className='container'>
                <div className='product-images'>
                    <ul>
                        {product && product.gallery.map(image => (
                            <li onClick={(e) => handleSmallImageClick(e)} key={image}>
                                <img src={image} alt={product.name} />
                            </li>
                        ))}

                    </ul>
                </div>

                <div className={`product-main-image ${product && product.inStock ? '' : 'out-of-stock'}`}>
                    <img src={product && product.gallery[0]} alt={product && product.name} ref={bigImage} />
                    <span className='out' style={{ display: product && product.inStock ? 'none' : 'flex' }}>out of stock</span>
                </div>

                <div className='product-description'>
                    <h2 className='main-title'>{product && product.brand}</h2>
                    <p className='second-title'>{product && product.name}</p>
                    {product && product.attributes.map(attr => (
                        <div key={attr.name} className='size'>
                            <h5>{attr.name}:</h5>
                            <ul className='size-list'>
                                {attr.items.map((item, i) => (
                                    <li
                                        key={item.id}
                                        style={{
                                            color: item.displayValue === 'Black' ? "#fff" : item.displayValue === 'White' ? '#1d1f22' : '',
                                            backgroundColor: attr.name === 'Color' ? item.value : '',
                                        }}
                                        className={i === 0 ? 'active' : ''}
                                        onClick={(e) => handleItemsClick(e)}
                                    >
                                        {attr.name === 'Color' ? '' : item.value}
                                    </li>
                                ))}


                            </ul>
                        </div>
                    ))}


                    <div className='price'>
                        <h5>price:</h5>
                        <p>{price && price.currency.symbol}{price && price.amount}</p>
                    </div>

                    <div className='cart-button'>
                        <button onClick={() => handleCart(product)}>add to cart</button>
                    </div>

                    <div className='product-brief' dangerouslySetInnerHTML={{ __html: product && product.description }}>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;
