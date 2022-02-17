import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Modal.css'

const Modal = ({ isOpen, cart, setCart, currency, totalPrice, setTotalPrice }) => {
    const [value, setValue] = useState(false);
    const [symbol, setSymbol] = useState();


    useEffect(() => {
        if (cart.length > 0) {
            setTotalPrice(cart.map(product => product.total * product.qty).reduce((a, b) => (a + b)));
            setSymbol(cart.map(product => product.prices)[0].filter(price => price.currency.label === currency)[0].currency.symbol);

        }
    }, [cart, currency])

    const onAdd = (product) => {
        product.qty++;
        setTotalPrice(cart.map(product => product.total * product.qty).reduce((a, b) => +(a + b).toFixed(2)));
        console.log(product.total)
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


        <div className='modal' style={{ display: isOpen ? "flex" : "none" }}>
            <div className='cart-container'>
                <h4 className='bag'>my bag <span>{cart.length} items</span></h4>
                {cart && cart.map((item) =>
                (<div key={item.id} className='cart-item'>
                    <div className='item-description'>
                        <h3>{item.brand}<br /> {item.name}</h3>
                        <p>
                            {item.prices.map((price, priceIndex) => (
                                <span key={priceIndex}>
                                    <span>{price.currency.label === currency && price.currency.symbol}</span>
                                    <span>{price.currency.label === currency && (item.qty * price.amount).toFixed(2)}</span>
                                </span>

                            ))}
                        </p>
                        <div className='item-size'>
                            {item.attributes.length > 0 && item.attributes[0].items.map((item, i) => (
                                <span key={item.value} className={`${i === 0 ? 'active' : ''}`}>{item.value}</span>
                            ))}
                        </div>



                    </div>

                    <div className='item-quantity'>
                        <span onClick={() => onAdd(item)}>+</span>
                        <span className='count'>{item.qty}</span>
                        <span onClick={() => onRemove(item)}>-</span>
                    </div>

                    <div className='item-image'>
                        <img src={item.gallery[0]} alt={item.name} />
                    </div>
                </div>)
                )}

                <div className='total-price'>
                    <h3>total</h3>
                    <p>{symbol}{totalPrice && totalPrice.toFixed(2)}</p>
                </div>


                <div className='cart-buttons'>
                    <Link className='view' to={'/cart'}>view bag</Link>
                    <Link className='check' to={'/'}>check out</Link>
                </div>
            </div>

        </div>



    );
};

export default Modal;
