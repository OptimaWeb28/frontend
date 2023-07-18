import {ICommentsListData} from "./CommentsList.types";
import {getData, GetDataPaths} from "@/shared/api";
import cls from './CommentsList.module.scss';
import {cn} from "@/shared/lib";
import {muller700, muller400} from '@/shared/fonts';

export async function CommentsList() {
	const res: ICommentsListData = await getData(GetDataPaths.REVIEWS, 'sort[0]=id:asc&pagination[page]=1&pagination[pageSize]=100&filters[Status][$eq]=Опубликован');
	const {data} = res;
	data.sort((a, b) => {
		const dateA = a.attributes.Date.split('.').reverse().join('-');
		const dateB = b.attributes.Date.split('.').reverse().join('-');
		return dateA.localeCompare(dateB);
	});
	return <section className={cls.CommentsList}>
		{data.map((review, index) => {
			return <div key={review.id} className={cls.review}>
				<div className={cls.leftSide}>
					<h3 className={cn(cls.name, {}, [muller700.className])}>{review.attributes.Name}</h3>
					<div className={cn(cls.date, {}, [muller400.className])}>{review.attributes.Date}</div>
					<div className={cn(cls.raiting,
						{
							[cls.like]: review.attributes.Raiting === "Like",
							[cls.dislike]: review.attributes.Raiting === 'Dislike'
						})}/>
				</div>
				<div className={cn(cls.rightSide, {}, [muller400.className])}>{review.attributes.Text}</div>
			</div>
		})}
	</section>
}