import {IRichTextProps} from "@/entities/RichText/ui/RichText.types";
import cls from "@/app/doctors/[slug]/DoctorsPage.module.scss";
import {useEffect, useState} from "react";
import {cn} from "@/shared/lib";

export function RichText(props: IRichTextProps) {
	const {text, className, style} = props;
	if (text) {
		let newText = text?.replace(/\/uploads\//g, `${process.env.HOST_CMS}/uploads/`);
		newText = newText?.replace(/font-family:Muller;/gm, '');
		return (
			<div style={style} dangerouslySetInnerHTML={{__html: newText}} className={cn(className, {}, ['ck-content'])}/>
		)
	}
	return <></>
}