'use client';
import cls from './RecordContent.module.scss';
import {CallBackBtn} from "@/features/CallBackBtn";
import {useCallbackPopup, useChat, useNavMenuMobile, useRecordPopup} from "@/shared/store";
import {shallow} from "zustand/shallow";
import {cn} from "@/shared/lib";
import React, {useEffect, useState} from "react";
import {muller500} from '@/shared/fonts';

export function RecordContent(props: {
	phoneNumber: string,
	phoneNumberLink: string
}) {
	const {phoneNumber, phoneNumberLink} = props;
	const openRecordPopup = useRecordPopup(s => s.openRecordPopup, shallow);
	const openCallbackPopup = useCallbackPopup(s => s.openPopup, shallow);
	const openCallbackDropdown = useNavMenuMobile(s => s.openCallbackDropdown, shallow);
	const {loading: chatLoading, openChat} = useChat(s => s, shallow);
	const [windowWidth, setWindowWidth] = useState<number>(0);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	let openCallback: () => void;
	if (windowWidth < 992) {
		openCallback = openCallbackDropdown;
	} else {
		openCallback = openCallbackPopup;
	}

	return (
		<div className={cls.RecordContent}>
			<div className={cls.variant}>
				<div className={cn(cls.description, {}, [muller500.className])}>
					Для быстрой консультации по имеющимся услугам - позвоните нам или оставьте заявку на
					обратный звонок и наш регистратор свяжется с вами
				</div>
				<div className={cls.actions}>
					<div className={cls.phone}>
						<div className={cls.phoneTitle}>
							Номер телефона:
						</div>
						<a className={cls.phoneLink} href={`tel:${phoneNumberLink}`}>{phoneNumber}</a>
						<div className={cls.hint}>(Нажмите на номер, чтобы позвонить)</div>
					</div>
					<div className={cls.callBack}>
						<button onClick={() => openCallback()}
								className={cn(cls.callbackBtn, {}, [cls.button])}>Обратный звонок
						</button>
					</div>
				</div>
			</div>
			<div className={cls.variant}>
				<div className={cn(cls.description)}>
					<div className={muller500.className}>

						Для самостоятельного просмотра списка услуг и онлайн-записи нажмите на
						кнопку {`${'"Онлайн запись"'}`}
					</div>
					<div className={cls.warning}>
						Обратите внимание, что на некоторые виды услуг, например на Сдачу анализов, предварительной
						записи
						нет.
						Оказание данных услуг осуществляется в порядке живой очереди, в отведенное время.
						Если вы не нашли нужную вам услугу в списке - перезвоните нам, или оставьте заявку на обратный
						звонок.
						Наш регистратор проконсультирует вас о наличии нужной вам услуги в нашем центре и о времени, в
						которое
						вы сможете прийти.
					</div>
				</div>
				<div className={cls.actions}>
					<button onClick={() => openRecordPopup()} className={cn(cls.recordBtn, {}, [cls.button])}>Онлайн
						запись
					</button>
				</div>
			</div>
			<div className={cls.variant}>
				<div className={cn(cls.description, {}, [muller500.className])}>
					Также вы можете записаться на нужную вам услугу, написав нам в чат.
				</div>
				<div className={cls.actions}>
					<div className={cls.chat}>
						<button
							onClick={() => openChat()}
							className={cn(cls.chatBtn, {}, [cls.button])}>{chatLoading ? "Загрузка..." : "Открыть чат"}</button>
					</div>
				</div>
			</div>
		</div>
	)
}