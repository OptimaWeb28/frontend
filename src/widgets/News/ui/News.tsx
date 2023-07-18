import Link from 'next/link';
import {INewsProps} from "./News.types";
import {getDataWithPagination} from "@/shared/api/getDataWithPagination";
import Image from 'next/image';
import {cn} from "@/shared/lib";
import {RichText} from "@/entities/RichText";
import {Pagination} from "@/features/Pagination";
import cls from './News.module.scss';
import {PriceBlock} from "@/features/PriceBlock";

export async function News<T>(props: INewsProps) {
	const {page = 1, pageSize = 20, routeWithoutSlash, path, sort = '', withPrice} = props;
	const allData = await getDataWithPagination<T>(path, {page, pageSize, sort})
	const {data, meta} = allData;

	return (
		<>
			{data.map((item: any) => {
				return (
					<div key={item.id} className={cls.News}>
						<Link className={cls.link} href={`/${routeWithoutSlash}/${item.attributes.slug}`}/>
						<div className={cn(cls.content, {[cls.contentWithPrice]: withPrice})}>
							<div className={cls.imageWrapper}>
								<Image fill={true}
									   alt={item.attributes.Title}
									   title={item.attributes.Title}
									   src={`${process.env.HOST_CMS}${item.attributes.Image.data.attributes.url}`}
									   placeholder={"blur"}
									   blurDataURL={item.attributes.Image.data.attributes.placeholder}
									   sizes={'(max-width: 1440px) 20vw,10vw'}
								/>
							</div>
							<div
								className={cls.infoWrapper}>
								<h3 className={cls.title}>{item.attributes.Title}</h3>
								<div className={cls.textWrapper}>
									<RichText
										text={item.attributes.Text} className={cls.text}/>
								</div>
								<div className={cls.readMore}>Читать подробнее</div>

							</div>
							{!!withPrice
								&& (
									<PriceBlock price={item.attributes.Service.data?.attributes.Price}
												Medods_link={item.attributes.Service.data?.attributes.Medods_link}
												className={cls.priceBlock}
												type={"OnList"}
									/>
								)
							}
						</div>
					</div>
				);
			})}
			<Pagination route={routeWithoutSlash} pageCount={meta.pagination.pageCount}/>
		</>
	);
}