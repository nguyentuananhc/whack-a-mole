import React, { Component } from 'react'
const MoleHole = (props) => {
    return (
        <div className="game__hole" style={{ display: props.context.display }}>
            <div className="game__whack">
                <div
                    className={`mole ${
                        props.context[props.holeNumber].type === 0
                            ? 'game__mole_another'
                            : 'game__mole'
                    } `}
                    onClick={props.onClick}
                    style={{
                        WebkitTransform: props.context[props.holeNumber]
                            .isShowUp
                            ? 'translate(0, 15%)'
                            : 'translate(0, 110%)',
                    }}
                />
                <div className="game__mound" />
            </div>
        </div>
    )
}

export default MoleHole
