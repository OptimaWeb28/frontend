import {getData, GetDataPaths} from "@/shared/api";
import cls from './ServicesTypes.module.scss';
import {IServicesTypesData} from "./ServicesTypes.types";
import {ServiceType} from "@/entities/ServiceType";


export async function ServicesTypes() {
	const res: IServicesTypesData = await getData(GetDataPaths.SERVICES_TYPES);
	const {data} = res;
	return <div className={cls.ServicesTypes}>
		{data.map(service => {
			return (

				<ServiceType
					key={service.id}
					imageUrl={`${process.env.HOST_CMS}${service.attributes.Image.data.attributes.url}`}
					title={service.attributes.Title} description={service.attributes.Subtitle}
					price={`${service.attributes.Start_price}`}
					link={`/services/${service.attributes.slug}`}
				/>
			)
		})}
	</div>
}