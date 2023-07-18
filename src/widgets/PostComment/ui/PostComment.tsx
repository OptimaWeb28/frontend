'use client';
import cls from './PostComment.module.scss';
import React, {ChangeEvent, FormEvent, useState} from "react";
import {GetDataPaths} from "@/shared/api";
import {Title} from "@/entities/Title";
import Link from 'next/link';
import Image from 'next/image';
import {cn} from "@/shared/lib";
import {muller700} from "@/shared/fonts";
import {PrivacyCheckbox} from "@/features/PrivacyCheckbox/ui/PrivacyCheckbox";
import {FormLoader} from "@/shared/ui";

export function PostComment() {
	const [name, setName] = useState<string>('');
	const [text, setText] = useState<string>('');
	const [raiting, setRaiting] = useState<"Like" | "Dislike">("Like");
	const [privacy, setPrivacy] = useState<boolean>(true);
	const [warning, setWarning] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [successMsg, setSuccessMsg] = useState<boolean>(false);
	const addName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}

	const addText = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	}

	const addRaiting = (value: "Like" | "Dislike") => {
		setRaiting(value);
	}

	const togglePrivacy = (e: any) => {
		if (!e.target.classList.contains('privacyLink')) {
			setPrivacy(p => !p)
		}
	};
	const postData = async (e: FormEvent, name: string, text: string) => {
		e.preventDefault();
		if (privacy) {
			setLoading(true);
			const res = await fetch(`http://localhost:1337/api${GetDataPaths.REVIEWS}`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					'Authorization': `Bearer 88bd9e53708d0bd474ea67971d89b26406109c9835b60db9cf5cbf41a3128c764ad850dffe92024975003cc2216faf9df819066765445a412c0345865d13e80220192aad97c8c45bae477aff41a69ce0eecfcc851cf68acc4d40216fa2fb3ff86db582580475756dd18728a5e2e7c3e236e589b9ba20c237ae85f8747cdc7b85`
				},
				body: JSON.stringify({
					data: {
						Name: name,
						Text: text,
						Raiting: raiting,
						Status: "На модерации",
						Date: new Date().toLocaleDateString('ru-RU', {
							day: 'numeric',
							month: 'numeric',
							year: 'numeric'
						})
					},
				})
			});
			if (res.ok) {
				await fetch('/api/email', {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						type: "POST_COMMENT",
						data: {
							Name: name,
							Text: text,
							Raiting: raiting
						}
					})
				})
				setName('');
				setText('');
				setWarning(false);
				setLoading(false);
				setSuccessMsg(true);
				setTimeout(() => setSuccessMsg(false), 3000);
			}
		} else {
			setWarning(true);
		}
	}
	return <div className={cls.PostComment}>
		<Title title={"Оставьте свой отзыв"} titleType={"h2"} className={cn(cls.title, {}, [muller700.className])}/>
		<div className={cls.wrapper}>
			<div className={cn(cls.successMsg, {[cls.active]: successMsg})}>Спасибо! <br/> Ваш отзыв отправлен на
				модерацию! <br/> <span>Это окно закроется через 3 секунды</span>
			</div>
			<div className={cn(cls.loader, {[cls.active]: loading})}>
				<FormLoader/><span>Отправка данных...</span></div>
			<form className={cls.form} onSubmit={(e) => postData(e, name, text)}>
				<input className={cn(cls.name)} type="text"
					   name={'Name'} placeholder={"Ваше имя"}
					   value={name}
					   onChange={(e) => addName(e)}
					   required={true}
				/>

				<input className={cls.inputLike} type={"checkbox"} id={"likeCheckbox"} name={'Raiting'} value={"Like"}
					   checked={raiting === "Like"}
					   onChange={() => addRaiting("Like")}/>
				<label className={cn(cls.labelLike, {[cls.active]: raiting === 'Like'})} htmlFor={"likeCheckbox"}/>
				<input className={cls.inputDislike} type={"checkbox"} id={"dislikeCheckbox"} name={'Raiting'}
					   value={"Dislike"}
					   checked={raiting === "Dislike"}
					   onChange={() => addRaiting("Dislike")}/>
				<label className={cn(cls.labelDislike, {[cls.active]: raiting === "Dislike"})}
					   htmlFor={"dislikeCheckbox"}/>

				<textarea className={cn(cls.text)} name={'Text'}
						  placeholder={"Текст отзыва"} value={text}
						  onChange={(e) => addText(e)}
						  required={true}
				/>
				<button className={cls.button} type={"submit"}>Отправить</button>
				<PrivacyCheckbox privacy={privacy} warning={warning} togglePrivacy={togglePrivacy}
								 className={cls.privacy}/>
			</form>
			<div className={cls.imageWrapper}>
				<Image fill={true} className={cls.image} src={"/images/feedback/feedback.png"} alt={"Оставьте отзыв"}/>
			</div>
		</div>
	</div>
}