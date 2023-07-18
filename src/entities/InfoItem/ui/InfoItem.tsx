import {IInfoItemProps} from './InfoItem.types';
import cls from './InfoItem.module.scss';
import {cn} from '@/shared/lib';
import {muller400, muller500, muller700} from '@/shared/fonts';

export function InfoItem(props: IInfoItemProps) {
	const {children, className, iconFontClass, title, iconStyle = "fill"} = props;
	return (
		<div className={cn(cls.InfoItem, {[className as string]: className, [cls.withoutTitle]: !title})}>
			<div className={cn(cls.iconWrapper)}>
				<span className={cn(cls.icon, {
					[cls.fill]: iconStyle === "fill",
					[cls.ghost]: iconStyle === "ghost"
				}, [iconFontClass])}></span>
			</div>
			<div className={cn(cls.textWrapper)}>
				{title && <div className={cn(cls.title, {}, [muller700.className])}>{title}</div>}
				<div
					className={cn(cls.text, {
						[iconStyle === "ghost" ? muller400.className : muller500.className]: true,
						[iconStyle === "ghost" ? cls.textGhost : cls.textFill]: true
					}, [])}>
					{children}
				</div>
			</div>
		</div>
	)
}