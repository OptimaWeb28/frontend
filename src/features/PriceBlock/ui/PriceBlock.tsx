'use client';
import cls from "./PriceBlock.module.scss";
import {cn} from "@/shared/lib";
import {muller500, muller400} from '@/shared/fonts';
import Link from 'next/link';
import {useEffect, useState} from "react";
import {useCallbackPopup, useChat, useNavMenuMobile, useRecordPopup} from "@/shared/store";
import {shallow} from "zustand/shallow";

interface IPriceBlockProps {
	price: number;
	className: string;
	Medods_link: string | null;
	type?: "OnPage" | "OnList"
}

export function PriceBlock(props: IPriceBlockProps) {
	const {price, className, Medods_link, type = "OnPage"} = props;
	const openRecordPopup = useRecordPopup(s => s.openRecordPopup, shallow);
	const openCallbackPopup = useCallbackPopup(s => s.openPopup, shallow);
	const openCallbackDropdown = useNavMenuMobile(s => s.openCallbackDropdown, shallow);
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
	let openCallback: () => void;
	if (windowWidth < 992) {
		openCallback = openCallbackDropdown;
	} else {
		openCallback = openCallbackPopup;
	}
	return (
		<>
			<div className={cn(cls.PriceBlock, {[cls.OnList]: type === "OnList"}, [className])}>
				<div className={cn(cls.textWrapper, {}, [muller500.className, cls.item])}>
					<div className={cls.text}>Стоимость услуги:</div>
				</div>
				<div className={cn(cls.priceWrapper, {}, [muller500.className, cls.item])}>
					<div className={cls.price}>{price} руб.</div>
				</div>
				<div className={cn(cls.buttonWrapper, {}, [cls.button1Wrapper, muller400.className, cls.item])}>
					{Medods_link
						? (<button onClick={() => openRecordPopup(Medods_link)}
								   className={cn(cls.button, {}, [cls.button1])}>Записаться</button>)
						: (<button
							onClick={() => openCallback()}
							className={cn(cls.button, {}, [cls.button1])}>Записаться</button>)
					}
				</div>
				<div className={cn(cls.buttonWrapper, {}, [cls.button2Wrapper, muller400.className, cls.item])}>
					<button onClick={() => openRecordPopup()} className={cn(cls.button2, {}, [cls.button])}><span
						className={'icon-calendar'}/>Все
						услуги
					</button>
				</div>
			</div>

		</>)
}