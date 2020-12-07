import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'

import Store from 'store'
import Header from 'components/Header'
// import Footer from 'components/Footer'

// import useAudio from 'containers/Game/helper/useAudio'

const MyApp = (props) => {
    const { Component, pageProps, store } = props

    // const [playing, toggle] = useAudio('/static/song.mp3')

    // useEffect(() => {
    //     if (!playing) toggle()
    // }, [playing])

    return (
        <Provider store={store}>
            <div className="wrapper">
                <Header />
                <Component {...pageProps} />
                {/* <Footer /> */}
            </div>
        </Provider>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    return {
        pageProps: {
            ...(Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}),
        },
    }
}

export default withRedux(Store)(MyApp)
