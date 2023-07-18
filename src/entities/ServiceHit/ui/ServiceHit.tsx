'use client';
import {IServiceHitProps} from "./ServiceHit.types";
import Link from "next/link";
import {Highlight} from "react-instantsearch-hooks-web";
import cls from "./ServiceHit.module.scss";
import {cn} from "@/shared/lib";
import {useState} from "react";
import {muller400} from '@/shared/fonts';
import {useChat} from "@/shared/store";


export function ServiceHit(props: IServiceHitProps) {
	const {hit} = props;
	const {Title, Medods_id, Price, Category, Sub_Category} = hit;
	const {openChat, setLoading, loading} = useChat();

	return (<div className={cls.ServiceHit}>
		{/* @ts-ignore */}
		<Highlight className={cn(cls.title, {}, [muller400.className])} hit={hit} attribute={"Title"}/>
		<div className={cls.breadcrumbs}>{Category.Title} - {Sub_Category.Title}</div>
		<div className={cls.price}>{Price} руб.</div>
		{Medods_id
			? (<button onClick={() => mv('show', `/clinic/1/service/${Medods_id}`)}
					   className={cls.button}>Записаться</button>)
			: (<button
				onClick={openChat}
				className={cn(cls.button)}>{loading ? 'Загрузка...' : 'Записаться'}</button>)
		}
	</div>)
}