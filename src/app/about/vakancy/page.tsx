import {Breadcrumbs} from "@/features/Breadcrumb";
import {Title} from "@/entities/Title";
import cls from './vakancy.module.scss';
import {Contacts} from "@/widgets/Contacts";
import {muller400} from "@/shared/fonts"
import {cn} from "@/shared/lib";
import {PostResume} from "@/widgets/PostResume";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Вакансии в лечебно-диагностическом центре "Оптима"',
	description: 'Вакансии лечебно-диагностического центра "Оптима"',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги, вакансии'
}

export default function VakancyPage() {
	return (<>

			<div className={'container'}>
				<Breadcrumbs/>
				<Title title={"Вакансии"}/>
				<Title
					title={"Лечебно-диагностический центр - это команда профессионалов, в котором каждый специалист является важным звеном."}
					titleType={"h3"} className={cls.subtitle}/>
				<p className={cn(cls.text, {}, [muller400.className])}>Мы рады новым высококвалифицированным
					специалистам. Вы можете отправить резюме на почту
					<a href="mailto:manager@optimaldc.ru"> manager@optimaldc.ru </a>
					или позвонить по телефону: <a href={'tel:89145797799'}>+7 (914) 579 77 99</a> <br/><br/>

					А можно просто заполнить форму ниже:)</p>
				<PostResume/>
			</div>
			<Contacts titleType={"h2"} title={""}/>
		</>
	)
}