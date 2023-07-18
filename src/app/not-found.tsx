import Link from 'next/link';
import cls from './not-found.module.scss';
import {cn} from "@/shared/lib";
import Image from 'next/image';

export default function NotFound() {
	return (
		<div className={cn(cls.NotFound, {}, ['container'])}>
			<div className={cls.content}>
				<Image className={cls.image} width={80} height={80} src={"/images/notFound/notFound.svg"}
					   alt={'Страница не неайдена'}/>
				<h1 className={cls.title}>Страница не найдена ...</h1>
				<Link className={cls.link} href='/'>
					<button className={cls.button}>Вернуться на главную</button>
				</Link>
			</div>
		</div>
	);
}