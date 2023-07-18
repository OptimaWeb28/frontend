import {cn} from "@/shared/lib";
import cls from "./Title.module.scss";
import {muller400, muller700, muller500} from "@/shared/fonts";
import {IPageTitleProps} from "./Ttitle.types";

export function Title(props: IPageTitleProps) {
	const {title, titleType = "h1", className = '', style} = props;
	let titleComponent;
	if (titleType === 'h1') titleComponent =
		<h1 style={style} className={cn(cls.title, {}, [muller700.className, cls.h1, className])}>{title}</h1>;
	if (titleType === 'h2') titleComponent =
		<h2 style={style} className={cn(cls.title, {}, [muller500.className, cls.h2, className])}>{title}</h2>;
	if (titleType === 'h3') titleComponent =
		<h3 style={style} className={cn(cls.title, {}, [muller400.className, cls.h3, className])}>{title}</h3>;
	return (
		<>
			{titleComponent}
		</>

	)
}