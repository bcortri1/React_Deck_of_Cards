import React, {useState} from 'react';
import './Card.css';


const Card = ({deckId, image, suit, value}) => {
    const [{angle, x, y}] = useState({angle: Math.random() * 90 - 45,x: Math.random() * 40 - 20,y: Math.random() * 40 - 20});
    const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

    return<>
        <img className='Card' src={image} alt={`${value} OF ${suit}`} style={{transform}}/>
    </>;
}

export default Card;