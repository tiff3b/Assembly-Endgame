import { useState, useEffect } from 'react'
import './App.css'
import languages from './language.js'
import { clsx } from 'clsx'
import {getFarewellText, randomWord} from './utils.js'
import confetti from "canvas-confetti"

export default function Endgame() {

    const [currentWord, setCurrentWord] = useState(() => randomWord());

    const[guess, setGuess] = useState([]);

    const wrongGuessCount = 
        guess.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = 
            currentWord.split("").every(letter => guess.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length -1
    const isGameOver = isGameWon || isGameLost

    const lastGuessedLetter = guess[guess.length - 1]
    const isLastGuessWrong = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

const lostLanguage = isLastGuessWrong
    ? languages[wrongGuessCount - 1]
    : null

    function GameStatus (){
        if (!isGameOver && lostLanguage) {
            return (
                <p className="farewell" >
                    {getFarewellText(lostLanguage.name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
            <>
            <h2>You win!</h2> 
            <p>Well done!🎉</p>
            </>
            )
         } if (isGameLost) {
            return (
            <>
            <h2> Game over! </h2>
            <p>You lose! Better start learning Assembly 😭</p>
            </>
            )
        }
    }

    useEffect(() => {
        if (isGameWon) {
            confetti()
        }
    }, [isGameWon])
     
    function startNewGame(){
        setCurrentWord(randomWord())
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

    const wordElements = currentWord.split("").map((letter, index) => {
        const wasGuessed = guess.includes(letter)
        
        return(
            <span 
                key={index} 
                className={clsx("letter", {
                    "missed" : isGameLost && !wasGuessed
                })} >
                    {(wasGuessed || isGameLost ? letter.toUpperCase() : "")}
            </span>
    )
})

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
                    onClick={() => handleGuess(keyboard)}
                    disabled={isGameOver}
                    aria-disabled={guess.includes(keyboard)}
                    aria-label={`Letter ${keyboard}`}>

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
            <section 
                aria-live="polite" 
                role="status"
                className={clsx("game-status",{
                win : isGameWon,
                lose : isGameLost,
                farewell : !isGameOver && lostLanguage
            })}>
                <GameStatus />
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
            {isGameOver && <button className="new-game" onClick={startNewGame}> 
                New Game
            </button>
            }
        </main>
    )
}
