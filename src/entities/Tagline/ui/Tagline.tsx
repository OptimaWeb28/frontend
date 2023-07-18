import {getData, GetDataPaths} from '@/shared/api';
import cls from './Tagline.module.scss';
import {ITagLineData, ITagLineProps} from './Tagline.types';
import {cn} from '@/shared/lib';
import {inter} from '@/shared/fonts';

export async function Tagline(props: ITagLineProps) {
	const {className = ''} = props;
	const resp: { data: ITagLineData } = await getData(GetDataPaths.TAG_LINE);
	const {data} = resp;
	return (
		<div className={cn(cls.Tagline, {[className]: className}, [className])}>
			<div className={cn('container', {}, [cls.wrapper])}>
				<span className='icon-arrow-left'></span>
				<div className={cn(inter.className)}>
					{data.attributes.Text}
				</div>
				<span className='icon-arrow-right'></span>
			</div>
		</div>
	)
}