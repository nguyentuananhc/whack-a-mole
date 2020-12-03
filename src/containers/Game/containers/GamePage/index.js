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
        1: 'translate(0, 110%)',
        2: 'translate(0, 110%)',
        3: 'translate(0, 110%)',
        4: 'translate(0, 110%)',
        5: 'translate(0, 110%)',
        6: 'translate(0, 110%)',
        7: 'translate(0, 110%)',
        8: 'translate(0, 110%)',
        9: 'translate(0, 110%)',
        gameHasStarted: false,
        moleHasBeenWhacked: false,
        score: 0,
        lastMole: [],
        display: 'false',
        gameOver: 'none',
        life: 3,
    })

    const setGameState = (state) => {
        setGame((prev) => ({
            ...prev,
            ...state,
        }))
    }

    const clearMoles = () => {
        for (let value in gameState) {
            if (!isNaN(value)) {
                setGameState({
                    [value]: 'translate(0, 110%)',
                })
            }
        }
    }

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
            [threeFirstMoles[0]]: 'translate(0, 15%)',
            [threeFirstMoles[1]]: 'translate(0, 15%)',
            [threeFirstMoles[2]]: 'translate(0, 15%)',
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
            {/* <button onClick={timeOut}>start</button> */}
            <div>{count}</div>
            <div className="game">{createMoleHoles()}</div>
        </div>
    )
}

export default GamePage
