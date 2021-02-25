import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext)

  const formattedCompletedChallenges = String(challengesCompleted).padStart(2, '0')
  return (
    <div className={styles.completedChallenges}>
      <span>Desafios Completos</span>
      <span>{formattedCompletedChallenges}</span>
    </div>
  )
}