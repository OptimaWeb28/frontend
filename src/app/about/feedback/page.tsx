import {Breadcrumbs} from "@/features/Breadcrumb";
import {PostComment} from "@/widgets/PostComment";
import {CommentsList} from "@/widgets/CommentsList";
import {Title} from "@/entities/Title";
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Отзывы о лечебно-диагностическом центре "Оптима"',
	description: 'Отзывы о лечебно-диагностическом центре "Оптима"',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги, отзывы'
}

export default function FeedbackPage() {
	return (
		<div className={'container'}>
			<Breadcrumbs/>
			<Title title={"Отзывы"}/>
			{/* @ts-expect-error Server Component */}
			<CommentsList/>
			<PostComment/>
		</div>
	)
}