import {ReactNode} from 'react';

export interface IInfoItemProps {
	className?: string,
	iconFontClass: string,
	iconStyle?: 'fill' | 'ghost',
	title?: string,
	children: ReactNode
}