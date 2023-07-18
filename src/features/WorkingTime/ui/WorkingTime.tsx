import {getData, GetDataPaths} from '@/shared/api';
import {IWorkingTimeData, IWorkingTimeProps} from './WorkingTime.types';
import {InfoItem} from '@/entities/InfoItem';

export async function WorkingTime(props: IWorkingTimeProps) {
	const {withTitle = true} = props;
	const resp: { data: IWorkingTimeData } = await getData(GetDataPaths.WORKING_TIME);
	const {data} = resp;
	return (<InfoItem
		iconFontClass='icon-clock2'
		title={withTitle ? 'Время работы:' : undefined}
	>
		<span>{data.attributes.Days}</span>
		<br/>
		<span>{data.attributes.Hours}</span>
	</InfoItem>)
}