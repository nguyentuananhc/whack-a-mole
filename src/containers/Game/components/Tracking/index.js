import ReactGA from 'react-ga'

export const initGA = (trackingID) => {
    ReactGA.initialize(trackingID)
}

export const setUID = (uid) => {
    ReactGA.set({ userId: uid })
}

export const PageView = (title) => {
    ReactGA.pageview(title)
}

/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const Event = (category, action, label, value) => {
    ReactGA.event({
        category,
        action,
        label,
        value,
    })
}
