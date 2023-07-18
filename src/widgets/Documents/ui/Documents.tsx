import {IDocumentsData} from "./Documents.types";
import {getData, GetDataPaths} from "@/shared/api";
import Link from "next/link";
import cls from './Documents.module.scss';
import {muller700} from '@/shared/fonts';
import {cn} from "@/shared/lib";

export async function Documents() {
	const allData: IDocumentsData = await getData(GetDataPaths.DOCUMENTS)
	const {data, meta} = allData;
	return (
		<div className={cls.Documents}>
			{
				data.map(document => {
					return <Link className={cn(cls.document, {}, [muller700.className])} target="_blank"
								 rel="noopener noreferrer" key={document.id}
								 href={`${process.env.HOST_CMS}${document.attributes.Document.data.attributes.url}`}>{document.attributes.Name} </Link>
				})
			}
		</div>
	)
}