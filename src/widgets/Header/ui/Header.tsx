import cls from './Header.module.scss';
import {cn} from '@/shared/lib';
import {Logo} from '@/entities/Logo';
import {Address} from '@/features/Address';
import {WorkingTime} from '@/features/WorkingTime';
import {PhoneNumber} from '@/features/PhoneNumber';
import {Button} from '@/entities/Button';
import {Suspense} from 'react';
import {Loader} from '@/shared/ui';

interface IHeaderProps {
	className?: string
}

export function Header(props: IHeaderProps): JSX.Element {
	const {className = ''} = props;
	return (
		<header className={cn(cls.Header, {}, ['container', className])}>
			{/* @ts-expect-error Async Server Component */}
			<Logo/>
			<address className={cn(cls.address)}>
				{/* @ts-expect-error Async Server Component */}
				<Address/>
				{/* @ts-expect-error Async Server Component */}
				<WorkingTime/>
				{/* @ts-expect-error Async Server Component */}
				<PhoneNumber/>
			</address>
			<Button text='Онлайн запись' iconFontClass='icon-calendar' click={"openRecord"}/>
		</header>
	)
}