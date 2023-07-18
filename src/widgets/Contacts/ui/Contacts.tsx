import {IContactsProps} from './Contacts.types';
import {cn} from '@/shared/lib';
import cls from './Contacts.module.scss';
import {muller700} from '@/shared/fonts';
import {Logo} from "@/entities/Logo";
import {Suspense} from "react";
import {Address} from "@/features/Address";
import {WorkingTime} from "@/features/WorkingTime";
import {PhoneNumber} from "@/features/PhoneNumber";

export function Contacts(props: IContactsProps) {
	const {title, titleType, withContainer = false} = props;
	return <section className={cn(cls.Contacts)}>
		{titleType === "h1" ?
			<h1 className={cn(cls.title, {container: withContainer}, [muller700.className])}>{title}</h1> :
			<h2 className={cn(cls.title, {container: withContainer}, [muller700.className])}>{title}</h2>}
		<div className={cn(cls.wrapper)}>
			<a href="https://yandex.ru/maps/11374/belogorsk/?utm_medium=mapframe&utm_source=maps"
			   style={{color: "#eee", fontSize: "12px", position: "absolute", top: "0px"}}>Белогорск</a>
			<a href="https://yandex.ru/maps/11374/belogorsk/?from=mapframe&ll=128.459041%2C50.909666&mode=usermaps&source=mapframe&um=constructor%3A6452abb9cad06d2b96dda041d4d96d77492ca9cd59b7d036e8d7e796c1d5d6f8&utm_medium=mapframe&utm_source=maps&z=18"
			   style={{color: "#eee", fontSize: "12px", position: "absolute", top: "14px"}}>Яндекс Карты — транспорт,
				навигация, поиск мест</a>
			<iframe scrolling='no' className={cn(cls.map)}
					src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=128.459041%2C50.909666&mode=usermaps&source=mapframe&um=constructor%3A6452abb9cad06d2b96dda041d4d96d77492ca9cd59b7d036e8d7e796c1d5d6f8&utm_source=mapframe&z=18&scroll=false"
					style={{position: "relative"}}></iframe>
			<div className={cn(cls.container, {}, ['container'])}>
				<div className={cls.addressCard}>
					<div className={cn(cls.addressCardWrapper)}>

						<div className={cn(cls.logo)}>
							{/* @ts-expect-error Async Server Component */}
							<Logo/>
						</div>
						<address className={cn(cls.address)}>
							{/* @ts-expect-error Async Server Component */}
							<Address withTitle={false}/>
							{/* @ts-expect-error Async Server Component */}
							<WorkingTime withTitle={false}/>
							{/* @ts-expect-error Async Server Component */}
							<PhoneNumber withTitle={false}/>
						</address>
					</div>
				</div>
			</div>
		</div>
	</section>
}