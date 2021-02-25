import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  activeChallenge: Challenge;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  levelUp: () => void;
  addExperience: (exp: number) => void;
  completeChallenge: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps {
  children: ReactNode;
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])
  
  function levelUp() {
    setLevel(level + 1)
  }

  function addExperience(exp: number) {
    setCurrentExperience(currentExperience + exp)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio("/notification.mp3").play()
    
    if (Notification.permission === "granted") {
      new Notification("Novo desafio 💃", {
        body: `Valendo ${challenge.amount} xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge
    let finalExperience = currentExperience + amount

    if(finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        activeChallenge,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        levelUp,
        addExperience,
        completeChallenge,
        startNewChallenge,
        resetChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}
