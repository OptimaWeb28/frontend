import {getData, GetDataPaths} from '@/shared/api';
import {IPhoneNumberData, IPhoneNumberProps} from './PhoneNumber.types';
import {InfoItem} from '@/entities/InfoItem';

export async function PhoneNumber(props: IPhoneNumberProps) {
	const {withTitle = true, ghost = false} = props;
	const resp: { data: IPhoneNumberData } = await getData(GetDataPaths.PHONE_NUMBER);
	const {data} = resp;
	return (<InfoItem
		iconFontClass='icon-phone-header'
		title={withTitle ? 'Телефон:' : undefined}
		iconStyle={ghost ? "ghost" : "fill"}
	>
		<span>Звонок бесплатный</span>
		<br/>
		<a href={`tel:${data.attributes.NumberLink}`}>
			<span>{data.attributes.Number}</span>
		</a>
	</InfoItem>)
}