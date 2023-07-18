import cls from './RecordPopup.module.scss';
import {cn} from "@/shared/lib";
import React, {useEffect, useState} from "react";
import {useRecordPopup} from "@/shared/store";
import {shallow} from "zustand/shallow";

export function RecordPopup() {
	const {path, closeRecordPopup, openRecordPopup, isOpen} = useRecordPopup(s => s, shallow);

	const handleKeyDown = (e: KeyboardEventInit) => {
		if (isOpen) {
			if (e.key === "Escape") {
				closeRecordPopup();
			}
		}
	};
	useEffect(() => {
		const onKeyDown = (e: KeyboardEventInit) => handleKeyDown(e);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	});

	return (<>{isOpen
		? (<div onClick={(e) => closeRecordPopup(e)}
				className={cn(cls.overlay, {[cls.active]: isOpen}, ['recordOverlay'])}>
			<div className={cls.popup}>
				<div className={cls.closePanel}>
					{/*<div className={cls.closeText}>Закрыть окно &rarr;</div>*/}
					<button onClick={() => closeRecordPopup()} className={cls.close}>
					</button>

				</div>
				<iframe src={path}/>
			</div>
		</div>)
		: (<></>)
	}</>)
}