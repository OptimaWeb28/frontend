import {getData, GetDataPaths} from '@/shared/api';
import {ILogoData, ILogoProps} from './Logo.types';
import Image from 'next/image';
import {cn} from '@/shared/lib';
import cls from './Logo.module.scss';
import Link from "next/link";

export async function Logo(props: ILogoProps) {
	const {className} = props;
	const resp = await getData(GetDataPaths.LOGO);
	return (
		<Link href={'/'}>
			<Image
				src={process.env.HOST_CMS + resp.data.attributes.Image.data[0].attributes.url}
				alt='Optima Logo'
				fill={true}
				className={cn(cls.Logo, {className: className || ''})}
			/>
		</Link>
	)
}