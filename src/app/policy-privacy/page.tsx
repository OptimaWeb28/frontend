import {Breadcrumbs} from "@/features/Breadcrumb";
import {IPolicyPrivacyData} from "./PolicyPrivacy.types";
import {getData, GetDataPaths} from "@/shared/api";
import {RichText} from "@/entities/RichText";
import cls from './PolicyPrivacy.module.scss';
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Политика конфиденциальности лечебно-диагностического центра "Оптима"',
	description: 'Политика конфиденциальности лечебно-диагностического центра "Оптима"',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги, политика конфиденциальности'
}

export default async function PolicyPrivacyPage() {
	const res: IPolicyPrivacyData = await getData(GetDataPaths.POLICY_PRIVACY);
	const {data} = res;
	return <div className={'container'}>
		<Breadcrumbs/>
		<RichText text={data.attributes.Text} className={cls.text}/>
	</div>
}