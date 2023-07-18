import {Breadcrumbs} from "@/features/Breadcrumb";
import {Title} from "@/entities/Title";
import {ILicencesData, Licenses} from "@/widgets/Licenses";
import {getData, GetDataPaths} from "@/shared/api";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Лицензии лечебно-диагностического центра "Оптима"',
	description: 'Лицензии лечебно-диагностического центра "Оптима"',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги, лицензии'
}

export default async function LicensesPage() {
	const res: ILicencesData = await getData(GetDataPaths.LICENSES);
	const {data} = res;
	const smallImages: { path: string, placeholder: string }[] = [];
	const largeImages: string[] = [];
	const titles: string[] = [];
	data.forEach(license => {
		switch (true) {
			case !!license.attributes.Image.data.attributes?.formats?.small?.url:
				smallImages.push({
					path: `${process.env.HOST_CMS}${license.attributes.Image.data.attributes.formats.small.url}`,
					placeholder: license.attributes.Image.data.attributes.placeholder
				})
				break;
			case !!license.attributes.Image.data.attributes?.formats?.medium?.url:
				smallImages.push({
					path: `${process.env.HOST_CMS}${license.attributes.Image.data.attributes.formats.medium.url}`,
					placeholder: license.attributes.Image.data.attributes.placeholder
				})
				break;
			default:
				smallImages.push({
					path: `${process.env.HOST_CMS}${license.attributes.Image.data.attributes.url}`,
					placeholder: license.attributes.Image.data.attributes.placeholder
				})
		}
		largeImages.push(`${process.env.HOST_CMS}${license.attributes.Image.data.attributes.url}`)
		titles.push(license.attributes.Title)
	})
	return (
		<div className={'container'}>
			<Breadcrumbs/>
			<Title title={'Лицензии лечебно-диагностического центра "Оптима"'}/>
			<Licenses largeImages={largeImages} smallImages={smallImages} titles={titles}/>
		</div>
	)
}