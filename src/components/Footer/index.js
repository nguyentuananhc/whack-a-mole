import React from 'react'
import './index.scss'

import { useDispatch, useSelector } from 'react-redux'
import { REDUCER_NAME, actions } from 'containers/Game/slice'
import Button from 'containers/Game/components/Button'

const Footer = () => {
    const dispatch = useDispatch()
    const { currentIndex } = useSelector((state) => state[REDUCER_NAME])

    const fixedArr = Array(5)
        .fill()
        .map((_, index) => index)

    return (
        <footer className="footer-wrapper">
            {currentIndex !== 0 && currentIndex !== 5 && (
                <li className="nav-dots" id="hide-on-share-footer-dots">
                    {fixedArr.map((item, index) => {
                        const activeCondition = index + 1 === currentIndex
                        return (
                            <label
                                key={item}
                                className={`nav-dot ${
                                    activeCondition ? 'active' : ''
                                }`}
                            ></label>
                        )
                    })}
                </li>
            )}
            {currentIndex === 5 && (
                <Button
                    onClick={() =>
                        dispatch(actions.setMultiShareStatusRequest())
                    }
                >
                    Chia sẻ
                </Button>
            )}
        </footer>
    )
}

export default Footer
