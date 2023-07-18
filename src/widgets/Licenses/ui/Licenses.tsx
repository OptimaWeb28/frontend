'use client'
import cls from './Licenses.module.scss';

import {ILicensesProps} from "./Licenses.types";
import Image from 'next/image';
import React, {useEffect, useState} from "react";
import {cn} from "@/shared/lib";
import {muller700} from "@/shared/fonts";
import {FormLoader} from "@/shared/ui";

export function Licenses(props: ILicensesProps) {
	const {titles, smallImages, largeImages} = props;
	const [popupImage, setPopupImage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const handleImageClick = (index: number) => {
		document.body.style.overflow = 'hidden';
		setPopupImage(largeImages[index]);
	};
	const handleClosePopup = () => {
		document.body.style.overflow = 'auto';
		setPopupImage(null);
	};
	const prevPopupImage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const index = largeImages.lastIndexOf(popupImage!) - 1;
		const newIndex = index < 0 ? largeImages.length - 1 : index;
		setLoading(true);
		setPopupImage(largeImages[newIndex]);
	};

	const nextPopupImage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const index = largeImages.indexOf(popupImage!) + 1;
		const newIndex = index === largeImages.length ? 0 : index;
		setLoading(true);
		setPopupImage(largeImages[newIndex]);
	};

	const handleKeyDown = (e: KeyboardEventInit) => {
		if (popupImage) {
			if (e.key === "ArrowRight") {
				nextPopupImage(e as any);
			} else if (e.key === "ArrowLeft") {
				prevPopupImage(e as any);
			} else if (e.key === "Escape") {
				handleClosePopup();
			}
		}
	};
	useEffect(() => {
		const onKeyDown = (e: KeyboardEventInit) => handleKeyDown(e);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	});


	return <section className={cls.Licenses}>
		{smallImages.map(({path, placeholder}, index) => {
			return (
				<div key={index} className={cls.imageWrapper} onClick={() => handleImageClick(index)}>
					<Image
						src={path}
						fill={true}
						alt={titles[index]}
						className={cls.image}
						placeholder={'blur'}
						blurDataURL={placeholder}
						sizes={'30vw'}
					/>
				</div>
			)
		})}
		{popupImage && (
			<div className={cls.popup} onClick={handleClosePopup}>
				<div className={cls.popupTitle}>{titles[largeImages.indexOf(popupImage)]}</div>
				<button className={cn(cls.prev, {}, ['icon-arrow-down', cls.prevPopup])}
						onClick={prevPopupImage}/>
				<div className={cls.imageWrapper}>
					<div className={cn(cls.loader, {[cls.active]: loading})}>
						<FormLoader/>
					</div>

					<Image className={cn(cls.popupImage, {[cls.active]: !loading})}
						   alt={titles[largeImages.indexOf(popupImage)]}
						   fill={true}
						   src={popupImage}

						   sizes={'80vw'}
						   onLoadingComplete={() => setLoading(false)}
					/>
				</div>
				<button className={cn(cls.next, {}, ['icon-arrow-down', cls.nextPopup])} onClick={nextPopupImage}/>
				<button className={cls.close} onClick={handleClosePopup}>
					&#10006;
				</button>
				<div
					className={cn(cls.count, {}, [muller700.className])}>{largeImages.indexOf(popupImage) + 1} / {largeImages.length}</div>
			</div>
		)}
	</section>
}