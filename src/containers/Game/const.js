export const EVENT_GA = {
    VIEW: {
        VIEW_ONLY: 'VIEW_ONLY',
        VIEW_HEADER: 'VIEW_HEADER',
        VIEW_FAMILY: 'VIEW_FAMILY',
        VIEW_COLLEAGUE: 'VIEW_COLLEAGUE',
        VIEW_SELF: 'VIEW_SELF',
        VIEW_FOOTER: 'VIEW_FOOTER',
    },
    CLICK: {
        CLICK_IMAGE: 'CLICK_IMAGE',
        CLICK_LOGO: 'CLICK_LOGO',
        CLICK_QUOTE: 'CLICK_QUOTE',
        CLICK_VIEW_IMAGE: 'CLICK_VIEW_IMAGE',
        CLICK_CTA_BUY: 'CLICK_CTA_BUY',
        CLICK_CTA_SHARE: 'CLICK_CTA_SHARE',
    },
    SWIPE: {
        SWIPE_STYLE: 'SWIPE_STYLE',
    },
}

export const fadeInLeft = {
    initial: {
        x: 200,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
    },
    transition: { delay: 0.3 },
}

export const easing = [0.6, -0.05, 0.01, 0.99]

export const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export const fadeInUp = {
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
