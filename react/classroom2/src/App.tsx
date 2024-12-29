import styles from './app.module.css'
import { Button } from './components/Button'

import { Header } from "./components/Header"
import { Letter } from './components/Letter'
import { Tip } from './components/Tip'

function App() {
  function handleRestartGame() {
    alert("Reiniciar jogo")
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame} />
        <Tip tip='Uma das linguagens de programação mais utilizada' />
        <div className={styles.word}>
          <Letter value='R' />
          <Letter value='E' />
          <Letter value='A' />
          <Letter value='C' />
          <Letter value='T' />
        </div>
        <h4>Palpites</h4>
        <div className={styles.guess}>
          <Button title='Confirmar' />
        </div>
      </main>
    </div>
  )
}

export default App
