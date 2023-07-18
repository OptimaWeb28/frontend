import {Title} from "@/entities/Title";
import {Breadcrumbs} from "@/features/Breadcrumb";
import {getDataWithPagination} from "@/shared/api/getDataWithPagination";
import {GetDataPaths} from "@/shared/api";
import {getDataBySlug} from "@/shared/api/getDataBySlug";
import {NewsOnPage} from "@/widgets/NewsOnPage";
import {Article, IArticlesData} from "@/app/about/articles/Articles.types";
import {notFound} from 'next/navigation';

export async function generateStaticParams() {
	const articles = await getDataWithPagination<Article>(GetDataPaths.ARTICLES, {page: 1, pageSize: "allData"})
	const {data} = articles;

	return data.map((article) => ({
		slug: article.attributes.slug
	}))
}

export async function generateMetadata({params}: { params: { slug: string } }) {
	const {slug} = params;
	const res = await getDataBySlug<IArticlesData>(GetDataPaths.ARTICLES, slug);
	const {data} = res;
	if (data.length) {
		return {
			title: `${data[0].attributes.Title}`,
			description: `Статья об услуге: ${data[0].attributes.Title} в лечебно-диагностическом центре "Оптима" в г.Белогорске, Амурской области`,
			keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги, статьи'
		}
	} else {
		return {
			title: "Страница не найдена",
		}
	}
}

export default async function ArticlesPage({params}: { params: { slug: string } }) {
	const {slug} = params;
	const res = await getDataBySlug<IArticlesData>(GetDataPaths.ARTICLES, slug);
	const {data} = res;
	if (data.length) {
		return <div className={'container'}>
			<Breadcrumbs/>
			<Title title={`${data[0].attributes.Title}`}/>
			<NewsOnPage<Article> data={data} withPrice={true}/>
		</div>
	} else {
		notFound();
	}
}