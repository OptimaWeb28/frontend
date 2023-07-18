'use client';
import cls from './MobileBottomMenu.module.scss';
import {cn} from "@/shared/lib";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {useState} from "react";
import {useChat, useNavMenuMobile, useRecordPopup} from "@/shared/store";
import {shallow} from "zustand/shallow";

export function MobileBottomMenu() {
	const pathname = usePathname();

	const [infoDropdownState, setInfoDropdownState] = useState<'opened' | 'closed'>('closed');
	const [recordDropdownState, setRecordDropdownState] = useState<"opened" | "closed">("closed");
	const [isOverlay, setIsOverlay] = useState<boolean>(false);
	const {openChat, loading} = useChat(s => s, shallow);
	const openRecordPopup = useRecordPopup(s => s.openRecordPopup, shallow);
	const [openCallbackDropdown, openContactDropdown] = useNavMenuMobile(s => [s.openCallbackDropdown, s.openContactDropdown], shallow);

	const toggleInfoDropdown = () => {
		if (recordDropdownState === "opened") {
			setRecordDropdownState("closed");
			setInfoDropdownState("opened");

		} else if (!isOverlay && infoDropdownState === "closed") {
			document.body.style.overflow = 'hidden';
			setInfoDropdownState("opened");
			setIsOverlay(true);
		} else {
			document.body.style.overflow = 'auto';
			setInfoDropdownState("closed");
			setIsOverlay(false);
		}
	}

	const toggleRecordDropdown = () => {
		if (infoDropdownState === "opened") {
			setInfoDropdownState("closed");
			setRecordDropdownState("opened")
		} else if (!isOverlay && recordDropdownState === "closed") {
			document.body.style.overflow = 'hidden';
			setRecordDropdownState("opened");
			setIsOverlay(true);
		} else {
			document.body.style.overflow = 'auto';
			setRecordDropdownState("closed");
			setIsOverlay(false);
		}
	}

	const closeDropdownsAndOverlay = (e: any) => {
		if (e.target.classList.contains('overlay')) {
			e.stopPropagation();
			e.preventDefault();
			document.body.style.overflow = 'auto';
			setInfoDropdownState("closed");
			setRecordDropdownState("closed");
			setIsOverlay(false);
			return;

		}
		if (isOverlay && infoDropdownState === "opened" && !e.target.closest('.unClosed')) {
			document.body.style.overflow = 'auto';
			setInfoDropdownState("closed");
			setIsOverlay(false);
			return;
		}
		if (isOverlay && recordDropdownState === "opened" && !e.target.closest('.unClosed')) {
			document.body.style.overflow = 'auto';
			setRecordDropdownState("closed");
			setIsOverlay(false);
			return;
		}
	}


	return (
		<nav onClick={(e) => closeDropdownsAndOverlay(e)} onTouchEnd={(e) => closeDropdownsAndOverlay(e)}
			 className={cn(cls.MobileBottomMenu, {[cls.z]: isOverlay})}>
			<div className={cn(cls.item, {
				[cls.active]: pathname === '/',
				[cls.withoutBefore]: infoDropdownState === "opened" || recordDropdownState === "opened"
			})}>
				<Link className={cls.link} href='/'/>
				<span className={cn('icon-menu-home', {}, [cls.icon])}/>
				<div className={cls.text}>
					Главная
				</div>
			</div>
			<div className={cn(cls.item, {
				[cls.active]: pathname.includes('/doctors'),
				[cls.withoutBefore]: infoDropdownState === "opened" || recordDropdownState === "opened"
			})}>
				<Link className={cls.link} href='/doctors'/>
				<span className={cn('icon-menu-doctors', {}, [cls.icon])}/>
				<div className={cls.text}>

					Наши врачи
				</div>
			</div>
			<div className={cn(cls.item, {
				[cls.active]: pathname.includes('/device'),
				[cls.withoutBefore]: infoDropdownState === "opened" || recordDropdownState === "opened"
			})}>
				<Link className={cls.link} href='/device'/>
				<span className={cn('icon-menu-devices', {}, [cls.icon])}/>
				<div className={cls.text}>

					Наше оборудование
				</div>
			</div>
			<div onClick={toggleInfoDropdown} className={cn(cls.item, {
				[cls.active]: pathname.includes('/about'),
				[cls.withoutBefore]: infoDropdownState === "opened" || recordDropdownState === "opened",
				[cls.dropped]: infoDropdownState === "opened"
			}, ['unClosed'])}>
				<span className={cn('icon-menu-info', {}, [cls.icon])}/>
				<div className={cls.text}>
					Информация
				</div>
			</div>
			<div onClick={toggleRecordDropdown} className={cn(cls.item, {
				[cls.withoutBefore]: infoDropdownState === "opened" || recordDropdownState === "opened",
				[cls.dropped]: recordDropdownState === "opened"
			}, [cls.recordItem, 'unClosed'])}>
				<span className={cn('icon-menu-services', {}, [cls.icon])}/>
				<div className={cls.text}>
					Запись
				</div>
			</div>
			<div className={cn(cls.infoDropdown, {[cls.active]: infoDropdownState === "opened"})}>
				<div className={cn(cls.item, {[cls.active]: pathname === ('/about')})}>
					<Link className={cn(cls.link)} href={'/about'}/>
					<span className={'icon-menu-about'}/>
					<div className={cls.text}>О центре</div>
				</div>
				<div className={cn(cls.item, {[cls.active]: pathname.includes('/news')})}>
					<Link className={cn(cls.link)} href='/about/news'/>
					<span className={'icon-menu-news'}/>
					<div className={cls.text}>Новости</div>
				</div>
				<div className={cn(cls.item, {[cls.active]: pathname.includes('articles')})}>
					<Link className={cn(cls.link)} href='/about/articles'/>
					<span className={'icon-menu-articles'}/>
					<div className={cls.text}>Об услугах</div>
				</div>
				<div className={cn(cls.item, {[cls.active]: pathname === '/about/documents'})}>
					<Link className={cn(cls.link)} href='/about/documents'/>
					<span className={'icon-menu-docs'}/>
					<div className={cls.text}>Документы</div>
				</div>
				<div className={cn(cls.item, {[cls.active]: pathname === '/about/vakancy'})}>
					<Link className={cn(cls.link)} href='/about/vakancy'/>
					<span className={'icon-menu-vakancy'}/>
					<div className={cls.text}>Вакансии</div>
				</div>
				<div className={cn(cls.item, {[cls.active]: pathname === '/about/feedback'})}>
					<Link className={cn(cls.link)} href='/about/feedback'/>
					<span className={'icon-menu-feedback'}/>
					<div className={cls.text}>Отзывы</div>
				</div>
				<div className={cn(cls.item, {[cls.active]: pathname === '/about/licenses'})}>
					<Link className={cn(cls.link)} href='/about/licenses'/>
					<span className={'icon-menu-licence'}/>
					<div className={cls.text}>Лицензии</div>
				</div>
			</div>
			<div className={cn(cls.recordDropdown, {[cls.active]: recordDropdownState === "opened"})}>
				<div className={cls.linkItem}>
					<Link href={'/record'}>Подробнее о способах записи</Link>
				</div>
				<div onClick={() => openContactDropdown()} className={cn(cls.item)}>
					<span className={'icon-menu-call-us'}/>
					<div className={cls.text}>Позвонить нам</div>
				</div>
				<div onClick={() => openCallbackDropdown()} className={cn(cls.item)}>
					<span className={'icon-callback2'}/>
					<div className={cls.text}>Обратный звонок</div>
				</div>
				<div onClick={() => openRecordPopup()} className={cn(cls.item)}>
					<span className={'icon-menu-online-record'}/>
					<div className={cls.text}>Онлайн запись</div>
				</div>
				<div onClick={() => openChat()} className={cn(cls.item)}>
					<span className={'icon-menu-chat'}/>
					<div className={cls.text}>{loading ? "Загрузка ..." : "Написать в чат"}</div>
				</div>
			</div>
			{isOverlay && <div onClick={closeDropdownsAndOverlay} onTouchEnd={closeDropdownsAndOverlay}
							   className={cn(cls.overlay, {[cls.active]: isOverlay}, ['overlay'])}/>}
		</nav>)
}