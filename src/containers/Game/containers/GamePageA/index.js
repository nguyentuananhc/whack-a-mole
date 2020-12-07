import React from 'react'
import { useDispatch } from 'react-redux'

import MoleHole from 'containers/Game/components/MoleHole'
import { actions } from 'containers/Game/slice'

import './index.scss'

let timeUp = true

const NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const LIST_ITEM = [
    { name: 'ITEM', pct: 70, type: 1 },
    { name: 'BOOM', pct: 30, type: 0 },
]

const expanded = LIST_ITEM.flatMap((item) => Array(item.pct).fill(item))
// const winner = expanded[Math.floor(Math.random() * expanded.length)]

function GamePage() {
    const [gameState, setGame] = React.useState({
        1: { isShowUp: false, type: 0 },
        2: { isShowUp: false, type: 0 },
        3: { isShowUp: false, type: 0 },
        4: { isShowUp: false, type: 0 },
        5: { isShowUp: false, type: 0 },
        6: { isShowUp: false, type: 0 },
        7: { isShowUp: false, type: 0 },
        8: { isShowUp: false, type: 0 },
        9: { isShowUp: false, type: 0 },
        gameHasStarted: false,
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

    const randomTime = (min, max) => {
        return Math.round(Math.random() * (max - min) + min)
    }

    const randomHole = () => {
        const idx = Math.floor(Math.random() * 9)
        const hole = NUMS[idx]

        if (gameState[hole].isShowUp) {
            return
        }
        // if (hole.lastMole.includes(hole)) {
        //     return randomHole()
        // }

        setGameState({
            lastMole: [...gameState.lastMole].concat(hole),
        })
        return hole
    }

    const peep = () => {
        const hole = randomHole()

        if (!hole) return

        const time = randomTime(500, 1000)
        const winner = expanded[Math.floor(Math.random() * expanded.length)]

        setGameState({
            [hole]: { isShowUp: true, type: winner.type },
        })

        setTimeout(() => {
            setGameState({
                [hole]: { isShowUp: false, type: winner.type },
                lastMole: [...gameState.lastMole].filter(
                    (item) => item !== hole
                ),
            })
        }, time)

        setTimeout(() => {
            if (!timeUp) peep()
        }, time + 400)
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
                    timeUp = false
                    peep()
                    peep()
                    // setTimeout(() => (timeUp = true), 10000)
                }}
            >
                start/stop haha
            </button>

            <div>{count}</div>
            <div className="game">{createMoleHoles()}</div>
        </div>
    )
}

export default GamePage
