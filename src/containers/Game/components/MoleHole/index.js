import React, { Component } from 'react'

const LIST_ITEM = [
    { name: 'ITEM', pct: 70 },
    { name: 'BOOM', pct: 30 },
]

class MoleHole extends Component {
    render() {
        // const expanded = LIST_ITEM.flatMap((item) => Array(item.pct).fill(item))
        // const winner = expanded[Math.floor(Math.random() * expanded.length)]
        const winner = LIST_ITEM[0]

        if (winner.name)
            return (
                <div
                    className="game__hole"
                    style={{ display: this.props.context.display }}
                >
                    <div className="game__whack">
                        <div
                            className={`${
                                this.props.context[this.props.holeNumber]
                                    .type === 0
                                    ? 'game__mole_another'
                                    : 'game__mole'
                            } `}
                            onClick={this.props.onClick}
                            style={{
                                WebkitTransform: this.props.context[
                                    this.props.holeNumber
                                ].style,
                            }}
                        >
                        </div>
                        <div className="game__mound"></div>
                    </div>
                </div>
            )
        return <></>
    }
}

export default MoleHole
