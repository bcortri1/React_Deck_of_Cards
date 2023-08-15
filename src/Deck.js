import { React, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Deck.css';
import Card from './Card';
import { v4 as uuid } from 'uuid';


const Deck = () => {
    const [deckId, setDeckId] = useState();
    const [cards, setCards] = useState([]);
    const [needShuffle, setShuffle] = useState(false);
    const [autoDraw, setAuto] = useState(false);
    const autoInterval = useRef();


    const shuffleDeck = async () => {
        try {
            let result = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
            if (result.data.success) {
                setCards([]);
                setShuffle(false);
            }
            else {
                throw result.data.error
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const autoDrawToggle = () => {
        setAuto((autoDraw) => !autoDraw);
    }

    useEffect(function fetchAutoToggle(){
        if (autoDraw){
            autoInterval.current = setInterval(async function drawCard(){
                try {
                    let result = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                    if (result.data.success) {
                        let card = result.data.cards[0];
                        let cardElement = <Card key={uuid()} image={card.image} value={card.value} suit={card.suit} />
                        setCards((cards) => [...cards, cardElement]);
                    }
                    else {
                        if (result.data.error==="Not enough cards remaining to draw 1 additional"){
                            autoDrawToggle();
                            alert(result.data.error);
                            setShuffle(true);
                        }
                        throw result.data.error
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }, 1000);
        }
        else{
            clearInterval(autoInterval.current);
        }
    },[autoDraw, deckId])

    useEffect(function fetchDeckWhenMounted() {
        async function newDeck() {
            try {
                let result = await axios.get(`https://deckofcardsapi.com/api/deck/new/`);
                setDeckId(() => result.data.deck_id);
                result = await axios.get(`https://deckofcardsapi.com/api/deck/${result.data.deck_id}/shuffle/`);
            }
            catch (err) {
                console.error(err);
            }
        }
        newDeck();
        
    }, [])

    return <div className='Deck'>
        <div>
            {needShuffle ? 
            <button className='Draw' onClick={shuffleDeck}>Shuffle Deck?</button> : 
            <button className='Draw' onClick={autoDrawToggle}>{autoDraw ? "Stop Drawing":"Start Drawing"}</button>}
        </div>
        <div> 
            {cards}
        </div>
    </div>;
}

export default Deck;