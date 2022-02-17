import React, { useEffect, useState } from 'react';

import './Product.css';
import cartIcon from '../../assets/Empty Cart white.svg'
import { useNavigate } from 'react-router-dom';




export const Product = ({ product, currency, setCart, cart }) => {

    const [price, setPrice] = useState(product.prices.filter(price => price.currency.label === currency));
    const navigate = useNavigate()

    useEffect(() => {
        if (product) {
            setPrice(product.prices.filter(price => price.currency.label === currency));
        }
    }, [currency, product, cart]);

    const handleClick = (product) => {
        if (!product.inStock) return;

        const exist = cart.find(item => item.id === product.id);
        if (exist) {
            setCart(cart.map(item => item.id === product.id ? { ...product, qty: exist.qty + 1, total: Number(exist.prices.filter(price => price.currency.label === currency)[0].amount) } : item));
        } else {
            setCart([...cart, { ...product, qty: 1, total: Number(product.prices.filter(price => price.currency.label === currency)[0].amount) }]);

        }


    }

    return (
        <div className='product'>
            <div className='image'>
                <img className={`product-image ${product.inStock ? '' : 'out-of-stock'}`} src={product.gallery[0]} alt={product.name} onClick={() => navigate(product.id)} />
                <span className='out' style={{ display: product.inStock ? 'none' : 'flex' }}>out of stock</span>
            </div>
            <h4 className='product-title'>{product.name}</h4>
            <p className='product-price'>
                {price && price.map(p => (
                    <span key={p.currency.label}>{p.currency.symbol}{p.amount}</span>
                ))}
            </p>

            <span className='add-to-cart' onClick={() => handleClick(product)}>
                <img key={product.name} src={cartIcon} alt='cart icon' />
            </span>
        </div>

    );
};
