'use client'
import cls from './PostResume.module.scss';
import {Title} from "@/entities/Title";
import {cn} from "@/shared/lib";
import {muller700} from '@/shared/fonts';
import React, {ChangeEvent, FormEvent, useRef, useState} from "react";
import {PrivacyCheckbox} from "@/features/PrivacyCheckbox/ui/PrivacyCheckbox";
import {GetDataPaths} from "@/shared/api";
import {FormLoader} from "@/shared/ui";

export function PostResume() {
	const [name, setName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [text, setText] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);
	const [privacy, setPrivacy] = useState<boolean>(true);
	const [warning, setWarning] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [successMsg, setSuccessMsg] = useState<boolean>(false);
	const inputFileRef = useRef<HTMLInputElement | null>(null);

	const addName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}

	const addText = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	}

	const addFile = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.files !== null && setFile(e.target.files[0]);
	}

	const togglePrivacy = (e: any) => {
		if (!e.target.classList.contains('privacyLink')) {
			setPrivacy(p => !p)
		}
	};

	const formatPhoneNumber = (phoneNumberString: string) => {
		const cleaned = phoneNumberString.replace(/\D/g, '');
		const match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
		if (match) {
			let formattedNumber = '';
			if (match[1]) {
				formattedNumber = `+${match[1]}`;
			}
			if (match[2]) {
				formattedNumber += ` (${match[2]}`;
			}
			if (match[3]) {
				formattedNumber += `) ${match[3]}`;
			}
			if (match[4]) {
				formattedNumber += `-${match[4]}`;
			}
			if (match[5]) {
				formattedNumber += `-${match[5]}`;
			}
			return formattedNumber;
		}
		return phoneNumberString.slice(0, 18);
	};
	const addPhone = (e: ChangeEvent<HTMLInputElement>) => {
		setPhone(formatPhoneNumber(e.target.value));

	}
	const postData = async (e: FormEvent) => {
		e.preventDefault();
		if (privacy) {
			setLoading(true);
			const formData = new FormData();
			formData.append('data', JSON.stringify({
				Name: name,
				Phone: phone,
				Info: text,
			}));
			if (file) {
				formData.append('files.Resume', file, file.name);
			}
			const res = await fetch(`http://localhost:1337/api${GetDataPaths.RESUME}`, {
				method: "POST",
				headers: {
					'Authorization': `Bearer 88bd9e53708d0bd474ea67971d89b26406109c9835b60db9cf5cbf41a3128c764ad850dffe92024975003cc2216faf9df819066765445a412c0345865d13e80220192aad97c8c45bae477aff41a69ce0eecfcc851cf68acc4d40216fa2fb3ff86db582580475756dd18728a5e2e7c3e236e589b9ba20c237ae85f8747cdc7b85`
				},
				body: formData,
			});
			if (res.ok) {
				await fetch('/api/email', {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						type: "POST_RESUME",
						data: {
							Name: name,
							Phone: phone
						}
					})
				})
				setName('');
				setText('');
				setWarning(false);
				setLoading(false);
				setSuccessMsg(true);
				setPhone('');
				setFile(null);
				if (inputFileRef.current) {
					inputFileRef.current.value = "";
				}
				setTimeout(() => setSuccessMsg(false), 3000);
			}
		} else {
			setWarning(true);
		}
	}
	return <section className={cn(cls.PostResume, {}, ['container'])}>
		<div className={cn(cls.successMsg, {[cls.active]: successMsg})}>Спасибо! <br/> Ваше резюме отправлено! <br/> В
			ближайшее время мы с вами свяжемся! <br/> <span>Это окно закроется через 3 секунды</span>
		</div>
		<div className={cn(cls.loader, {[cls.active]: loading})}>
			<FormLoader/><span>Отправка данных...</span></div>
		<Title title={"Отправить резюме"} titleType={"h2"} className={cn(cls.title, {}, [muller700.className])}/>
		<form className={cls.form} onSubmit={(e) => postData(e)}>
			<label htmlFor={"nameInput"} className={cn(cls.label, {}, [cls.nameLabel])}>Ваше имя</label>
			<input
				type="text"
				name={"name"}
				id={"nameInput"}
				className={cls.name}
				placeholder={"Ваше имя"}
				value={name}
				onChange={(e) => addName(e)}
				required={true}/>
			<label htmlFor={"phoneInput"} className={cn(cls.label, {}, [cls.phoneLabel])}>Телефон</label>
			<input
				type="tel"
				name={"phone"}
				id={"phoneInput"}
				className={cls.phone}
				placeholder={"Номер телефона (Начиная с 7)"}
				value={phone}
				onChange={(e) => addPhone(e)}
				required={true}/>
			<label htmlFor={"textarea"} className={cn(cls.label, {}, [cls.textLabel])}>Расскажите о себе</label>
			<textarea
				className={cn(cls.text)}
				name={'Text'}
				id={"textarea"}
				placeholder={"Расскажите о себе"} value={text}
				onChange={(e) => addText(e)}
				required={true}
			/>
			<label htmlFor={"fileInput"} className={cn(cls.label, {}, [cls.fileLabel])}>Прикрепить резюме (PDF, DOC,
				DOCX)</label>
			<input
				ref={inputFileRef}
				type="file"
				accept=".pdf,.doc,.docx"
				name={"file"}
				id={"fileInput"}
				className={cls.file}
				onChange={(e) => addFile(e)}
			/>
			<PrivacyCheckbox privacy={privacy} warning={warning} togglePrivacy={togglePrivacy}
							 className={cls.privacy}/>
			<button className={cls.button} type={"submit"}>Отправить резюме</button>
		</form>
	</section>
}