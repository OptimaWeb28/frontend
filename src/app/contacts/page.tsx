import {Contacts} from "@/widgets/Contacts";
import {getData, GetDataPaths} from "@/shared/api";
import {IAddressData} from "@/features/Address";
import {Breadcrumbs} from "@/features/Breadcrumb";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Контакты лечебно-диагностического центра "Оптима"',
	description: 'Адрес лечебно-диагностического центра "Оптима" в г.Белогорск, Амурской области',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги'
}

export default async function ContactsPage() {

	const resp: { data: IAddressData } = await getData(GetDataPaths.ADDRESS);
	const {data} = resp;
	return (
		<>
			<Breadcrumbs/>
			<Contacts
				title={`Лечебно-диагностический центр "Оптима" расположен по адресу: ${data.attributes.City}, ${data.attributes.Street}`}
				titleType={"h1"}
				withContainer={true}
			/>
		</>
	)
}