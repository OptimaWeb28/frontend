import cls from "./NewsOnPage.module.scss";
import {RichText} from "@/entities/RichText";
import {cn} from "@/shared/lib";
import {muller400} from "@/shared/fonts";
import Image from "next/image";
import {PriceBlock} from "@/features/PriceBlock";

type Props<T> = {
	data: T[];
	withPrice?: boolean
}

interface Service {
	data: ServiceData | null;
}

interface ServiceData {
	id: number;
	attributes: FluffyAttributes;
}

interface FluffyAttributes {
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Medods_link: string | null;
	Price: number;
}

export function NewsOnPage<T extends {
	attributes: {
		Text: string,
		Title: string,
		Image: { data: { attributes: { url: string, placeholder: string } } }
		Service?: Service
	}
}>(props: Props<T>) {
	const {withPrice = false, data} = props;
	return (
		<>
			<div className={cls.content}>
				<div className={cls.textWrapper}>
					<RichText text={data[0].attributes.Text} className={cn(cls.text, {}, [muller400.className])}/>
				</div>
				<div className={cls.imageWrapper}>
					<Image fill={true} alt={data[0].attributes.Title}
						   title={data[0].attributes.Title}
						   src={`${process.env.HOST_CMS}${data[0].attributes.Image.data.attributes.url}`}
						   placeholder={'blur'}
						   blurDataURL={data[0].attributes.Image.data.attributes.placeholder}
						   sizes={'(max-width:992px) 100vw, (max-width: 1440px) 20vw'}
					/>
				</div>
				{withPrice && data[0].attributes.Service?.data?.attributes.Price && (
					<PriceBlock price={data[0].attributes.Service.data?.attributes.Price}
								Medods_link={data[0].attributes.Service.data?.attributes.Medods_link}
								className={cls.priceBlock}/>
				)}
			</div>

		</>

	);
}