import {cn} from "@/shared/lib";
import cls from './DoctorsPage.module.scss';
import {Title} from "@/entities/Title";
import Image from 'next/image';
import {Button} from "@/entities/Button";
import {muller500} from '@/shared/fonts';
import {RichText} from "@/entities/RichText";
import {Breadcrumbs} from "@/features/Breadcrumb";
import {getDataWithPagination} from "@/shared/api/getDataWithPagination";
import {GetDataPaths} from "@/shared/api";
import {Doctor, IDoctorsData} from '@/widgets/Doctors'
import {getDataBySlug} from "@/shared/api/getDataBySlug";
import {notFound} from 'next/navigation';


export async function generateStaticParams() {
	const doctors = await getDataWithPagination<Doctor>(GetDataPaths.DOCTORS, {page: 1, pageSize: 20});
	const {data} = doctors;

	return data.map((doctor) => ({
		slug: doctor.attributes.slug
	}))
}

export async function generateMetadata({params}: { params: { slug: string } }) {
	const {slug} = params;
	const res = await getDataBySlug<IDoctorsData>(GetDataPaths.DOCTORS, slug);
	const {data} = res;
	if (data.length) {
		return {
			title: `${data[0].attributes.Position}: ${data[0].attributes.FIO}`,
			description: `${data[0].attributes.Position}: ${data[0].attributes.FIO} в лечебно-диагностическом центре "Оптима", в г.Белогорске, Амурской области`,
			keywords: `${data[0].attributes.Position}, ${data[0].attributes.FIO},Врачи, лечебно-диагностический центр, Оптима, Белогорск, Амурская область`
		}
	} else {
		return {
			title: "Страница не найдена",
		}
	}
}

export default async function Doctor({params}: { params: { slug: string } }) {
	const {slug} = params;
	const res = await getDataBySlug<IDoctorsData>(GetDataPaths.DOCTORS, slug);
	const {data} = res;
	if (data.length) {
		let imageSrc;
		switch (true) {
			case !!data[0].attributes.Photo.data.attributes?.formats?.medium?.url:
				imageSrc = data[0].attributes.Photo.data.attributes.formats.medium.url;
				break;
			default:
				imageSrc = data[0].attributes.Photo.data.attributes.url;
		}
		return <div className={cn(cls.Doctor, {}, ['container'])}>
			<Breadcrumbs/>
			<Title title={`${data[0].attributes.Position}: ${data[0].attributes.FIO}`}/>
			<div className={cn(cls.cardWrapper)}>
				<div className={cn(cls.imageWrapper)}>
					<Image
						className={cls.image}
						src={`${process.env.HOST_CMS}${imageSrc}`}
						fill={true}
						alt={`${data[0].attributes.Position} ${data[0].attributes.FIO}"`}
						title={`${data[0].attributes.Position} ${data[0].attributes.FIO}`}
						placeholder={"blur"}
						blurDataURL={data[0].attributes.Photo.data.attributes.placeholder}
						sizes={'30vw'}
					/>
				</div>
				<div className={cn(cls.infoWrapper)}>
					<div className={cn(cls.position)}>{data[0].attributes.Position}</div>
					<div className={cn(cls.props, {}, [cls.raiting])}><span
						className={cn(cls.icon, {}, ['icon-raiting'])}/>{data[0].attributes.Raiting} из 5
					</div>
					<div className={cn(cls.props, {}, [cls.satisfaction])}><span
						className={cn(cls.icon, {}, ['icon-satisfaction'])}/>{data[0].attributes.Satisfaction}%
						довольных клиентов
					</div>
					<div className={cn(cls.props, {}, [cls.education])}><span
						className={cn(cls.icon, {}, ['icon-education'])}/>{data[0].attributes.Education}
					</div>
					<div className={cn(cls.props, {}, [cls.experience])}><span
						className={cn(cls.icon, {}, ['icon-experience'])}/>{data[0].attributes.Experience} лет
						опыта
					</div>

				</div>
				{data[0].attributes.Medods_link
					? (
						<Button
							click={data[0].attributes.Medods_link}
							className={cls.button} text={'Записаться на прием'} color={"primary"}
							size={'100%'}/>
					)
					: (
						<Button
							click={"openCallback"}
							className={cls.button} text={'Записаться на прием'} color={"primary"}
							size={'100%'}/>
					)
				}
			</div>
			{!!data[0].attributes.Description &&
				<div className={cn(cls.description)}>
					<h3 className={cn(cls.descriptionTitle, {}, [muller500.className])}>Подробнее о специалисте</h3>
					<RichText text={data[0].attributes.Description}
							  className={cls.descriptionText}/>
				</div>
			}
		</div>
	} else {
		notFound();
	}
}