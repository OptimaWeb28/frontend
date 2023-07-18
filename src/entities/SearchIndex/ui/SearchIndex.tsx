import {Configure, Hits, Index, Pagination, Stats} from "react-instantsearch-hooks-web";
import {Title} from "@/entities/Title";
import {cn} from "@/shared/lib";
import cls from "./SearchIndex.module.scss";
import {useSearch} from "@/shared/store";
import {shallow} from "zustand/shallow";
import {hitsPerPage} from "instantsearch.js/es/widgets";


type indexNames = "service" | "onenews" | "doctor" | "article";

interface ISearchIndexProps {
	title: string;
	indexName: indexNames;
	hitComponent: any;
	hitsClass?: string;
	hitsPerPage: number;
}

export function SearchIndex(props: ISearchIndexProps) {
	const {title, indexName, hitComponent, hitsClass = '', hitsPerPage} = props;
	const {
		input,
		serviceLength,
		setServiceLength,
		articlesLength,
		setArticlesLength,
		doctorsLength,
		setDoctorsLength,
		newsLength,
		setNewsLength
	} = useSearch(state => state, shallow);

	let indexLength: number;
	let setIndexLength: (value: number) => void;

	switch (indexName) {
		case "article":
			indexLength = articlesLength;
			setIndexLength = setArticlesLength;
			break;
		case "doctor":
			indexLength = doctorsLength;
			setIndexLength = setDoctorsLength;
			break;
		case "onenews":
			indexLength = newsLength;
			setIndexLength = setNewsLength;
			break;
		default:
			indexLength = serviceLength;
			setIndexLength = setServiceLength;
	}

	return (<>
		<Index indexName={indexName}>
			<Title className={cn('', {[cls.hidden]: !indexLength})} title={title}
				   titleType={"h2"}/>
			<Configure hitsPerPage={hitsPerPage}/>
			<Stats className={cn(cls.stats, {[cls.hidden]: !indexLength})} translations={{
				stats: ({nbHits}) => `Всего результатов: ${nbHits}`
			}}/>
			<Hits
				className={cn(cls.hits, {[cls.hidden]: !input}, [hitsClass])}
				// @ts-ignore
				hitComponent={hitComponent}
				// @ts-ignore
				transformItems={items => {
					if (!input) {
						setIndexLength(0);
					} else {
						setIndexLength(items.length);
					}
					return items.map((item, index) => {
						const newItem = {...item, objectID: item._meilisearch_id};
						return {...newItem};
					})
				}}
			/>
			<Pagination
				className={cn(cls.pagination, {[cls.hidden]: !indexLength})}/>
		</Index>
	</>)
}