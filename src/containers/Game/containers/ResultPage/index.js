import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'containers/Game/components/Button'
import { actions, REDUCER_NAME } from 'containers/Game/slice'

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

function ResultPage() {
    const dispatch = useDispatch()
    const { currentIndex, isShowMultiShare, score } = useSelector(
        (state) => state[REDUCER_NAME]
    )

    return (
        <motion.div
            exit={{ opacity: 0 }}
            initial="initial"
            animate="animate"
            className="page-wrapper start-page-wrapper"
        >
            <div>Điểm của bạn: {score}</div>
            <motion.div className="page-content" variants={stagger}>
                <Button
                    onClick={() => {
                        dispatch(actions.setCurrentIndexRequest(1))
                    }}
                >
                    Chơi Lại
                </Button>
            </motion.div>
            <div className="page-start"></div>
        </motion.div>
    )
}

export default ResultPage
