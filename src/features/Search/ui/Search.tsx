'use client'
import {cn} from '@/shared/lib';
import cls from './Search.module.scss';
import './Search.css';
import {useEffect, useRef} from "react";
import {instantMeiliSearch} from '@meilisearch/instant-meilisearch'
import {
	InstantSearch,
	SearchBox,

} from 'react-instantsearch-hooks-web';
import {ServiceHit} from "@/entities/ServiceHit";
import {DoctorsHit} from "@/entities/DoctorsHit";
import {NewsHit} from "@/entities/NewsHit";
import {ArticlesHit} from "@/entities/ArticlesHit";
import {useSearch} from "@/shared/store";
import {shallow} from "zustand/shallow";
import {SearchIndex} from "@/entities/SearchIndex";


const searchClient = instantMeiliSearch(
	'http://meilisearch:7700', // Host
	'' // API key
)

interface ISearchProps {
	className?: string;
}

export function Search(props: ISearchProps) {
	const {className = ''} = props;
	const {
		isOpen,
		input,
		setInput,
		openPopup,
		closePopup,
		newsLength,
		serviceLength,
		doctorsLength,
		articlesLength
	} = useSearch((state) => state, shallow);

	const contentRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (isOpen) {
			if (contentRef.current !== null) {
				const searchInput: HTMLInputElement | null = contentRef.current.querySelector('input[type="search"]');
				if (searchInput !== null) searchInput.focus();
				document.body.style.overflow = 'hidden';
			}
		} else {
			if (contentRef.current !== null) {
				const searchInput: HTMLInputElement | null = contentRef.current.querySelector('input[type="search"]');
				if (searchInput !== null) searchInput.blur();
				document.body.style.overflow = 'auto';
			}
		}
	}, [isOpen])


	const closePopupOnClick = (e: any) => {
		if (e.target.classList.contains('overlay')) {
			closePopup();
		}
	};

	const logInput = (e: any) => {
		setInput(e.target.value);
	}

	const handleKeyDown = (e: KeyboardEventInit) => {
		if (isOpen) {
			if (e.key === "Escape") {
				closePopup();
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
	return (<>
			<div onClick={openPopup} className={cn(className, {}, [cls.Search])}>
				<span className={cn('icon-magnifier')}/>
				<div className={cls.hint}>Поиск по сайту</div>
			</div>
			<div onClick={e => closePopupOnClick(e)}
				 className={cn(cls.popupOverlay, {[cls.active]: isOpen}, ['overlay'])}>

				<div ref={contentRef} className={cn(cls.popup, {[cls.contentHidden]: !input}, ['container'])}>
					<InstantSearch searchClient={searchClient}>
						<SearchBox className={cls.searchBox} placeholder={'Введите поисковый запрос'}
								   onInput={(e) => logInput(e)}
						/>
						{/*<div className={cls.closeText}>Закрыть окно &rarr;</div>*/}
						<button onClick={closePopup} className={cls.close}/>
						<div className={cls.content}>
							<div
								className={cn(cls.emptyResults,
									{[cls.active]: input && !newsLength && !serviceLength && !articlesLength && !doctorsLength})}>
								<span className={cls.loupe}/>
								<div className={cls.badText}>
									По запросу <span
									className={cls.badQuery}>{`"${input}"`}</span> ничего не
									найдено!
								</div>
							</div>
							<SearchIndex
								indexName={'article'}
								hitComponent={ArticlesHit}
								title={"Услуги:"}
								hitsClass={cls.articlesHits}
								hitsPerPage={8}
							/>
							<SearchIndex
								indexName={'doctor'}
								hitComponent={DoctorsHit}
								hitsClass={cls.doctorsHits}
								title={"Наши врачи:"}
								hitsPerPage={8}
							/>
							<SearchIndex
								indexName={"onenews"}
								hitComponent={NewsHit}
								hitsClass={cls.newsHits}
								title={"Новости:"}
								hitsPerPage={8}
							/>
						</div>
					</InstantSearch>
				</div>
			</div>
		</>
	)
}

