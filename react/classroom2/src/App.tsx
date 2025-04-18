import { useEffect, useState } from 'react'
import styles from './app.module.css'

import { Button } from './components/Button'
import { Header } from "./components/Header"
import { Input } from './components/Input'
import { Letter } from './components/Letter'
import { LettersUsed, LetterUsedProps } from './components/LettersUsed'
import { Tip } from './components/Tip'
import { Challenge, WORDS } from './utils/words'

const ATTEMPTS_MARGIN = 3
function App() {
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState('');
  const [lettersUsed, setLettersUsed] = useState<LetterUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [shake, setShake] = useState(false);

  function resetStates() {
    setLetter('')
    setLettersUsed([])
    setScore(0)
  }

  function startGame() {
    resetStates()

    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)
  }
  
  function handleRestartGame() {
    const isConfirmed = window.confirm("Você tem certeza que deseja reiniciar?")

    if(isConfirmed) {
      startGame()
    }
  }

  function handleConfirm() {
    if(!challenge) {
      return
    }

    if(!letter.trim()) {
      return alert("Digite uma letra!")
    }

    const value = letter.toUpperCase()
    const letterExists = lettersUsed.find((used) => used.value === value)

    if(letterExists) {
      return alert("Você já utilizou a letra!")
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length
    
    const correct = hits > 0
    const currentScore = score + hits
    
    setLettersUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)
    setLetter("")

    if(!correct) {
      setShake(true);

      setTimeout(() => setShake(false), 300);
    }
  }

  function endGame(message: string) {
    alert(message)
    startGame()
  }
  
  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    if(!challenge) {
      return
    }

    setTimeout(() => {
      if(score === challenge.word.length) {
        return endGame("Parabéns, você descobriu a palavra!")
      }

      if(lettersUsed.length === challenge.word.length + ATTEMPTS_MARGIN) {
        return endGame("Que pena, você usou todas as tentativas.")
      }
    }, 200)

  }, [score, lettersUsed.length, challenge])

  if(!challenge) {
    return
  }

  return (
    <div className={styles.container}>
      <main>
        <Header 
          current={lettersUsed.length} 
          max={challenge.word.length + ATTEMPTS_MARGIN} 
          onRestart={handleRestartGame} 
        />
        <Tip tip={challenge.tip} />
        <div className={`${styles.word} ${shake && styles.shake}`}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find((used) => used.value === letter.toUpperCase())

            return (
              <Letter key={index} value={letterUsed?.value} color={letterUsed?.correct ? 'correct' : "default"} />
            )
          })}
        </div>
        <h4>Palpites</h4>
        <div className={styles.guess}>
          <Input 
            type='text' 
            autoFocus 
            maxLength={1} 
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title='Confirmar' onClick={handleConfirm} />
        </div>
        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  )
}

export default App
