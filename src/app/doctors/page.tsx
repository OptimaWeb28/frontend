import {Doctors} from "@/widgets/Doctors";
import {Suspense} from "react";
import {Loader} from "@/shared/ui";
import {Breadcrumbs} from "@/features/Breadcrumb";
import {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Врачи в лечебно-диагностическом центре "Оптима" в Белогорске, Амурская область',
	description: 'Наша команда врачей в лечебно-диагностическом центре "Оптима" в Белогорске, Амурская область. Наши специалисты обеспечивают высококачественную медицинскую помощь',
	keywords: 'Врачи, лечебно-диагностический центр, Оптима, Белогорск, Амурская область'
}

export default function DoctorsPage({params, searchParams}: { params: {}, searchParams: { page: number } }) {
	const {page} = searchParams;
	return (
		<section className={'container'}>
			<Breadcrumbs/>
			<Suspense fallback={<Loader/>}>
				{/* @ts-expect-error Server Component */}
				<Doctors page={page}/>
			</Suspense>
		</section>
	)
}