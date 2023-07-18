import {Breadcrumbs} from "@/features/Breadcrumb";
import {Title} from "@/entities/Title";
import {NewsType} from "./News.types";
import {News} from "@/widgets/News";
import {GetDataPaths} from "@/shared/api";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Информация о лечебно-диагностическом центре "Оптима"',
	description: 'ЛДЦ «Оптима» - многопрофильный медицинский центр, занимающий одно из лидирующих положений в сфере оказания качественных медицинских услуг, не только в городе Белогорске, но и в Амурской области. Мы работаем с 2012 года.',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги'
}

export default function NewsPage({params, searchParams}: { params: {}, searchParams: { page: number } }) {
	const {page} = searchParams;
	return (
		<div className={'container'}>
			<Breadcrumbs/>
			<Title title={'Новости лечебно-диагностического центра "Оптима"'}/>
			{/* @ts-expect-error Server Component */}
			<News<NewsType> page={page} pageSize={5} path={GetDataPaths.NEWS} routeWithoutSlash={'about/news'}
							sort={'sort[0]=createdAt:desc'}/>
		</div>
	)
}