import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actions, REDUCER_NAME } from './slice'
import { initGA, PageView, Event, setUID } from './components/Tracking'
// import SwipeView from 'src/components/SwipeView'
import GamePage from 'containers/Game/containers/GamePage'
import StartPage from 'containers/Game/containers/StartPage'

import firebase from './Firebase'

import './index.scss'

const Game = () => {
    const dispatch = useDispatch()
    const { currentIndex, isShowMultiShare } = useSelector(
        (state) => state[REDUCER_NAME]
    )

    useEffect(() => {
        // initGA('UA-173271646-1')
        //GA PROD ID
        // const firestore = firebase.firestore()
        // const docRef = firestore
        //     .collection('onemg')
        //     .doc('Game92020')
        //     .collection('users')
        //     .doc('10003727')
        // docRef
        //     .get()
        //     .then((doc) => {
        //         console.log(doc.data())
        //     })
        //     .catch(function (error) {
        //         // console.log('got an error', error)
        //     })
        // PageView('Game')
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') {
            global.window = {}
            // prevent window error at server side
        }
    }, [])

    useEffect(() => {
        const mobileServiceAppResponse = (resp, flag) => {
            if (flag === 'DEVICE_INFO') {
                window.WEB_OS = resp.deviceName === 'iPhone' ? 'IOS' : 'ANDROID'
            }
            if (flag === 'USER_PROFILE') {
                window.USER_ID = resp.user_id || resp.a
                window.USER_NAME = resp.full_name || resp.c

                setUID(resp.user_id)
            }
            return 'nothing'
        }
        window.insurance = {}
        window.platform = {}
        window.insurance.mobileServiceAppResponse = mobileServiceAppResponse
        window.platform.mobileServiceAppResponse = mobileServiceAppResponse
    }, [])

    useEffect(() => {
        const sendRequest = () => {
            if (window?.androidAppProxy) {
                window.androidAppProxy.requestMobileService(
                    JSON.stringify({ type: 'DEVICE_INFO' })
                )
                window.androidAppProxy.requestMobileService(
                    JSON.stringify({ type: 'USER_PROFILE' })
                )
            }
            if (window?.webkit) {
                window.webkit.messageHandlers.requestMobileService.postMessage(
                    JSON.stringify({ type: 'DEVICE_INFO' })
                )
                window.webkit.messageHandlers.requestMobileService.postMessage(
                    JSON.stringify({ type: 'USER_PROFILE' })
                )
            }
        }
        const id = setInterval(() => sendRequest(), 1000)
        setTimeout(function () {
            clearInterval(id)
        }, 5000)
        //in case loop not stop
    }, [])

    return (
        <div className="game-wrapper">
            {currentIndex === 0 && <StartPage />}
            {currentIndex === 1 && <GamePage />}
        </div>
    )
}

export default Game
