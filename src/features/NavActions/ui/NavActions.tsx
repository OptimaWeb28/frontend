import {cn} from "@/shared/lib";
import cls from "./NavActions.module.scss";
import {Search} from "@/features/Search";
import {PoorVision} from "@/features/PoorVision";
import React from "react";
import {useNavMenuMobile} from "@/shared/store/OptimaStore";

export function NavActions() {
	const closeAllDropdownsAndOverlay = useNavMenuMobile(s => s.closeAllDropdownsAndOverlay);
	return <div onClick={closeAllDropdownsAndOverlay} className={cn(cls.rightSide)}>
		<Search className={cls.search}/>
		<PoorVision className={cls.loupe}/>
	</div>;
}