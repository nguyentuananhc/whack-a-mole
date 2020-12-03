import React, { useState, useRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { REDUCER_NAME, actions } from 'containers/Game/slice'

import useOutsideClick from 'containers/Game/helper/useOutsideClick'
import useCaptureImage from 'containers/Game/helper/useCaptureImage'

import checkCircle from './check_circleborder.png'
import './index.scss'

const ShareModal = (props) => {
    const dispatch = useDispatch()
    const { isShowMultiShare, listImages, currentIndex } = useSelector(
        (state) => state[REDUCER_NAME]
    )

    useCaptureImage()

    // const checkedCondition = (index) => currentIndex === index + 1

    const ref = useRef()

    useOutsideClick(ref, () => {
        isShowMultiShare && dispatch(actions.setMultiShareStatusRequest())
    })

    const [imgSelected, setImgSelected] = useState({})

    useEffect(() => {
        if (listImages.length === 5) {
            if (currentIndex !== 5)
                setImgSelected({
                    [currentIndex - 1]: listImages[currentIndex - 1],
                })
            else {
                const selectedList = listImages.reduce(
                    (currentVal, nextVal, currentIndex) => {
                        return {
                            ...currentVal,
                            [currentIndex]: listImages[currentIndex],
                        }
                    },
                    {}
                )
                setImgSelected({
                    ...selectedList,
                })
            }
        }
    }, [listImages, currentIndex])

    function handleClick(index) {
        imgSelected[index] = imgSelected[index] ? 0 : listImages[index]
        setImgSelected({ ...imgSelected })
    }

    const handleShare = () => {
        dispatch(actions.setMultiShareStatusRequest())
        var base64result = (src) => src.split(',')[1]

        const data = JSON.stringify(
            Object.values(imgSelected)
                .filter((item) => item)
                .map((src) => base64result(src.toString()))
        )

        if (window?.androidAppProxy) {
            window?.androidAppProxy?.requestMobileService(
                `{"type":"SHARE_IMAGES", "data":${data}}`
            )
        }

        if (window?.webkit) {
            window?.webkit?.messageHandlers.requestMobileService.postMessage(
                `{"type":"SHARE_IMAGES", "data":${data}}`
            )
        }
    }

    return (
        <div className="share-modal" ref={ref}>
            <div className="header">Chọn ảnh</div>
            <div className="container">
                <div className="container-image">
                    {listImages
                        .concat(new Array(5 - listImages.length).fill(0))
                        .map((src, index) => {
                            return src ? (
                                <div className="wrap-img" key={index}>
                                    <img
                                        onClick={(_) => handleClick(index)}
                                        className={`img-default ${
                                            imgSelected[index]
                                                ? // ||
                                                  // checkedCondition(index)
                                                  'checked'
                                                : ''
                                        }`}
                                        src={src}
                                    />
                                    {imgSelected[index] ? (
                                        // ||
                                        // checkedCondition(index)
                                        <img
                                            className="checked-icon"
                                            src={checkCircle}
                                        />
                                    ) : null}
                                </div>
                            ) : (
                                <div className="wrap-img" key={index}>
                                    <div className="img-default"></div>
                                </div>
                            )
                        })}
                </div>
                <div className="description">
                    Giờ đây, bạn có thể chia sẻ không những 1 mà là nhiều ảnh
                </div>
            </div>
            <div className="footer">
                <span
                    className={`start-button ${
                        listImages.length !== 5 ? 'button-disable' : ''
                    }`}
                    onClick={handleShare}
                >
                    {listImages.length === 5
                        ? 'Chọn ảnh mà bạn muốn chia sẻ'
                        : 'Đang tải ảnh...'}
                </span>
            </div>
        </div>
    )
}

ShareModal.defaultProps = {
    listImages: [],
}

export default ShareModal
