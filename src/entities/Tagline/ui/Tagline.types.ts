import {DetailedHTMLProps, HTMLAttributes} from 'react'

export interface ITagLineData {
	id: number,
	attributes: {
		Text: string
	}
}

export interface ITagLineProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	className?: 'string'
}