import {Title} from "@/entities/Title";
import {Breadcrumbs} from "@/features/Breadcrumb";
import {getDataWithPagination} from "@/shared/api/getDataWithPagination";
import {GetDataPaths} from "@/shared/api";
import {Device, IDevicesData} from '../Device.types'
import {getDataBySlug} from "@/shared/api/getDataBySlug";
import {NewsOnPage} from "@/widgets/NewsOnPage";
import {notFound} from 'next/navigation';


export async function generateStaticParams() {
	const devices = await getDataWithPagination<Device>(GetDataPaths.DEVICES, {page: 1, pageSize: "allData"})
	const {data} = devices;

	return data.map((device) => ({
		slug: device.attributes.slug
	}))
}

export async function generateMetadata({params}: { params: { slug: string } }) {
	const {slug} = params;
	const res = await getDataBySlug<IDevicesData>(GetDataPaths.DEVICES, slug);
	const {data} = res;
	if (data.length) {
		return {
			title: `${data[0].attributes.Title}`,
			description: `${data[0].attributes.Title} в лечебно-диагностическом центре "Оптима" в г.Белогорске, Амурской области`,
			keywords: `${data[0].attributes.Title}, медицинское оборудование, лечебно-диагностический центр "Оптима"`
		}
	} else {
		return {
			title: "Страница не найдена",
		}
	}
}

export default async function DevicePage({params}: { params: { slug: string } }) {
	const {slug} = params;
	const res = await getDataBySlug<IDevicesData>(GetDataPaths.DEVICES, slug);
	const {data} = res;
	if (data.length) {
		return <div className={'container'}>
			<Breadcrumbs/>
			<Title title={`${data[0].attributes.Title}`}/>
			<NewsOnPage<Device> data={data}/>
		</div>
	} else {
		notFound();
	}
}