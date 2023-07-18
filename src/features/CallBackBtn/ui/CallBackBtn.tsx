'use client';
import cls from './CallBackBtn.module.scss';
import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {cn} from "@/shared/lib";
import {useCallbackPopup} from "@/shared/store";

export function CallBackBtn() {
	const {openPopup} = useCallbackPopup();


	return (<>
			<button className={cls.button} onClick={openPopup}><span className={cn(cls.icon, {}, ['icon-callback2'])}/>Заказать
				обратный
				звонок
			</button>
		</>
	)
}