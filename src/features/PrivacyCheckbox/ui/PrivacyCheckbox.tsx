import React from 'react';
import cls from './PrivacyCheckbox.module.scss';
import Link from 'next/link';
import {cn} from "@/shared/lib";
import {PrivacyCheckboxProps} from "@/features/PrivacyCheckbox/ui/PrivacyCheckbox.types";

export function PrivacyCheckbox(props: PrivacyCheckboxProps) {
	const {privacy, warning, togglePrivacy, className = ''} = props;

	return (
		<div onClick={(e) => togglePrivacy(e)} className={cn(className, {}, [cls.privacy])}>
			<input onChange={(e) => togglePrivacy(e)} className={cls.inputPrivacy} type={"checkbox"}
				   id={"privacyCheckbox"} checked={privacy}
			/>
			<label className={cn(cls.labelPrivacy, {
				[cls.active]: privacy,
				[cls.warning]: warning && !privacy
			})} htmlFor={"privacyCheckbox"}>Нажимая
				на кнопку, вы даете
				согласие&nbsp;
				<Link className={cn(cls.link, {}, ['privacyLink'])} href={"/policy-privacy"}>
					на обработку своих персональных
					данных
				</Link>
			</label>
		</div>
	)
}