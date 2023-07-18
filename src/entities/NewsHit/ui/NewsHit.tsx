'use client';
import {INewsHitProps} from "./NewsHit.types";
import Link from "next/link";
import {Highlight} from "react-instantsearch-hooks-web";
import cls from "./NewsHit.module.scss";
import Image from "next/image";
import {cn} from "@/shared/lib";
import {useSearch} from "@/shared/store";
import {shallow} from "zustand/shallow";

export function NewsHit(props: INewsHitProps) {
	const {hit} = props;
	const [closePopup] = useSearch(state => [state.closePopup], shallow);
	let imgSrc: string;
	switch (true) {
		case !!hit.Image?.formats?.thumbnail?.url:
			imgSrc = hit.Image.formats.thumbnail.url;
			break;
		case !!hit.Image?.formats?.small?.url:
			imgSrc = hit.Image.formats.small.url;
			break;
		case !!hit.Image?.formats?.medium?.url:
			imgSrc = hit.Image.formats.medium.url;
			break;
		default:
			imgSrc = hit.Image.url;
	}
	return (<div className={cls.NewsHit}>
		<Link onClick={closePopup} className={cls.link} href={'/about/news/' + hit.slug}/>
		<div className={cls.imageWrapper}>

			<Image
				className={cls.image}
				src={`http://127.0.0.1:1337${imgSrc}`}
				alt={hit.Title}
				title={hit.Title}
				fill={true}
				placeholder={"blur"}
				blurDataURL={hit.Image.placeholder}
				sizes={'10vw'}
			/>
		</div>
		{/* @ts-ignore */}
		<Highlight className={cn(cls.highlight, {}, [cls.title])} hit={hit} attribute={"Title"}/>
	</div>)
}