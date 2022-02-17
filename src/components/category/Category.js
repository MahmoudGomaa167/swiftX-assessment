import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import './Category.css'
import { Product } from '../product/Product';





const Category = ({ productData, currency, setCart, cart, setCount }) => {
    const { type } = useParams();
    const [products, setProducts] = useState([]);



    useEffect(() => {
        if (productData) {
            if (type === 'all') {
                setProducts(productData.category.products);
            } if (type === 'clothes') {
                setProducts(productData.category.products.filter(product => product.category === type))
            } if (type === 'tech') {
                setProducts(productData.category.products.filter(product => product.category === type))
            }
        }
    }, [productData, type])




    return (
        <main className='category'>
            <div className='container'>
                <h1>{type} category</h1>
                <div className='products'>
                    {products && products.map(product => (
                        <Product className='item' key={product.id} product={product} currency={currency} setCart={setCart} cart={cart} setCount={setCount} />

                    ))}

                </div>
            </div>
        </main>

    );
};

export default Category;
