'use client';
import {IAddressData} from "@/features/Address";
import {IWorkingTimeData} from "@/features/WorkingTime/ui/WorkingTime.types";
import {IPhoneNumberData} from "@/features/PhoneNumber/ui/PhoneNumber.types";
import {cn} from "@/shared/lib";
import cls from "./NavMenuMobile.module.scss";
import {muller400, muller500} from "@/shared/fonts";
import {FormLoader} from "@/shared/ui";
import {PrivacyCheckbox} from "@/features/PrivacyCheckbox/ui/PrivacyCheckbox";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {GetDataPaths} from "@/shared/api";
import {useNavMenuMobile} from "@/shared/store/OptimaStore";
import {shallow} from "zustand/shallow";
import {Contacts} from "@/widgets/Contacts";
import {ISocialLink} from "@/widgets/Footer/ui/Footer.types";

export function NavMenuMobile(props: {
	addressData: IAddressData;
	workingTimeData: IWorkingTimeData;
	phoneNumberData: IPhoneNumberData;
	socialLinksData: ISocialLink;
}) {
	const {workingTimeData, phoneNumberData, addressData, socialLinksData} = props;

	const {
		closeAllDropdownsAndOverlay,
		closeCallbackDropdown,
		setIsOverlay,
		callbackDropdown,
		contactDropdown,
		setContactDropdown,
		setCallbackDropdown,
		closeContactDropdown,
		isOverlay
	} = useNavMenuMobile(p => p, shallow);


	const [name, setName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [privacy, setPrivacy] = useState<boolean>(true);
	const [warning, setWarning] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [successMsg, setSuccessMsg] = useState<boolean>(false);
	const postData = async (e: FormEvent, name: string, phone: string) => {
		e.preventDefault();
		if (privacy) {
			setLoading(true);
			const res = await fetch(`http://localhost:1337/api${GetDataPaths.CALLBACKS}`, {
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
					closeAllDropdownsAndOverlay();
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

	const toggleContactDropdown = () => {
		if (callbackDropdown === "opened") closeCallbackDropdown();
		if (contactDropdown === "opened") {
			setContactDropdown("closed");
			document.body.style.overflow = "auto";
			setIsOverlay(false);

		} else {
			setContactDropdown("opened");
			document.body.style.overflow = "hidden";
			setIsOverlay(true);
		}
	};
	const toggleCallbackDropdown = () => {
		if (contactDropdown === "opened") closeContactDropdown();
		if (callbackDropdown === "opened") {
			setCallbackDropdown("closed");
			document.body.style.overflow = "auto";
			setIsOverlay(false);

		} else {
			setCallbackDropdown("opened");
			document.body.style.overflow = "hidden";
			setIsOverlay(true);
		}
	};


	return (
		<>

			<div className={cn(cls.leftSideMob, {}, [muller500.className])}>
				<div onClick={toggleContactDropdown}
					 className={cn(cls.contacts, {[cls.active]: contactDropdown === "opened"})}
				>
					Контакты
					<span className={cn(cls.arrow, {}, ["icon-arrow-down"])}/>
				</div>
				<div onClick={toggleCallbackDropdown}
					 className={cn(cls.callback, {[cls.active]: callbackDropdown === "opened"})}>
					Обратный звонок
					<span className={cn(cls.arrow, {}, ["icon-arrow-down"])}/>
				</div>
				<div className={cn(cls.contactDrop, {[cls.active]: contactDropdown === "opened"})}>
					<address className={cn(cn(cls.address, {}, [muller400.className]))}>
						<div
							className={cn(cls.cityAndStreet, {}, [cls.item])}>
							<span className={muller500.className}>Адрес:</span>
							{addressData.attributes.City} <br/>
							{addressData.attributes.Street}
						</div>
						<div
							className={cn(cls.time, {}, [cls.item])}>
							<span className={muller500.className}>Часы работы:</span>
							{workingTimeData.attributes.Days} <br/>
							{workingTimeData.attributes.Hours}
						</div>
						<div className={cn(cls.phone, {}, [cls.item])}>
							<span className={muller500.className}>Телефон: </span>
							<a href={`tel:${phoneNumberData.attributes.NumberLink}`}>
								{phoneNumberData.attributes.Number}
							</a>
							<div className={cls.hint}>Нажмите на номер, чтобы позвонить</div>
						</div>
					</address>
					<div className={cn(cls.joinUs)}>
						<h5 className={cn(cls.joinUsTitle, {}, [muller400.className])}>Социальные сети:</h5>
						<div className={cn(cls.socialWrapper)}>
							<a target={'_blank'} href={socialLinksData.attributes.Vk}>
								<span className={cn('icon-vkontakte', {}, [cls.icon])}/>
							</a>
							<a target={'_blank'} href={socialLinksData.attributes.Ok}>
								<span className={cn('icon-odnoklassniki', {}, [cls.icon])}/>
							</a>
							<a target={'_blank'}
							   href={socialLinksData.attributes.WhatsApp}>
								<span className={cn('icon-whatsapp', {}, [cls.icon])}/>
							</a>
						</div>
					</div>
				</div>
				<div className={cn(cls.callbackDrop, {[cls.active]: callbackDropdown === "opened"})}>
					<div className={cn(cls.successMsg, {[cls.active]: successMsg})}>
						<div>
							Спасибо!
						</div>
						<div>

							В ближайшее время <br/>
							мы
							с вами свяжемся!
						</div>

						<span>Это окно закроется через 3 секунды</span>
					</div>
					<div className={cn(cls.loader, {[cls.active]: loading})}>
						<FormLoader/><span>Отправка данных...</span></div>
					<form className={cls.form} onSubmit={(e) => postData(e, name, phone)}>
						<input
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
						<PrivacyCheckbox privacy={privacy} warning={warning}
										 togglePrivacy={togglePrivacy}
										 className={cls.privacy}/>
					</form>
				</div>
			</div>
			{isOverlay &&
				<div onClick={(e) => closeAllDropdownsAndOverlay(e)} onTouchEnd={(e) => closeAllDropdownsAndOverlay(e)}
					 className={cn(cls.overlay, {[cls.active]: isOverlay}, ['nav-overlay'])}/>}
		</>
	)
}