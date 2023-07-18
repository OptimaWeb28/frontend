import cls from './Doctors.module.scss';
import {cn} from "@/shared/lib";
import Image from 'next/image';
import {Button} from "@/entities/Button";
import {Pagination} from "@/features/Pagination";
import Link from "next/link";
import {IDoctorsProps, Doctor} from "./Doctors.types";
import {Title} from "@/entities/Title";
import {getDataWithPagination} from "@/shared/api/getDataWithPagination";
import {GetDataPaths} from "@/shared/api";


export async function Doctors(props: IDoctorsProps) {
	const {page = 1} = props;
	const allData = await getDataWithPagination<Doctor>(GetDataPaths.DOCTORS, {
		page,
		pageSize: 20,
		sort: 'sort[0]=Raiting:desc'
	});
	const {data, meta} = allData;
	return (<>
		<div className={cn(cls.Doctors)}>
			<Title title={`Врачи лечебно-диагностического центра "Оптима"`}/>
			<div className={cls.doctorsList}>
				{data.map((doctor) => {
					let doctorSrc: string;
					switch (true) {
						case !!doctor.attributes.Photo.data.attributes?.formats?.small?.url :
							doctorSrc = doctor.attributes.Photo.data.attributes.formats.small.url;
							break;
						case !!doctor.attributes.Photo.data.attributes?.formats?.medium?.url :
							doctorSrc = doctor.attributes.Photo.data.attributes.formats.medium.url;
							break;
						default:
							doctorSrc = doctor.attributes.Photo.data.attributes.url;
					}
					return (
						<div key={doctor.id} className={cn(cls.doctor)}>
							<div className={cn(cls.imageWrapper)}>
								<Image className={cls.image} fill={true}
									   alt={`${doctor.attributes.Position} ${doctor.attributes.FIO}"`}
									   title={`${doctor.attributes.Position} ${doctor.attributes.FIO}`}
									   src={`${process.env.HOST_CMS}${doctorSrc}`}
									   placeholder={'blur'}
									   blurDataURL={doctor.attributes.Photo.data.attributes.placeholder}
									   sizes={'(max-width: 992px) 50vw,(max-width: 1440px) 20vw, (max-width: 2500px) 10vw'}
								/>
							</div>
							<div className={cn(cls.info)}>
								<Link href={`/doctors/${doctor.attributes.slug}`}
									  className={cn(cls.fio)}>{doctor.attributes.FIO}</Link>
								<div className={cn(cls.position)}>{doctor.attributes.Position}</div>
								<div className={cn(cls.props, {}, [])}><span
									className={cn(cls.icon, {}, ['icon-raiting'])}/>{doctor.attributes.Raiting} из 5
								</div>
								<div className={cn(cls.props, {}, [])}><span
									className={cn(cls.icon, {}, ['icon-satisfaction'])}/>{doctor.attributes.Satisfaction}%
									довольных клиентов
								</div>
								<div className={cn(cls.props, {}, [])}><span
									className={cn(cls.icon, {}, ['icon-education'])}/>{doctor.attributes.Education}
								</div>
								<div className={cn(cls.props, {}, [])}><span
									className={cn(cls.icon, {}, ['icon-experience'])}/>{doctor.attributes.Experience} лет
									опыта
								</div>

							</div>
							{doctor.attributes.Medods_link
								? (
									<Button
										click={doctor.attributes.Medods_link}
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
					)
				})}
			</div>

		</div>
		<Pagination route={'doctors'} pageCount={meta.pagination.pageCount}/>
	</>)
}