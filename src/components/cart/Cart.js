
import React, { useState, useEffect } from 'react';
import './Cart.css'


const Cart = ({ cart, currency, setCart, setTotalPrice }) => {
    const [value, setValue] = useState(false);

    useEffect(() => {
        if (cart.length > 0) {
            cart.map(product => product.total * product.qty).reduce((a, b) => (a + b))
        }
    }, [value])

    const onAdd = (product) => {
        product.qty++;
        setTotalPrice(cart.map(product => product.total * product.qty).reduce((a, b) => +(a + b).toFixed(2)));
        setValue(!value)
    }

    const onRemove = (product) => {
        product.qty--;
        setTotalPrice(cart.map(product => product.total * product.qty).reduce((a, b) => +(a + b).toFixed(2)));
        if (product.qty < 1) {
            setCart(cart.filter(item => item.id !== product.id));
        }
        setValue(!value)
    }






    return (
        <main className='cart'>
            <div className='container'>
                <h1>cart</h1>

                <div className='cart-page-item'>
                    {cart.length > 0 && cart.map((item, itemIndex) => (
                        <div className='cart-item'>
                            <div className='item-description'>
                                <h3><span>{item.brand}</span><br /> {item.name}</h3>
                                <p className='cart-price'>
                                    {item.prices.map((price, priceIndex) => (
                                        <span key={priceIndex}>
                                            <span>{price.currency.label === currency && price.currency.symbol}</span>
                                            <span>{price.currency.label === currency && (item.qty * price.amount).toFixed(2)}</span>
                                        </span>

                                    ))}
                                </p>
                                <div className='item-size'>
                                    {item.attributes.length > 0 && item.attributes.map(attr => (
                                        <div style={{ display: 'flex' }}>
                                            {attr.items.map((item, index) => (
                                                <span style={{ backgroundColor: attr.name === 'Color' ? item.value : '' }} key={index} className={index === 0 ? 'active' : ''}>{attr.name === 'Color' ? '' : item.value}</span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='item-quantity'>
                                <div className='quantity'>
                                    <span onClick={() => onAdd(item)}>+</span>

                                    <span className='count'>{item.qty}</span>


                                    <span onClick={() => onRemove(item)}>-</span>
                                </div>

                                <div className='item-image'>
                                    <img src={item.gallery[0]} alt={item.name} />
                                </div>
                            </div>


                        </div>
                    ))}




                </div>
            </div>
        </main>
    );
};

export default Cart;
