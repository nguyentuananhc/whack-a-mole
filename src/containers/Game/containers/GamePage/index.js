import React from 'react'
import { useDispatch } from 'react-redux'

import MoleHole from 'containers/Game/components/MoleHole'
import { actions } from 'containers/Game/slice'

import './index.scss'

let NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const TICK = [600, 800, 1000]

const useAnimationFrame = (callback, count) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef()
    let nextTimeToTick = Date.now()
    const [index, setIndex] = React.useState(2)

    const animate = () => {
        const now = Date.now()
        if (nextTimeToTick <= now) {
            callback()
            nextTimeToTick = now + TICK[index]
        }
        requestRef.current = requestAnimationFrame(animate)
    }

    React.useEffect(() => {
        if (count > 5 && count < 20) setIndex(1)
        if (count > 20) setIndex(0)
        if (count === 30) cancelAnimationFrame(requestRef.current)
    }, [count])

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current)
    }, [index]) // Make sure the effect runs only once
}

function GamePage() {
    const dispatch = useDispatch()
    const [count, setCount] = React.useState(0)

    useAnimationFrame(() => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCount((prevCount) => (prevCount += 1))
    }, count)

    React.useEffect(() => {
        if (count) displayMoles()
    }, [count])

    const [gameState, setGame] = React.useState({
        holesArr: NUMS,
        1: { style: 'translate(0, 110%)', type: 0 },
        2: { style: 'translate(0, 110%)', type: 0 },
        3: { style: 'translate(0, 110%)', type: 0 },
        4: { style: 'translate(0, 110%)', type: 0 },
        5: { style: 'translate(0, 110%)', type: 0 },
        6: { style: 'translate(0, 110%)', type: 0 },
        7: { style: 'translate(0, 110%)', type: 0 },
        8: { style: 'translate(0, 110%)', type: 0 },
        9: { style: 'translate(0, 110%)', type: 0 },
        gameHasStarted: false,
        moleHasBeenWhacked: false,
        score: 0,
        lastMole: [],
        lastBoom: [],
        display: 'false',
        gameOver: 'none',
        life: 3,
        timeUp: true,
    })

    const setGameState = (state) => {
        setGame((prev) => ({
            ...prev,
            ...state,
        }))
    }

    const randomTime = (min, max) => {
        return Math.round(Math.random() * (max - min) + min)
    }

    const randomHole = (holes) => {
        const idx = Math.floor(Math.random() * gameState.holesArr.length)
        const hole = holes[idx]

        if (hole === gameState.lastMole) {
            console.log('Same one')
            return randomHole(holes)
        }

        setGameState({
            lastMole: hole,
        })

        return hole
    }

    const poop = () => {
        const time = randomTime(400, 800)
        const hole = randomHole(gameState.holesArr)
        setGameState({
            [hole]: { style: 'translate(0, 15%)', type: 0 },
        })
        setTimeout(() => {
            clearMoles()
            if (!gameState.timeUp) poop()
        }, time)
    }

    const peep = () => {
        const time = randomTime(400, 800)
        const hole = randomHole(gameState.holesArr)
        setGameState({
            [hole]: { style: 'translate(0, 15%)', type: 1 },
        })
        setTimeout(() => {
            setGameState({
                [hole]: { style: 'translate(0, 110%)', type: 1 },
            })
            if (!gameState.timeUp) peep()
        }, time)
    }

    const clearMoles = () => {
        for (let value in gameState) {
            if (!isNaN(value)) {
                setGameState({
                    [value]: { style: 'translate(0, 110%)', type: 0 },
                })
            }
        }
    }

    React.useEffect(() => {
        if (!gameState.timeUp) {
            peep()
            // poop()
        }
    }, [gameState.timeUp])

    const displayMoles = () => {
        clearMoles()

        let randArr = [
            ...gameState.holesArr.sort(function () {
                return Math.random() - 0.5
            }),
        ]

        const threeFirstMoles = randArr.slice(0, 3)
        const restMoles = randArr.slice(3)

        setGameState({
            [threeFirstMoles[0]]: { style: 'translate(0, 15%)', type: 0 },
            [threeFirstMoles[1]]: { style: 'translate(0, 15%)', type: 0 },
            [threeFirstMoles[2]]: { style: 'translate(0, 15%)', type: 1 },
            lastMole: threeFirstMoles,
            holesArr: [...restMoles].concat(gameState.lastMole),
        })
    }

    const createMoleHoles = () => {
        var holes = []
        for (let i = 1; i <= 9; i++) {
            holes.push(
                <MoleHole
                    key={i}
                    context={gameState}
                    onClick={() => {}}
                    holeNumber={i}
                />
            )
        }
        return <div className="board">{holes}</div>
    }

    return (
        <div className="main-container">
            <button
                onClick={() => {
                    setGameState({ timeUp: false })
                }}
            >
                start
            </button>
            <div>{count}</div>
            <div className="game">{createMoleHoles()}</div>
        </div>
    )
}

export default GamePage
