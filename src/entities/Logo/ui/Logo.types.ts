import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export interface ILogoProps {
    className?: string;
}

export interface ILogoData {
    id: number,
    attributes: {
        Image:{
            data: {
            attributes: {
                url: string;
            }
        }
        } 
    }
}