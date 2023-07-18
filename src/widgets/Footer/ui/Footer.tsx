import {cn} from "@/shared/lib";
import cls from './Footer.module.scss';
import {muller400, muller500} from '@/shared/fonts';
import Link from "next/link";
import {Address} from "@/features/Address";
import {PhoneNumber} from "@/features/PhoneNumber";
import {getData, GetDataPaths} from "@/shared/api";
import {ISocialLinksData} from "@/widgets/Footer/ui/Footer.types";

interface IFooterProps {
	className?: string;
}

export async function Footer(props: IFooterProps) {
	const {className = ''} = props;
	const res: ISocialLinksData = await getData(GetDataPaths.SOCIAL_LINKS);
	const {data} = res;
	return (
		<footer className={className}>
			<div className={cn(cls.Footer, {}, ['container'])}>

				<div className={cn(cls.linksWrapper)}>
					<h3 className={cn(cls.linksTitle, {}, [muller500.className])}>О клинике</h3>
					<Link href={'/about/news/'}>Новости</Link>
					<Link href={'/about/feedback'}>Отзывы</Link>
					<Link href={'/about/licenses'}>Лицензии</Link>
					<Link href={'/about/documents'}>Документы</Link>
					<Link href={'/policy-privacy'}>Политика конфиденциальности</Link>
					<Link href={'/contacts'}>Контакты</Link>
				</div>
				<div className={cn(cls.contactsWrapper)}>
					<address className={cn(cls.address)}>
						{/* @ts-expect-error Async Server Component */}
						<Address ghost={true} withTitle={false}/>
						{/* @ts-expect-error Async Server Component */}
						<PhoneNumber ghost={true} withTitle={false}/>
					</address>
					<div className={cn(cls.joinUs)}>
						<h5 className={cn(cls.joinUsTitle, {}, [muller400.className])}>Присоединяйтесь к нам:</h5>
						<div className={cn(cls.socialWrapper)}>
							<a target={'_blank'} href={data.attributes.Vk}>
								<span className={cn('icon-vkontakte', {}, [cls.icon])}/>
							</a>
							<a target={'_blank'} href={data.attributes.Ok}>
								<span className={cn('icon-odnoklassniki', {}, [cls.icon])}/>
							</a>
							<a target={'_blank'}
							   href={data.attributes.WhatsApp}>
								<span className={cn('icon-whatsapp', {}, [cls.icon])}/>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className={cn(cls.copyrightWrapper)}>
				<div className={'container'}>
					<p>©2023 OPTIMA. Все права защищены.</p>
				</div>
			</div>
		</footer>
	)
}