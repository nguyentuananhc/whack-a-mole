import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import { REDUCER_NAME, actions } from 'containers/Game/slice'

import './index.scss'

const Header = () => {
    const dispatch = useDispatch()
    const { currentIndex } = useSelector((state) => state[REDUCER_NAME])

    const [isClose, setClose] = useState(false)

    const handleClose = () => {
        setClose(true)
    }

    useEffect(() => {
        if (isClose) {
            if (window?.androidAppProxy) {
                window.androidAppProxy?.requestMobileService(
                    '{"type":"backToPreviousView", "message":""}'
                )
            }
            if (window?.webkit) {
                window.webkit?.messageHandlers?.backToPreviousView?.postMessage(
                    'test'
                )
            }
        }
    }, [isClose])

    const handleShare = () => {
        dispatch(actions.setMultiShareStatusRequest())
    }

    return (
        <div className="header-wrapper mt-4">
            {currentIndex !== 0 && (
                <motion.span
                    whileTap={{ scale: 0.95 }}
                    className="button button-close"
                    onClick={handleClose}
                >
                    <img
                        className="icon-image"
                        src={'/static/icon/android/close.png'}
                    />
                </motion.span>
            )}
            {currentIndex === 0 && (
                <motion.span
                    whileTap={{ scale: 0.95 }}
                    className="button button-close"
                    onClick={handleClose}
                >
                    <img
                        className="icon-image"
                        src={'/static/icon/android/back.png'}
                    />
                </motion.span>
            )}
            {currentIndex !== 0 && currentIndex !== 5 && (
                <>
                    <motion.span
                        whileTap={{ scale: 0.95 }}
                        className="button button-share"
                        onClick={handleShare}
                    >
                        Chia sẻ
                    </motion.span>
                </>
            )}
        </div>
    )
}
export default Header
