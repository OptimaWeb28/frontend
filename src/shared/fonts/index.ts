import localFont from 'next/font/local';
import { Inter, Open_Sans } from 'next/font/google'

export const inter = Inter({
    weight: ['400', '500', '600', '700'],
    style: ['normal'],
    subsets: ['cyrillic']
})

export const openSans = Open_Sans({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['cyrillic']
})

export const muller400 = localFont({
    src: [
        {
            path: './Muller/MullerRegular.woff2',
            weight: '400',
            style: 'normal'
        }
    ]
}) 

export const muller500 = localFont({
    src: [
        {
            path: './Muller/MullerMedium.woff2',
            weight: '500',
            style: 'normal'
        }
    ]
}) 

export const muller700 = localFont({
    src: [
        {
            path: './Muller/MullerBold.woff2',
            weight: '700',
            style: 'normal'
        }
    ]
}) 

export const muller700_italic = localFont({
    src: [
        {
            path: './Muller/MullerBoldItalic.woff2',
            weight: '700',
            style: 'italic'
        }
    ]
}) 