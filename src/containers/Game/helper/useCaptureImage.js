import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { REDUCER_NAME, actions } from 'containers/Game/slice'

const html2canvas = process.browser ? require('html2canvas') : null
const listPageId = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6']

const useCaptureImage = () => {
    const dispatch = useDispatch()
    const { listImages } = useSelector((state) => state[REDUCER_NAME])

    useEffect(() => {
        const exportImage = () => {
            if (listImages.length) return
            listPageId.forEach(async (id) => {
                const input = document.getElementById(id)

                if (input) {
                    await html2canvas(input).then((canvas) => {
                        var data = canvas.toDataURL('image/jpeg', 1)
                        var src = encodeURI(data)
                        dispatch(actions.pushBase64ImageRequest(src))
                    })
                }
            })
        }
        const id = setTimeout(() => {
            exportImage()
        }, 1000)

        return () => clearTimeout(id)
    }, [listImages])
}

export default useCaptureImage
