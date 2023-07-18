'use client';
import {ISliderProps} from "./Slider.types";
import Link from "next/link";
import cls from './Slider.module.scss';
import Image from 'next/image';
import {cn} from "@/shared/lib";
import {useEffect, useState} from "react";

export function Slider(props: ISliderProps) {
	const {images} = props;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [onFocus, setOnFocus] = useState(false);
	useEffect(() => {
		if (!onFocus) {
			const intervalId = setInterval(() => {
				currentIndex === (images.length - 1) ? setCurrentIndex(0) : setCurrentIndex(p => p + 1);
			}, 2000);
			return () => {
				clearInterval(intervalId);
			}
		}
	}, [onFocus, currentIndex])
	const indicators = [];
	for (let i = 0; i < images.length; i++) {
		indicators.push(<div key={i} onClick={() => setCurrentIndex(i)} className={cls.indicatorWrapper}>
			<div
				className={cn(cls.indicator, {[cls.active]: i === currentIndex})}/>
		</div>);
	}
	return <div className={cls.wrapper}>
		{images.map(({image, path, placeholder}, index) => {
			return (
				<Link onMouseEnter={() => setOnFocus(true)}
					  onMouseLeave={() => setOnFocus(false)}
					  key={index} href={path}
					  className={cn(cls.link, {[cls.active]: index === currentIndex})}>
					<div className={cls.slide}>
						<Image className={cls.image} src={image}
							   alt={`Главная новость лечебно-диагностического центра "Оптима" №${index}`}
							   fill={true}
							   priority
							   placeholder={"blur"}
							   blurDataURL={placeholder}
							   sizes={'(max-width: 1400px) 100vw, 50vw'}

						/>
					</div>
				</Link>
			)
		})}
		<div className={cls.indicators}>{indicators}</div>
	</div>
}