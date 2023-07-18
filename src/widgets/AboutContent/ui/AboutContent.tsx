import {IAboutContentProps, IAboutData} from "./AboutContent.types";
import {getData, GetDataPaths} from "@/shared/api";
import {Title} from "@/entities/Title";
import cls from "./AboutContent.module.scss";
import {RichText} from "@/entities/RichText";
import {cn} from "@/shared/lib";
import {muller400} from "@/shared/fonts";
import Image from "next/image";
import {Button} from "@/entities/Button";
import Link from "next/link";

export async function AboutContent(props: IAboutContentProps) {
	const {type} = props;

	const resp: IAboutData = await getData(GetDataPaths.ABOUT);
	const {data} = resp;
	return (<>
			{type === "page" &&
				(<>
					<Title title={data.attributes.Title}/>
					<div className={cls.content}>
						<div className={cls.textWrapper}>
							<RichText text={data.attributes.Text} className={cn(cls.text, {}, [muller400.className])}/>
						</div>
						<div className={cls.imageWrapper}>
							<Image
								className={cls.image}
								fill={true} alt={data.attributes.Title}
								title={data.attributes.Title}
								src={`${process.env.HOST_CMS}${data.attributes.Image.data.attributes.url}`}
								placeholder={'blur'}
								blurDataURL={data.attributes.Image.data.attributes.placeholder}
								sizes={'(max-width: 1440px) 50vw, 25vw'}

							/>
						</div>
					</div>
				</>)}
			{type === "widget" &&
				(<>
					<div className={cls.widgetContent}>
						<div className={cls.info}>

							<Title titleType={"h2"} className={cls.title} title={'Несколько слов о нашем центре'}/>
							<div className={cn(cls.textWrapper)}>
								<RichText text={data.attributes.Text}
										  className={cn(cls.text, {}, [muller400.className])}/>
							</div>
							<Link className={cls.link} href={'/about'}>

								<button className={cls.button}>Читать далее</button>
							</Link>
						</div>
						<div className={cls.imageWrapper}>
							<Image fill={true} alt={data.attributes.Title}
								   src={`${process.env.HOST_CMS}${data.attributes.Image.data.attributes.url}`}
								   placeholder={'blur'}
								   blurDataURL={data.attributes.Image.data.attributes.placeholder}
								   sizes={'(max-width: 1440px) 50vw, 25vw'}

							/>
						</div>
					</div>
				</>)}
		</>
	)
}