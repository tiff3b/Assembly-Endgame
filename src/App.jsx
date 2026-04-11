import { useState } from 'react'
import './App.css'
import languages from './language.js'
import { clsx } from 'clsx'

export default function Endgame() {

    const [currentWord, setCurrentWord] = useState("react");

    const[guess, setGuess] = useState([]);

    const wrongGuessCount = 
        guess.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = 
            currentWord.split("").every(letter => guess.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length -1
    const isGameOver = isGameWon || isGameLost
    
    function startNewGame(){
        setCurrentWord("react")
        setGuess([])
    }

    
    function handleGuess(letter) {        
        setGuess(prevGuess => 
            prevGuess.includes(letter) ?
                prevGuess :
            [...prevGuess, letter]
    )
}

    const languageElements = languages.map((lang, index) =>{
        const isLost = index < wrongGuessCount;

        return(
            <span
               className={clsx("chip", {"lost": isLost})} 
               key={lang.name}
               style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color
            }}
            >
                {lang.name}
            </span>   
        )
    })

    const wordElements = currentWord.split("").map((letter, index) => (
        <span key={index} className="letter">
            {guess.includes(letter) ? letter.toUpperCase() : ""}
            </span>
    ))

    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("").map((keyboard, index) => {
        const isGuessed = guess.includes(keyboard);
        const isCorrect = currentWord.includes(keyboard);

        const className= clsx("keyboard", {
            "bg-green" : isGuessed && isCorrect,
            "bg-red" : isGuessed && !isCorrect,
            }) 

        return (
            <button key={index} 
                    className={className}
                    onClick={() => handleGuess(keyboard)}>
                {keyboard.toUpperCase()}
            </button>
        );
    });    

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done!🎉</p>
            </section>  
            <section className="language-chips">
                {languageElements}    
            </section> 
            <section className="word">
                {wordElements}
            </section>  
            <section className="keyboard-display">
                {alphabet}
            </section>
            {isGameOver && <button className="new-game"> 
                New Game
            </button>
            }
        </main>
    )
}
