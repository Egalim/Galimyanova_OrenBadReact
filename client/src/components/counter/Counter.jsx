import React, { useState } from 'react'
import './Counter.css'

export default function Counter() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <div className='counter'>
            <button onClick={handleDecrement}><h1 className='lettering_semi_bold'>–</h1></button>
            <h2 className='lettering_semi_bold'>{count}</h2>
            <button onClick={handleIncrement}><h1 className='lettering_semi_bold'>+</h1></button>
        </div>
    )
}
