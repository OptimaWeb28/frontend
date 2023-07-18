import {Breadcrumbs} from "@/features/Breadcrumb";
import {Title} from "@/entities/Title";
import {News} from "@/widgets/News";
import {GetDataPaths} from "@/shared/api";
import {Device} from "./Device.types";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Медицинское оборудование лечебно-диагностического центра "Оптима"',
	description: 'Познакомьтесь с нашим современным оборудованием в лечебно-диагностическом центре "Оптима" в Белогорске, Амурская область. Мы используем передовые технологии для обеспечения точной и надежной диагностики.',
	keywords: 'Ультразвуковое оборудование, Рентгеновское оборудование, Магнитно-резонансное томографическое (МРТ) оборудование, Компьютерная томография (КТ) оборудование, Электрокардиографическое (ЭКГ) оборудование, Эндоскопическое оборудование, Лазерное оборудование для медицинских процедур, Инфузионные помпы и оборудование для инфузионной терапии, Дефибрилляторы, Имплантаты и протезы, Лабораторное оборудование, Медицинские аппараты для физиотерапии и реабилитации, Аппараты и оборудование для анестезиологии и реанимации, Офтальмологическое оборудование, Стерилизационное оборудование, Диагностическое оборудование, Хирургическое оборудование, Дентальное оборудование, Ортопедическое оборудование'
}

export default function DevicePage({params, searchParams}: { params: {}, searchParams: { page: number } }) {
	const {page} = searchParams;
	return (
		<div className={'container'}>
			<Breadcrumbs/>
			<Title title={'Медицинское оборудование лечебно-диагностического центра "Оптима"'}/>
			{/* @ts-expect-error Server Component */}
			<News<Device> page={page} pageSize={5} path={GetDataPaths.DEVICES} routeWithoutSlash={'device'}
						  sort={'sort[0]=createdAt:desc'}/>
		</div>
	)
}