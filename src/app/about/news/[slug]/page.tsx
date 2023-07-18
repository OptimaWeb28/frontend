import {Title} from "@/entities/Title";
import {Breadcrumbs} from "@/features/Breadcrumb";
import {getDataWithPagination} from "@/shared/api/getDataWithPagination";
import {GetDataPaths} from "@/shared/api";
import {getDataBySlug} from "@/shared/api/getDataBySlug";
import {NewsOnPage} from "@/widgets/NewsOnPage";
import {INewsData, NewsType} from "../News.types";
import {notFound} from 'next/navigation';

export async function generateStaticParams() {
	const news = await getDataWithPagination<NewsType>(GetDataPaths.NEWS, {page: 1, pageSize: "allData"})
	const {data} = news;

	return data.map((onenews) => ({
		slug: onenews.attributes.slug
	}))
}

export async function generateMetadata({params}: { params: { slug: string } }) {
	const {slug} = params;
	const res = await getDataBySlug<INewsData>(GetDataPaths.NEWS, slug);
	const {data} = res;
	if (data.length) {
		return {
			title: `${data[0].attributes.Title}`,
			description: `Новость лечебно-диагностического центра "Оптима": ${data[0].attributes.Title}`,
			keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги'
		}
	} else {
		return {
			title: "Страница не найдена",
		}
	}
}

export default async function NewsPage({params}: { params: { slug: string } }) {
	const {slug} = params;
	const res = await getDataBySlug<INewsData>(GetDataPaths.NEWS, slug);
	const {data} = res;
	if (data.length) {
		return <div className={'container'}>
			<Breadcrumbs/>
			<Title title={`${data[0].attributes.Title}`}/>
			<NewsOnPage<NewsType> data={data}/>
		</div>
	} else {
		notFound();
	}
}