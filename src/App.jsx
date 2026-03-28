import { useState } from 'react'
import './App.css'
import languages from './language.js'

export default function Endgame() {
    
    const languageElements = languages.map((lang) =>{
        return(
            <span 
               key={lang.name}
               name={lang.name}
               style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color
            }}
            >
                {lang.name}
            </span>   
        )
    })

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
        </main>
    )
}
