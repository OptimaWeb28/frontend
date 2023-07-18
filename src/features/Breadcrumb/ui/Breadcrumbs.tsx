'use client';
import {usePathname} from "next/navigation";
import Link from "next/link";
import cls from './Breadcrumbs.module.scss';
import {cn} from "@/shared/lib";
import {openSans} from '@/shared/fonts';
import {useEffect, useState} from "react";

export function Breadcrumbs() {
	const [pathNames, setPathNames] = useState({
		'/': "Главная",
		'/contacts': 'Контакты',
		'/device': 'Наше оборудование',
		'/doctors': "Наши врачи",
		'/policy-privacy': "Политика конфиденциальности",
		'/services': "Услуги и цены",
		'/about': "О центре",
		'/articles': "Статьи",
		'/documents': "Документы",
		'/feedback': "Отзывы",
		'/licenses': "Лицензии",
		'/news': "Новости",
		'/vakancy': "Вакансии",
		'/record': "Способы записи"
	});
	const currentPath = usePathname();
	const hosts = currentPath.split('/');
	useEffect(() => {
		const title = document.head.querySelector('title')?.textContent;
		title && !pathNames.hasOwnProperty(`/${hosts[hosts.length - 1]}`) && setPathNames({
			...pathNames,
			[`/${hosts[hosts.length - 1]}`]: title
		})
	}, [])
	const breadcrumbs = JSON.stringify(hosts) !== '["",""]' && hosts.reduce((res: JSX.Element[], host, index, arr) => {
		const path = host === '' ? '/' : '/' + host;
		const name = Object.entries(pathNames).map(([path2, name2]) => {
			if (path2 === path) {
				return name2;
			}
		})
		if (index === 0) {
			return [<Link className={cls.link} href={'/'} key={index}>Главная</Link>]
		} else if (index === (arr.length - 1)) {
			return [...res, <span key={host + index}> - </span>, <span key={index}>{name}</span>]
		} else {
			return [...res, <span key={host + index}> - </span>,
				<Link className={cls.link} key={index}
					  href={path === '/news' ? '/about/news' : path === '/articles' ? '/about/articles' : path}>{name}</Link>]
		}
	}, [])
	return <>{breadcrumbs &&
		<div className={cn(cls.Breadcrumb, {}, ['container', openSans.className])}>{breadcrumbs}</div>}</>
}