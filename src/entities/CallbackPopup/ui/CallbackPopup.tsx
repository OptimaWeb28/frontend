import {cn} from "@/shared/lib";
import cls from "./CallbackPopup.module.scss";
import {FormLoader} from "@/shared/ui";
import {PrivacyCheckbox} from "@/features/PrivacyCheckbox/ui/PrivacyCheckbox";
import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {GetDataPaths} from "@/shared/api";
import {useCallbackPopup} from "@/shared/store";

export function CallbackPopup() {
	const [name, setName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [privacy, setPrivacy] = useState<boolean>(true);
	const [warning, setWarning] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [successMsg, setSuccessMsg] = useState<boolean>(false);
	const {openPopup, setIsOpen, isOpen} = useCallbackPopup();

	const nameInputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (nameInputRef.current !== null) {
			nameInputRef.current.focus();
		}
	}, [isOpen])


	const postData = async (e: FormEvent, name: string, phone: string) => {
		e.preventDefault();
		if (privacy) {
			setLoading(true);
			const res = await fetch(`http://cms:1337/api${GetDataPaths.CALLBACKS}`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					'Authorization': `Bearer 88bd9e53708d0bd474ea67971d89b26406109c9835b60db9cf5cbf41a3128c764ad850dffe92024975003cc2216faf9df819066765445a412c0345865d13e80220192aad97c8c45bae477aff41a69ce0eecfcc851cf68acc4d40216fa2fb3ff86db582580475756dd18728a5e2e7c3e236e589b9ba20c237ae85f8747cdc7b85`
				},
				body: JSON.stringify({
					data: {
						Name: name,
						Phone: phone,
						Status: "Новая"
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
						type: "POST_CALLBACK",
						data: {
							Name: name,
							Phone: phone,
						}
					})
				})
				setName('');
				setPhone('');
				setWarning(false);
				setLoading(false);
				setSuccessMsg(true);
				setTimeout(() => {
					setSuccessMsg(false);
					closePopup();
				}, 3000);
			}
		} else {
			setWarning(true);
		}
	}
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

	const addName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}

	const togglePrivacy = (e: any) => {
		if (!e.target.classList.contains('privacyLink')) {
			setPrivacy(p => !p)
		}
	};


	const closePopup = () => {
		document.body.style.overflow = 'auto';
		setIsOpen(false);
	};

	const closePopupOnOverlay = (e: any) => {
		if (e.target.classList.contains('overlay')) {
			closePopup();
		}
	};

	const handleKeyDown = (e: KeyboardEventInit) => {
		if (isOpen) {
			if (e.key === "Escape") {
				closePopup();
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

	return (
		<> {
			isOpen
				? (
					<div onClick={closePopupOnOverlay} className={cn(cls.overlay, {[cls.active]: isOpen}, ['overlay'])}>
						<div className={cn(cls.successMsg, {[cls.active]: successMsg})}>Спасибо! <br/> В ближайшее время мы
							с вами свяжемся!<br/> <span>Это окно закроется через 3 секунды</span>
						</div>
						<div className={cn(cls.loader, {[cls.active]: loading})}>
							<FormLoader/><span>Отправка данных...</span></div>
						<div className={cls.popup}>
							<button onClick={closePopup} className={cls.close}>
								&#10006;
							</button>
							<form className={cls.form} onSubmit={(e) => postData(e, name, phone)}>
								<input
									ref={nameInputRef}
									className={cn(cls.name, {}, [cls.input])}
									type="text"
									placeholder="Ваше имя"
									name={"name"}
									value={name}
									onChange={(e) => addName(e)}
									required
								/>
								<input
									type="tel"
									className={cn(cls.phone, {}, [cls.input])}
									placeholder={"Номер телефона (Начиная с 7)"}
									onChange={(e) => addPhone(e)}
									name={"phone"}
									value={phone}
									required
								/>
								<button disabled={loading} className={cn(cls.button, {}, [cls.submit])}
										type={"submit"}>{loading ? "Загрузка..." : "Заказать звонок"}
								</button>
								<PrivacyCheckbox privacy={privacy} warning={warning} togglePrivacy={togglePrivacy}
												 className={cls.privacy}/>
							</form>
						</div>
					</div>
				) : (
					<></>
				)
		}

		</>

	)
}

