import {RecordContent} from "@/widgets/RecordContent";
import {Breadcrumbs} from "@/features/Breadcrumb";
import {Title} from "@/entities/Title";
import {IPhoneNumberData} from "@/features/PhoneNumber/ui/PhoneNumber.types";
import {getData, GetDataPaths} from "@/shared/api";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Способы записи на приём к врачу в лечебно-диагностическом центре "Оптима"',
	description: 'Есть несколько способов записи на прием к врачу в лечебно-диагностическом центре "Оптима" в г.Белогорск, Амурской области',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги, запись на прием, запись к врачу'
}

export default async function RecordPage() {
	const resp: { data: IPhoneNumberData } = await getData(GetDataPaths.PHONE_NUMBER);
	const {data} = resp;
	return <div className={'container'}>
		<Breadcrumbs/>
		<Title title={"Способы записи на услуги"}/>
		<Title style={{lineHeight: '30px'}}
			   title={'Записаться на услуги в лечебно-диагностический центр "Оптима" вы можете следующими способами:'}
			   titleType={"h3"}/>
		<RecordContent phoneNumber={data.attributes.Number} phoneNumberLink={data.attributes.Number}/>
	</div>
}