'use client'
import {IButtonProps} from './Button.types';
import {cn} from '@/shared/lib';
import {muller400} from '@/shared/fonts';
import cls from './Button.module.scss';
import {useEffect, useState} from "react";
import {useCallbackPopup, useChat, useNavMenuMobile, useRecordPopup} from "@/shared/store";
import {shallow} from "zustand/shallow";

export function Button(props: IButtonProps) {
	const [windowWidth, setWindowWidth] = useState<number>(0);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const {loading, setLoading, openChat} = useChat();
	const openRecordPopup = useRecordPopup(s => s.openRecordPopup, shallow);
	const openCallbackPopup = useCallbackPopup(s => s.openPopup, shallow);
	const openCallbackDropdown = useNavMenuMobile(s => s.openCallbackDropdown, shallow);

	const {
		text,
		color = "secondary",
		size = "small",
		className = '',
		iconFontClass,
		click,
	} = props;
	let fnOnClick = () => {
	};
	if (click === "openChat") {
		fnOnClick = openChat;
	} else if (click === 'openCallback') {
		if (windowWidth < 992) {
			fnOnClick = openCallbackDropdown
		} else {
			fnOnClick = openCallbackPopup
		}
	} else if (click === 'openRecord') {
		fnOnClick = openRecordPopup
	} else if (typeof click === 'string' && click !== 'openChat' && click !== 'openCallback' && click !== 'openRecord') {
		fnOnClick = () => openRecordPopup(click)
	}

	return <button onClick={() => fnOnClick()} className={cn(className, {
		[cls.primary]: color === "primary",
		[cls.secondary]: color === "secondary",
		[cls.allWidth]: size === "100%"
	}, [cls.Button, muller400.className])}>
		{iconFontClass && <span className={cn(iconFontClass, {}, [cls.icon])}/>}
		<span className={cn(cls.text)}>
                {loading ? 'Загрузка...' : text}
            </span>
	</button>
}