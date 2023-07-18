'use client';
import {cn} from "@/shared/lib";
import cls from "./NavMenuDesktop.module.scss";
import {muller400, openSans} from "@/shared/fonts";
import Link from "next/link";
import React, {useState} from "react";
import {usePathname} from 'next/navigation';
import {useCallbackPopup, useRecordPopup} from "@/shared/store";
import {IPhoneNumberData} from "@/features/PhoneNumber/ui/PhoneNumber.types";
import {CallbackPopup} from "@/entities/CallbackPopup";
import {shallow} from "zustand/shallow";


export function NavMenuDesktop(props: {
	phoneNumberData: IPhoneNumberData
}) {
	const {phoneNumberData} = props;
	const pathname = usePathname();
	const [dropdownState, setDropdownState] = useState<"opened" | "closed">("closed");
	const [recordDropdown, setRecordDropdown] = useState<"opened" | "closed">("closed");
	const [phoneDrop, setPhoneDrop] = useState<"opened" | "closed">("closed");
	const {openPopup} = useCallbackPopup();
	const openRecordPopup = useRecordPopup(p => p.openRecordPopup, shallow)

	const togglePhoneDrop = () => {
		setPhoneDrop(p => p === "opened" ? "closed" : "opened");
	}

	const openDropdown = () => {
		setDropdownState("opened");
	}

	const closeDropdown = () => {
		setDropdownState("closed");
	}

	const openRecordDropdown = () => setRecordDropdown("opened");
	const closeRecordDropdown = () => {
		setRecordDropdown("closed")
		if (phoneDrop === 'opened') setPhoneDrop("closed");
	};
	return (<>
		<div className={cn(cls.leftSideDesk, {}, [openSans.className])}>
			<Link className={cn("", {[cls.active]: pathname === "/"})} href="/">ГЛАВНАЯ</Link>
			<Link className={cn("", {[cls.active]: pathname.includes("/doctors")})} href="/doctors">НАШИ
				ВРАЧИ</Link>
			<Link className={cn("", {[cls.active]: pathname.includes("/device")})} href="/device">НАШЕ
				ОБОРУДОВАНИЕ</Link>
			<div onMouseEnter={openDropdown} onMouseLeave={closeDropdown}
				 onClick={openDropdown}
				 className={cn(cls.dropdownParent)}>
				<div className={cn("", {
					[cls.active]: pathname.includes("/about"),
					[cls.dropped]: dropdownState === "opened",
				}, [cls.dropdownParentWrapper])}>
					Информация
					<span
						className={cn("icon-arrow-down", {}, [cls.arrow])}/>
				</div>
				<div
					className={cn(cls.dropdown, {[cls.dropdownActive]: dropdownState === "opened"})}>
					<Link className={cn("", {[cls.active]: pathname === ("/about")})}
						  href={"/about"}>О центре</Link>
					<Link className={cn("", {[cls.active]: pathname === "/about/news"})}
						  href="/about/news">Новости</Link>
					<Link
						className={cn("", {[cls.active]: pathname === "/about/articles"})}
						href="/about/articles">Об услугах</Link>
					<Link
						className={cn("", {[cls.active]: pathname === "/about/documents"})}
						href="/about/documents">Документы</Link>
					<Link
						className={cn("", {[cls.active]: pathname === "/about/vakancy"})}
						href="/about/vakancy">Вакансии</Link>
					<Link
						className={cn("", {[cls.active]: pathname === "/about/feedback"})}
						href="/about/feedback">Отзывы</Link>
					<Link
						className={cn("", {[cls.active]: pathname === "/about/licenses"})}
						href="/about/licenses">Лицензии</Link>
				</div>
			</div>
			<div onMouseEnter={openRecordDropdown} onMouseLeave={closeRecordDropdown}
				 onClick={openRecordDropdown}
				 className={cn(cls.recordDropdownWrapper, {
					 [cls.opened]: recordDropdown === "opened",
					 [cls.dropped]: recordDropdown === "opened"
				 })}>

				<div className={cls.title}>ЗАПИСЬ
					<span className={cn("icon-arrow-down", {}, [cls.arrow])}/>
				</div>
				<div className={cn(cls.dropdown, {}, [muller400.className])}>
					<div className={cn(cls.readMore)}>
						<Link href={'/record'}/>
						Подробнее о способах записи
					</div>
					<div onClick={togglePhoneDrop}
						 className={cn(cn(cls.dropdownItem, {[cls.active]: phoneDrop === 'opened'}))}>
						<span className={cn("icon-menu-call-us", {}, [cls.icon])}/>
						<div className={cls.text}>
							Позвонить нам
						</div>

					</div>
					<div onClick={openPopup} className={cls.dropdownItem}>
						<span className={cn("icon-callback2", {}, [cls.icon])}/>
						<div className={cls.text}>
							Обратный звонок
						</div>
					</div>
					<div onClick={() => openRecordPopup()} className={cls.dropdownItem}>
						<span className={cn("icon-menu-online-record")}/>
						<div className={cls.text}>
							Онлайн запись
						</div>
					</div>
					<div onClick={() => MeTalk('openSupport')} className={cls.dropdownItem}>
						<span className={cn("icon-menu-chat")}/>
						<div className={cls.text}>
							Написать в чат
						</div>
					</div>
					<div className={cn(cls.phoneDrop, {[cls.active]: phoneDrop === 'opened'})}>
						<div className={cls.phone}>
							<div className={cls.text}>
								Номер телефона:
							</div>
							<a className={cls.number}
							   href={`tel:${phoneNumberData.attributes.NumberLink}`}>{phoneNumberData.attributes.Number}</a>
							<div className={cls.hint}>(Нажмите на номер, чтобы позвонить)</div>

						</div>
					</div>
				</div>
			</div>
			<Link className={cn("", {[cls.active]: pathname === "/contacts"})} href="/contacts">КОНТАКТЫ</Link>

		</div>
		<CallbackPopup/>
	</>)
}