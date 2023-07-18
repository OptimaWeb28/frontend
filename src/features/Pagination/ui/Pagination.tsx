'use client';
import cls from './Pagination.module.scss';
import {useRouter, useSearchParams} from "next/navigation";
import {IPaginationProps} from "./Pagination.types";
import {cn} from "@/shared/lib";

export function Pagination(props: IPaginationProps) {
	const {pageCount = 1, route} = props;
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;
	const buttons: JSX.Element[] = [];
	const goToPage = (path: string, numPage: number) => {
		router.push(`/${path}/?page=${numPage}`);
	}
	if (pageCount > 1) {
		for (let i = 1; i <= pageCount; i++) {
			buttons.push(<button className={cn(cls.pageButton, {[cls.active]: currentPage === i})}
								 onClick={() => goToPage(route, i)}
								 key={i}>{i}</button>)
		}
	}
	return (
		<div className={cn(cls.Pagination)}>
			{buttons}
		</div>
	)
}