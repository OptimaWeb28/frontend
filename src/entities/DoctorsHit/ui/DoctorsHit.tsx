import {IDoctorsHitProps} from "./DoctorsHit.types";
import Link from "next/link";
import {Highlight} from "react-instantsearch-hooks-web";
import cls from "./DoctorsHit.module.scss";
import {cn} from "@/shared/lib";
import Image from 'next/image';
import {muller500} from '@/shared/fonts'
import {useSearch} from "@/shared/store";
import {shallow} from "zustand/shallow";

export function DoctorsHit(props: IDoctorsHitProps) {
	const [closePopup] = useSearch(state => [state.closePopup], shallow);
	const {hit} = props;
	const {FIO, Description, Position, slug} = hit;
	let imgSrc: string;
	switch (true) {
		case !!hit.Photo?.formats?.thumbnail?.url:
			imgSrc = hit.Photo.formats.thumbnail.url;
			break;
		case !!hit.Photo?.formats?.small?.url:
			imgSrc = hit.Photo.formats.small.url;
			break;
		case !!hit.Photo?.formats?.medium?.url:
			imgSrc = hit.Photo.formats.medium.url;
			break;
		default:
			imgSrc = hit.Photo.url;
	}
	return (<div className={cls.doctorsHit}>
		<Link className={cls.link} href={'/doctors/' + slug} onClick={closePopup}/>
		<div className={cls.imageWrapper}>

			<Image
				className={cls.image}
				src={`http://127.0.0.1:1337${imgSrc}`}
				alt={FIO}
				title={FIO}
				fill={true}
				placeholder={"blur"}
				blurDataURL={hit.Photo.placeholder}
				sizes={'10vw'}
			/>
		</div>
		{/* @ts-ignore */}
		<Highlight className={cn(cls.highlight, {}, [cls.fio, muller500.className])} hit={hit} attribute={"FIO"}/>
		{/* @ts-ignore */}
		<Highlight className={cn(cls.highlight, {}, [cls.position])} hit={hit} attribute={"Position"}/>

	</div>)
}