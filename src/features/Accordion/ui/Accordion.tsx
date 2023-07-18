'use client'
import cls from './Accordion.module.scss';
import {useState} from "react";
import {IAccordionProps} from "@/features/Accordion/ui/Accordion.types";
import {muller700} from "@/shared/fonts";
import {cn} from "@/shared/lib";
import {useChat} from "@/shared/store";

export function Accordion(props: IAccordionProps) {
	const {title, data, isOpen: isOpenProps} = props;
	const [isOpen, setIsOpen] = useState(isOpenProps);
	const {loading, setLoading, openChat} = useChat();
	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={cls.accordion}>
			<div className={cls.header} onClick={toggleAccordion}>
				<h3 className={cls.title}>{title}</h3>
				<span className={`${cls.icon} ${isOpen ? cls.active : ""}`}></span>
			</div>
			<div className={`${cls.content} ${isOpen ? cls.active : ""}`}>
				{data.map((item, index) => (
					<div key={index} className={cls.service}>
						<div className={cn(cls.title, {}, [muller700.className])}>{item.Title}</div>
						<div className={cn(cls.price, {}, [muller700.className])}>{item.Price} руб.</div>
						{item.Medods_id
							? (<button onClick={() => mv('show', `/clinic/1/service/${item.Medods_id}`)}
									   className={cls.button}>Записаться</button>)
							: (<button
								onClick={openChat}
								className={cn(cls.button)}>{loading ? 'Загрузка...' : 'Записаться'}</button>)
						}
					</div>
				))}
			</div>
		</div>
	);
}