import axios from 'axios';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const {
    hasFinished,
    isActive,
    minutes,
    seconds,
    resetCountdown,
    startCountdown
  } = useContext(CountdownContext)
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
  
  return (
    <div>
      <div className={styles.countdown}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        isActive ? (
          <button
            onClick={resetCountdown}
            type="button"
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          >
            Abandonar ciclo
          </button>
        ) : (
          <button
            onClick={startCountdown}
            type="button"
            className={styles.countdownButton}
          >
            Iniciar um ciclo
          </button>
        ))}
    </div>
  );
}