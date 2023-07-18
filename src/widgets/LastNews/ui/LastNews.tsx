import cls from './LastNews.module.scss';
import {getData, GetDataPaths} from "@/shared/api";
import {ILastNewsData} from "./LastNews.types";
import {Title} from "@/entities/Title";
import Image from 'next/image';
import {RichText} from "@/entities/RichText";
import {muller700, muller400, muller500} from '@/shared/fonts';
import {cn} from "@/shared/lib";
import Link from "next/link";

export async function LastNews() {
	const res: ILastNewsData = await getData(GetDataPaths.NEWS, 'sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=2');
	const {data} = res;
	return (<section className={cls.lastNews}>
		<Title className={cn(cls.title, {}, [muller700.className])} title={"Последние новости"} titleType={"h2"}/>
		<Title className={cls.subtitle} title={"Делимся новостями из центра и полезными статьями о здоровье"}
			   titleType={"h3"}/>
		<div className={cls.newsWrapper}>
			{data.map((oneNews, index) => {
				return (
					<div key={index} className={cls.news}>
						<Link className={cls.link} href={`/about/news/${oneNews.attributes.slug}`}/>
						<div className={cls.imageWrapper}>
							<Image className={cls.image}
								   src={`${process.env.HOST_CMS}${oneNews.attributes.Image.data.attributes.url}`}
								   alt={`Новость №${index}`} fill={true}
								   placeholder={'blur'}
								   blurDataURL={oneNews.attributes.Image.data.attributes.placeholder}
								   sizes={'(max-width: 1440px) 25vw, 10vw'}
							/>
						</div>
						<div className={cls.textWrapper}>
							<div className={cls.content}>
								<div className={cls.contentText}>
									<h4 className={cn(cls.textTitle, {}, [muller700.className])}>{oneNews.attributes.Title}</h4>
									<RichText text={oneNews.attributes.Text}
											  className={cn(cls.text, {}, [muller400.className])}/>
								</div>
							</div>
							<div className={cn(cls.readMore, {}, [muller500.className])}>Читать подробнее</div>
						</div>
					</div>

				)
			})}
		</div>
		<Link href={"/about/news/"}>
			<button className={cn(cls.allNews, {}, [muller400.className])}>Смотреть все новости</button>
		</Link>
	</section>)
}