import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import Button from 'containers/Game/components/Button'
import { actions } from 'containers/Game/slice'

import './index.scss'

let easing = [0.6, -0.05, 0.01, 0.99]

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: easing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
}

function StartPage() {
    const dispatch = useDispatch()

    return (
        <motion.div
            exit={{ opacity: 0 }}
            initial="initial"
            animate="animate"
            className="page-wrapper start-page-wrapper"
        >
            <motion.div className="page-content" variants={stagger}>
                <Button
                    onClick={() => {
                        dispatch(actions.setCurrentIndexRequest(1))
                    }}
                >
                    Dìa dia. Check it out!
                </Button>
            </motion.div>
            <div className="page-start">
                <motion.img
                    variants={fadeInUp}
                    src={'/static/document/page-1.png'}
                />
            </div>
        </motion.div>
    )
}

export default StartPage
