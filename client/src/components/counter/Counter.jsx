import React, { useEffect, useState } from 'react';
import './Counter.css';

export default function Counter({quantity, onCounterChange, number, price}) {
    const [count, setCount] = useState(number);
    const [showMaxError, setShowMaxError] = useState(false); // Состояние для отслеживания видимости сообщения

    useEffect(() => {
        if (quantity) {
            setCount(number);
        }
    }, [quantity]);

    const handleIncrement = () => {
        if (count < Math.min(quantity, 5)) {
          const newCount = count + 1;
          setCount(newCount);
          setShowMaxError(false); 
          onCounterChange(newCount, price); // Передаем новое значение newCount
        } else {
          setShowMaxError(true);
        }
      };
      
      const handleDecrement = () => {
        if (count > 1) {
          const newCount = count - 1;
          setCount(newCount);
          setShowMaxError(false);
          onCounterChange(newCount, price); // Передаем новое значение newCount
        }
      };
 

    return (
        <>
            <div className='counter'>
                <button onClick={handleDecrement}><h1 className='lettering_semi_bold'>–</h1></button>
                <h2 className='lettering_semi_bold'>{count}</h2>
                <button onClick={handleIncrement}><h1 className='lettering_semi_bold'>+</h1></button>
            </div> 
            <div className="column">
            {showMaxError && <p className="error-label">Нельзя выбрать больше</p>}
            </div>
            </>
    );
}