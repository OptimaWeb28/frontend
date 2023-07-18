'use client'
import React, {useState, useEffect, useRef} from "react";
import cls from "./Carousel.module.scss";
import Image from 'next/image';
import {cn} from "@/shared/lib";
import {muller700} from "@/shared/fonts";
import {FormLoader} from "@/shared/ui";

interface Props {
	smallImages: { path: string, placeholder: string }[];
	largeImages: string[];
	interval?: number;
	visibleImages?: number;
}

export function Carousel({smallImages: imagesArr, interval = 3000, largeImages}: Props) {
	const imageRef = useRef<HTMLDivElement>(null);
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	const [popupImage, setPopupImage] = useState<string | null>(null);

	const [width, setWidth] = useState(350);
	const [images, setImages] = useState([imagesArr[imagesArr.length - 1], ...imagesArr, imagesArr[0]]);
	const [transform, setTransform] = useState('translateX(0)');
	const [transition, setTransition] = useState('transform 0.3s');

	const [onFocus, setOnFocus] = useState(false);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (imageRef !== null) {
			const imageWidth = parseInt(window.getComputedStyle(imageRef.current!).height);
			setWidth(imageWidth);
		}
	}, [images, width]);

	const prevImage = () => {
		setTransition('transform 0.3s');
		setTransform(`translateX(${width}px)`)
		if (prevRef.current !== null) prevRef.current.disabled = true;
		setTimeout(() => {
			setImages([images[images.length - 3], ...images.slice(0, -1)]);
			setTransition('none');
			setTransform(`translateX(0)`);
			if (prevRef.current !== null) prevRef.current.disabled = false;

		}, 300)
	}

	const nextImage = () => {
		setTransition('transform 0.3s');
		setTransform(`translateX(-${width}px)`)
		if (nextRef.current !== null) nextRef.current.disabled = true;

		setTimeout(() => {
			setImages([...images.slice(1), images[2]]);
			setTransition('none');
			setTransform(`translateX(0)`);
			if (nextRef.current !== null) nextRef.current.disabled = false;
		}, 300)
	}

	useEffect(() => {
		if (!popupImage && !onFocus) {
			const intervalId = setInterval(prevImage, interval);
			return () => {
				clearInterval(intervalId)
			}
		}
	}, [images, popupImage, onFocus, interval])
	const handleImageClick = (index: number) => {
		document.body.style.overflow = 'hidden';
		setPopupImage(largeImages[index]);
	};

	const handleClosePopup = () => {
		document.body.style.overflow = 'auto';
		setPopupImage(null);
		setOnFocus(false);
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

	return (
		<div onMouseEnter={() => setOnFocus(true)} onMouseLeave={() => setOnFocus(false)} className={cls.carousel}
			 style={{"maxWidth": `${width * (images.length - 2)}px`}}>
			<button ref={prevRef} onClick={prevImage} className={cn(cls.prev, {}, ['icon-arrow-down'])}/>
			<button ref={nextRef} onClick={nextImage} className={cn(cls.next, {}, ['icon-arrow-down'])}/>
			<div ref={imageRef} className={cls.tape}
				 style={{transform: `${transform}`, transition: `${transition}`}}>

				{images.map(({path, placeholder}, index) => (
					<div key={index} className={cls.wrapper}>
						<Image
							fill
							sizes={'(max-width: 1200px) 25vw, 10vw'}
							src={path}
							onClick={() => handleImageClick(imagesArr.findIndex(item => item.path === path))}
							className={cls.image}
							style={{display: "block"}}
							alt={`Image ${index + 1}`}
							placeholder={'blur'}
							blurDataURL={placeholder}
						/>
						<div className={cls.hover}/>
					</div>
				))}

			</div>
			{popupImage && (
				<div className={cls.popup} onClick={handleClosePopup}>
					<button className={cn(cls.prev, {}, ['icon-arrow-down', cls.prevPopup])}
							onClick={prevPopupImage}/>
					<div className={cls.imageWrapper}>
						<div className={cn(cls.loader, {[cls.active]: loading})}>
							<FormLoader/>
						</div>


						<Image className={cn(cls.popupImage, {[cls.active]: !loading})}
							   alt={`Изображение лечебного центра Оптима №${imagesArr.findIndex(({path}) => path === popupImage) + 1}`}
							   fill={true}
							   src={popupImage}
							   sizes={'(max-width: 1400px) 100vw, 50vw'}
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
		</div>
	);
}

