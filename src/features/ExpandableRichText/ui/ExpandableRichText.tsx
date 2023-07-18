'use client';

import {useState} from 'react';
import {IExpandableRichTextProps} from './ExpandableRichText.types';
import cls from './ExpandableRichText.module.scss';
import {cn} from "@/shared/lib";

export function ExpandableRichText(props: IExpandableRichTextProps) {
	const {text, className} = props;
	const [expanded, setExpanded] = useState(false);
	if (text) {
		let newText = text?.replace(/\/uploads\//g, `${process.env.HOST_CMS}/uploads/`);
		newText = newText?.replace(/font-family:Muller;/gm, '');
		const toggleExpanded = () => {
			setExpanded(!expanded);
		};

		const buttonText = expanded ? 'Скрыть' : 'Показать больше';

		const textStyles = expanded ? cls.expanded : cls.collapsed;

		return (
			<div>
				<div dangerouslySetInnerHTML={{__html: newText}}
					 className={cn(className, {}, ['ck-content', cls.text, textStyles])}/>
				<button className={cls.button} onClick={toggleExpanded}>{buttonText}</button>
			</div>
		);
	}
	return <></>
}