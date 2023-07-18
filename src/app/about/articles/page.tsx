import {Breadcrumbs} from "@/features/Breadcrumb";
import {Title} from "@/entities/Title";
import {News} from "@/widgets/News";
import {NewsType} from "@/app/about/news/News.types";
import {GetDataPaths} from "@/shared/api";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Статьи об услугах лечебно-диагностического центра "Оптима"',
	description: 'ЛДЦ «Оптима» - многопрофильный медицинский центр, занимающий одно из лидирующих положений в сфере оказания качественных медицинских услуг, не только в городе Белогорске, но и в Амурской области. Мы работаем с 2012 года. Он оказывает огромное количество медицинских услуг',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги, статьи'
}

export default function ArticlesPage({params, searchParams}: { params: {}, searchParams: { page: number } }) {
	const {page} = searchParams;
	return (
		<div className={'container'}>
			<Breadcrumbs/>
			<Title title={'Статьи об услугах лечебно-диагностического центра "Оптима"'}/>
			{/* @ts-expect-error Server Component */}
			<News<NewsType> page={page} pageSize={5} path={GetDataPaths.ARTICLES} routeWithoutSlash={'about/articles'}
							sort={'sort[0]=createdAt:desc'} withPrice={true}/>
		</div>
	)
}