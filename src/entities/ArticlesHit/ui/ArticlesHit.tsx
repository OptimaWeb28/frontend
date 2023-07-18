import {IArticlesHitProps} from "./ArticlesHit.types";
import Link from "next/link";
import {Highlight} from "react-instantsearch-hooks-web";
import cls from "./ArticlesHit.module.scss";
import {useCallbackPopup, useRecordPopup, useSearch} from "@/shared/store";
import {shallow} from "zustand/shallow";
import Image from "next/image";
import {cn} from "@/shared/lib";

export function ArticlesHit(props: IArticlesHitProps) {
	const {hit} = props;
	const [closePopup] = useSearch(state => [state.closePopup], shallow);
	const openRecordPopup = useRecordPopup(s => s.openRecordPopup, shallow);
	const openCallbackPopup = useCallbackPopup(s => s.openPopup, shallow);
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
	const modifyOnClick = (callback: (value?: string) => void) => {
		closePopup();
		setTimeout(callback, 0);
	}
	return (<div className={cls.ArticlesHit}>
		<div className={cls.imageWrapper}>

			<Image
				className={cls.image} src={`http://127.0.0.1:1337${imgSrc}`}
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
		<div className={cls.priceWrapper}>
			<div className={cls.price}>Стоимость: {hit.Service.Price} руб.</div>
		</div>
		<div className={cls.buttonsWrapper}>
			{hit.Service.Medods_link !== null
				? (<button className={cn(cls.button, {}, [cls.recordBtn])}
						   onClick={() => modifyOnClick(() => openRecordPopup(hit.Service.Medods_link!))}>Записаться</button>)
				: (<button className={cn(cls.button, {}, [cls.recordBtn])}
						   onClick={() => modifyOnClick(() => openCallbackPopup())}>Записаться</button>)
			}
			<Link onClick={closePopup} className={cls.link} href={'/about/articles/' + hit.slug}>
				<button tabIndex={-1} className={cn(cls.button, {}, [cls.readMore])}>
					Читать
				</button>
			</Link>
		</div>
	</div>)
}