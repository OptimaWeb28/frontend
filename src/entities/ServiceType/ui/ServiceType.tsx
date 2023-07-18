import Image from "next/image";
import cls from "./ServiceType.module.scss";
import {IServiceTypeProps} from "./ServiceType.types";
import Link from "next/link";

export function ServiceType(props: IServiceTypeProps) {
	const {imageUrl, title, description, price, link} = props;

	return (
		<div className={cls.parent}>
			<Link className={cls.link} href={link}/>
			<div className={cls.content}>
				<div className={cls.left}>
					<Image src={imageUrl} alt="Изображение услуги" fill={true}/>
				</div>
				<div className={cls.right}>
					<h2>{title}</h2>
					<p>{description}</p>
					<p className={cls.price}>от {price} руб.</p>
				</div>
			</div>
		</div>
	);
};