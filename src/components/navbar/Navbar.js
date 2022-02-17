import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';
import logo from '../../assets/Brand icon.svg'
import cartIcon from '../../assets/Empty Cart black.svg'
import arrowIcon from '../../assets/Vector.svg'
import './Navbar.css'


const Navbar = ({ setModal, openModal, data, currenciesData, cart, setCurrency }) => {
    const [open, setOpen] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const arrow = useRef();

    useEffect(() => {
        if (data && currenciesData) {
            setCategoryName(data.categories.map(cat => cat.name));
            setCurrencies(currenciesData.currencies)
        }

    }, [currenciesData, data])



    const handlePriceMenu = () => {
        setOpen(!open);
        arrow.current.classList.toggle('active')
    }

    return (
        <header className='navbar'>
            <div className='container'>
                <nav>

                    <div className='category-list'>
                        <ul>
                            {categoryName.map(cat => (
                                <li key={cat}>
                                    <NavLink to={`/category/${cat}`} >{cat}</NavLink>
                                </li>
                            ))}

                        </ul>
                    </div>

                    <div className='logo'>
                        <Link to={'category/all'} >
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className='cart-list'>
                        <ul>
                            <li className='price-exchange' >
                                <div onClick={() => handlePriceMenu()} className='price-details'>
                                    $ <span className='arrow' ref={arrow}>
                                        <img src={arrowIcon} alt='Arrow Icon' />
                                    </span>
                                </div>

                                <ul style={{ display: open ? 'flex' : 'none' }}>
                                    {currencies && currencies.map(cur => (
                                        <li onClick={() => setCurrency(cur.label)} key={cur.label}>{cur.symbol} {cur.label}</li>
                                    ))}
                                </ul>

                            </li>
                            <li onClick={() => setModal(!openModal)} className='cart-icon'>
                                <img src={cartIcon} alt="Cart Icon" />
                                <div className='cart-notification' style={{ display: cart.length > 0 ? 'flex' : 'none' }}>
                                    <span>{cart.length}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
        </header>

    )
};



export default Navbar;
