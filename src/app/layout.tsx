import {muller400} from '@/shared/fonts'
import {Tagline} from '@/entities/Tagline'
import {Header} from '@/widgets/Header'
import favicon from '@/shared/images/favicon.ico';
import {Navbar} from '@/widgets/Navbar';
import {Footer} from '@/widgets/Footer';
import './globals.scss';
import Script from 'next/script';
import {MobileBottomMenu} from "@/widgets/MobileBottomMenu";
import {IAddressData} from "@/features/Address";
import {getData, GetDataPaths} from "@/shared/api";
import {IWorkingTimeData} from "@/features/WorkingTime/ui/WorkingTime.types";
import {IPhoneNumberData} from "@/features/PhoneNumber/ui/PhoneNumber.types";
import {ISocialLinksData} from "@/widgets/Footer/ui/Footer.types";

export const metadata = {
	title: 'Оптима - лечебно-диагностический центр г.Белогорска',
	description: 'Лечебно диагностический центр «Оптима» - самая крупная частная клиника в г. Белогорск, оказывающая широкий спектр медицинских услуг для жителей и гостей города. Просторные кабинеты и современное оборудование позволяют в течение короткого времени получить консультацию специалиста, пройти обследование и начать лечение.',
	keywords: 'Белогорск, Амурская область, лечебно-диагностический центр "Оптима", врачи, медицинские услуги',

}

export default async function RootLayout({children,}: { children: React.ReactNode }) {
	const addressResp: { data: IAddressData } = await getData(GetDataPaths.ADDRESS);
	const workingTimeResp: { data: IWorkingTimeData } = await getData(GetDataPaths.WORKING_TIME);
	const phoneNumberResp: { data: IPhoneNumberData } = await getData(GetDataPaths.PHONE_NUMBER);
	const socialLinksResp: ISocialLinksData = await getData(GetDataPaths.SOCIAL_LINKS);
	const {data: addressData} = addressResp;
	const {data: workingTimeData} = workingTimeResp;
	const {data: phoneNumberData} = phoneNumberResp;
	const {data: socialLinksData} = socialLinksResp;
	return (
		<html lang="ru">
		<head>
			<link rel="icon" href={favicon.src}/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>

		</head>
		<body className={`${muller400.className}`}>
		{/* @ts-expect-error Server Component */}
		<Tagline/>
		<MobileBottomMenu/>
		<Header/>
		<Navbar
			addressData={addressData} phoneNumberData={phoneNumberData}
			workingTimeData={workingTimeData}
			socialLinksData={socialLinksData}
		/>
		<main>
			{children}
		</main>
		{/* @ts-expect-error Server Component */}

		<Footer className={'footer-area'}/>

		<Script id={'poor-vision-widget'} src={'/bvi/js/bvi.min.js'}></Script>
		<Script id={'talkMeChat'}>{`    (function(){(function c(d,w,m,i) {
        window.supportAPIMethod = m;
        var s = d.createElement('script');
        s.id = 'supportScript'; 
        var id = '43b9e32635e32d82e9047edf3748d846';
        s.src = (!i ? 'https://lcab.talk-me.ru/support/support.js' : 'https://static.site-chat.me/support/support.int.js') + '?h=' + id;
        s.onerror = i ? undefined : function(){c(d,w,m,true)};
        w[m] = w[m] ? w[m] : function(){(w[m].q = w[m].q ? w[m].q : []).push(arguments);};
        (d.head ? d.head : d.body).appendChild(s);
    })(document,window,'TalkMe')})();`}</Script>
		</body>
		</html>
	)
}
