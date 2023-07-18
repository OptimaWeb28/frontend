import {Breadcrumbs} from "@/features/Breadcrumb";
import {Contacts} from "@/widgets/Contacts";
import {AboutContent} from "@/widgets/AboutContent";
import {Metadata} from "next";


export const metadata: Metadata = {
	title: 'Информация о лечебно-диагностическом центре "Оптима"',
	description: 'ЛДЦ «Оптима» - многопрофильный медицинский центр, занимающий одно из лидирующих положений в сфере оказания качественных медицинских услуг, не только в городе Белогорске, но и в Амурской области. Мы работаем с 2012 года.',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги'
}
export default function AboutPage() {
	return (<>
			<div className={'container'}>
				<Breadcrumbs/>
				{/* @ts-expect-error Server Component */}
				<AboutContent type={"page"}/>
			</div>
			<Contacts titleType={"h2"} title={'Ждем вас по адресу'}/>
		</>
	)
}