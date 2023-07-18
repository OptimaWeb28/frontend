import cls from './Address.module.scss';
import {getData, GetDataPaths} from '@/shared/api';
import {IAddressData, IAddressProps} from './Address.types';
import {InfoItem} from '@/entities/InfoItem';
import Link from "next/link";

export async function Address(props: IAddressProps) {
	const {withTitle = true, ghost = false} = props;
	const resp: { data: IAddressData } = await getData(GetDataPaths.ADDRESS);
	const {data} = resp;
	return (<InfoItem
		iconFontClass='icon-address2'
		title={withTitle ? 'Адрес медицинского центра:' : undefined}
		iconStyle={ghost ? "ghost" : "fill"}
	>
		<div className={cls.parent}>
			<span>{data.attributes.City}</span>
			<br/>
			<span>{data.attributes.Street}</span>
			{withTitle &&
				<Link className={cls.linkParent} href={'/contacts'}>
					<div className={cls.link}>Показать на карте</div>
				</Link>}
		</div>
	</InfoItem>)
}