'use client';
import {cn} from '@/shared/lib';
import cls from './Navbar.module.scss';
import React from "react";
import {IAddressData} from "@/features/Address";
import {IWorkingTimeData} from "@/features/WorkingTime/ui/WorkingTime.types";
import {IPhoneNumberData} from "@/features/PhoneNumber/ui/PhoneNumber.types";
import {NavMenuDesktop} from "@/features/NavMenuDesktop";
import {NavMenuMobile} from "@/features/NavMenuMobile";
import {NavActions} from "@/features/NavActions";
import {RecordPopup} from "@/entities/RecordPopup";
import {ISocialLink, ISocialLinksData} from "@/widgets/Footer/ui/Footer.types";

interface INavbarProps {
	addressData: IAddressData;
	workingTimeData: IWorkingTimeData;
	phoneNumberData: IPhoneNumberData;
	socialLinksData: ISocialLink;
	className?: string;
}

export function Navbar(props: INavbarProps) {
	const {addressData, phoneNumberData, workingTimeData, className = '', socialLinksData} = props;


	return (
		<div className={cn(cls.Navbar, {}, [className])}>
			<div className={cn(cls.content, {}, ['container'])}>
				<NavMenuDesktop phoneNumberData={phoneNumberData}/>
				<NavMenuMobile
					socialLinksData={socialLinksData}
					addressData={addressData} workingTimeData={workingTimeData}
					phoneNumberData={phoneNumberData}/>
				<NavActions/>
				<RecordPopup/>
			</div>
		</div>
	)
}