import {Contacts} from "@/widgets/Contacts";
import {Excellence} from "@/widgets/Exellence/ui/Excellence";
import {Carousel, ICarouselImagesData} from "@/widgets/Carousel";
import {getData, GetDataPaths} from "@/shared/api";
import {ISliderImagesData, ISliderProp, Slider} from "@/widgets/Slider";
import {AboutContent} from "@/widgets/AboutContent";
import {LastNews} from "@/widgets/LastNews";
import {Suspense} from "react";
import {Loader} from "@/shared/ui";
import Loading from "@/app/loading";
import {CallBackBtn} from "@/features/CallBackBtn";
import {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Оптима - лечебно-диагностический центр г. Белогорск Амурская область',
	description: 'Лечебно диагностический центр «Оптима» - самая крупная частная клиника в г. Белогорск, оказывающая широкий спектр медицинских услуг для жителей и гостей города. Просторные кабинеты и современное оборудование позволяют в течение короткого времени получить консультацию специалиста, пройти обследование и начать лечение.',
	keywords: 'Медицинский центр, узи диагностика, гастроскопия, фиброгастроскопия, анализы, процедурный кабинет, процедуры, диагностика, анализы'
}

export default async function HomePage() {

	const carouselImagesRes: ICarouselImagesData = await getData(GetDataPaths.CAROUSEL_IMAGES, 'pagination[pageSize]=100');
	const {data: carouselImagesData} = carouselImagesRes;
	const smallImagesForCarousel: { path: string, placeholder: string }[] = [];
	const largeImagesForCarousel: string[] = [];
	carouselImagesData.forEach((image) => {
		switch (true) {
			case !!image.attributes.Image.data.attributes?.formats?.small?.url:
				smallImagesForCarousel.push({
					path: `${process.env.HOST_CMS}${image.attributes.Image.data.attributes.formats.small.url}`,
					placeholder: image.attributes.Image.data.attributes.placeholder
				});
				break;
			case !!image.attributes.Image.data.attributes?.formats?.medium?.url:
				smallImagesForCarousel.push({
					path: `${process.env.HOST_CMS}${image.attributes.Image.data.attributes.formats.medium.url}`,
					placeholder: image.attributes.Image.data.attributes.placeholder
				});
				break;
			default:
				smallImagesForCarousel.push({
					path: `${process.env.HOST_CMS}${image.attributes.Image.data.attributes.url}`,
					placeholder: image.attributes.Image.data.attributes.placeholder
				});
		}
		largeImagesForCarousel.push(`${process.env.HOST_CMS}${image.attributes.Image.data.attributes.url}`);
	});

	const sliderImagesRes: ISliderImagesData = await getData(GetDataPaths.SLIDER_IMAGES, 'pagination[pageSize]=100');
	const {data: sliderImagesData} = sliderImagesRes;
	const imagesForSlider: ISliderProp[] = [];
	sliderImagesData.map((image) => {
		imagesForSlider.push({
			image: `${process.env.HOST_CMS}${image.attributes.Image.data.attributes.url}`,
			path: image.attributes.Path,
			placeholder: image.attributes.Image.data.attributes.placeholder
		});
	});
	return (
		<>
			<section className='container'>
				<CallBackBtn/>
				<Slider images={imagesForSlider}/>
				{/* @ts-expect-error Server Component */}
				<Excellence/>

				{/* @ts-expect-error Server Component */}
				<AboutContent type={"widget"}/>
			</section>
			<Suspense fallback={<Loader/>}>
				<Carousel smallImages={smallImagesForCarousel} largeImages={largeImagesForCarousel}/>
			</Suspense>
			<div className={'container'}>
				<Suspense fallback={<Loading/>}>
					{/* @ts-expect-error Server Component */}
					<LastNews/>
				</Suspense>
			</div>
			<Contacts titleType="h2" title='Ждем вас по адресу'/>
		</>
	)
}