import React from 'react'
import { useDispatch } from 'react-redux'

import MoleHole from 'containers/Game/components/MoleHole'
import { actions } from 'containers/Game/slice'

import './index.scss'

let NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const TICK = [400, 600, 800, 1000]

const LIST_ITEM = [
    { name: 'ITEM', pct: 70, type: 1 },
    { name: 'BOOM', pct: 30, type: 0 },
]

const expanded = LIST_ITEM.flatMap((item) => Array(item.pct).fill(item))

const useAnimationFrame = (callback, count, isGameOver) => {
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
        if (isGameOver) cancelAnimationFrame(requestRef.current)
    }, [isGameOver])

    React.useEffect(() => {
        if (count > 10 && count < 20) setIndex(3)
        if (count > 20 && count < 30) setIndex(2)
        if (count > 30) setIndex(1)
        if (count === 40) cancelAnimationFrame(requestRef.current)
    }, [count])

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current)
    }, [index]) // Make sure the effect runs only once
}

function GamePage() {
    const dispatch = useDispatch()
    const [count, setCount] = React.useState(0)

    const [gameState, setGame] = React.useState({
        holesArr: NUMS,
        1: { isShowUp: false, type: 0 },
        2: { isShowUp: false, type: 0 },
        3: { isShowUp: false, type: 0 },
        4: { isShowUp: false, type: 0 },
        5: { isShowUp: false, type: 0 },
        6: { isShowUp: false, type: 0 },
        7: { isShowUp: false, type: 0 },
        8: { isShowUp: false, type: 0 },
        9: { isShowUp: false, type: 0 },
        gameOver: false,
        moleHasBeenWhacked: false,
        score: 0,
        lastMole: [],
        lastBoom: [],
        display: 'false',
        gameOver: false,
        life: 3,
        timeUp: true,
    })

    const clearMoles = () => {
        for (let value in gameState) {
            if (!isNaN(value)) {
                setGameState({
                    [value]: { ...gameState[value], isShowUp: false },
                })
            }
        }
    }

    useAnimationFrame(
        () => {
            setCount((prevCount) => (prevCount += 1))
        },
        count,
        gameState.gameOver
    )

    React.useEffect(() => {
        if (count) displayMoles()
        if ([5, 20, 30].includes(count)) {
            clearMoles()
        }
    }, [count])

    React.useEffect(() => {
        if (gameState.life === 0 || count === 40) {
            setGameState({ gameOver: true })
        }
    }, [gameState.life, count])

    React.useEffect(() => {
        if (gameState.gameOver) {
            dispatch(actions.saveScoreRequest(gameState.score))
            dispatch(actions.setCurrentIndexRequest(2))
        }
    }, [gameState.gameOver])

    const setGameState = (state) => {
        setGame((prev) => ({
            ...prev,
            ...state,
        }))
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
            [threeFirstMoles[0]]: { isShowUp: true, type: 1 },
            [threeFirstMoles[1]]: {
                isShowUp: true,
                type: 1,
            },
            [threeFirstMoles[2]]: {
                isShowUp: true,
                type: 0,
            },
            lastMole: threeFirstMoles,
            holesArr: [...restMoles].concat(gameState.lastMole),
        })
    }

    const lockOutClick = () => {
        window.setTimeout(() => {
            setGameState({ moleHasBeenWhacked: false })
        }, 350)
    }

    const addToScore = (e, gameState, i) => {
        if (gameState.moleHasBeenWhacked) {
            return
        }
        let target = e.target
        target.parentNode.classList.add('game__cross')
        target.classList.add('no-background')
        lockOutClick()
        const type = gameState[i].type
        const update =
            type === 1
                ? { score: gameState.score + 1 }
                : {
                      life: gameState.life - 1,
                  }
        setGameState({
            ...update,
            moleHasBeenWhacked: true,
        })
        window.setTimeout(function () {
            target.parentNode.classList.remove('game__cross')
            target.classList.remove('no-background')
        }, 500)
    }

    const createMoleHoles = () => {
        var holes = []
        for (let i = 1; i <= 9; i++) {
            holes.push(
                <MoleHole
                    key={i}
                    context={gameState}
                    onClick={(e) => addToScore(e, gameState, i)}
                    holeNumber={i}
                />
            )
        }
        return <div className="board">{holes}</div>
    }

    return (
        <div className="main-container">
            <div>
                {/* <div>{count}</div> */}
                <div>LIFE:{gameState.life}</div>
                <div>SCORE:{gameState.score}</div>
            </div>

            <div className="game">{createMoleHoles()}</div>
        </div>
    )
}

export default GamePage
