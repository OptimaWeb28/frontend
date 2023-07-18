import {cn} from "@/shared/lib";
import cls from './Excellence.module.scss';
import {muller400, muller700} from '@/shared/fonts';
import Image from 'next/image';
import MainPNG from '@/shared/images/exellence/excellence1.png';
import ItemPNG from '@/shared/images/exellence/excellence2.png';
import {IHeadExcellenceData} from "./HeadExcellence.types";
import {getData, GetDataPaths} from "@/shared/api";
import {IExcellencesData} from "@/widgets/Exellence/ui/Excellences.types";

export async function Excellence() {
	const headExcellenceRes: IHeadExcellenceData = await getData(GetDataPaths.HEAD_EXCELLENCE);
	const {data: headData} = headExcellenceRes;

	const excellencesRes: IExcellencesData = await getData(GetDataPaths.EXCELLENCES, 'pagination[pageSize]=100');
	const {data: excellencesData} = excellencesRes;
	return (
		<div className={cn(cls.Exellence, {}, [])}>
			<div className={cn(cls.mainItem)}>
				<div
					className={cn(cls.mainDigit, {}, [muller700.className, cls.text])}>{headData.attributes.Digit}</div>
				<p className={cn(cls.mainDescr, {}, [muller400.className, cls.text])}>{headData.attributes.Text}</p>
				<Image alt={'Главное преимущество'} src={MainPNG} fill={true}/>
			</div>
			{excellencesData.map((excellence, index) => {
				return (
					<div key={index} className={cn(cls.item)}>
						<div className={cls.wrapper}>
							<div
								className={cn(cls.itemTitle, {}, [muller700.className, cls.text])}>{excellence.attributes.Title}</div>
							<div
								className={cn(cls.itemCount, {}, [muller700.className, cls.text])}>{excellence.attributes.Subtitle}</div>
							<div
								className={cn(cls.itemDescr, {}, [muller400.className, cls.text])}>{excellence.attributes.Description}</div>
							<Image className={cn(cls.img)} alt={`Преимущество № ${index}`} src={ItemPNG} fill={true}/>
						</div>
					</div>
				)
			})}
		</div>
	)
}