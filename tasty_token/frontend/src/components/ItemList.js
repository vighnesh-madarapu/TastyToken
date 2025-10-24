import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/items')
            .then(res => setItems(res.data))
            .catch(err => console.log(err));
    }, []);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h2>Menu</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {items.map(item => (
                    <div key={item._id} style={{ border: '1px solid #ccc', padding: '10px', width: '150px' }}>
                        <h4>{item.name}</h4>
                        <p>Category: {item.category}</p>
                        <p>Price: ₹{item.price}</p>
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <h2>Cart</h2>
            <ul>
                {cart.map((item, index) => <li key={index}>{item.name} - ₹{item.price}</li>)}
            </ul>
            <h3>Total: ₹{totalPrice}</h3>
        </div>
    );
};

export default ItemList;