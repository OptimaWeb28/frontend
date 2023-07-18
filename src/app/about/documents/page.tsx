import {Breadcrumbs} from "@/features/Breadcrumb";
import {Title} from "@/entities/Title";
import {Documents} from "@/widgets/Documents";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Документы лечебно-диагностического центра "Оптима"',
	description: 'Документы лечебно-диагностического центра "Оптима"',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги, статьи'
}

export default function DocumentsPage() {
	return (
		<div className={'container'}>
			<Breadcrumbs/>
			<Title title={"Документы"}/>
			{/* @ts-expect-error Server Component */}
			<Documents/>
		</div>
	)
}