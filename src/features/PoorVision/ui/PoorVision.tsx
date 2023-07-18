import cls from './PoorVision.module.scss';
import {cn} from "@/shared/lib";

interface IPoorVisionProps {
	className?: string;
}

export function PoorVision(props: IPoorVisionProps) {
	const {className = ''} = props;
	return (
		<div className={cn(className, {}, [cls.PoorVision, 'bvi-open'])}>
			<span className='icon-eye'/>
			<div className={cls.content}>Версия сайта для слабовидящих</div>
		</div>
	)
}