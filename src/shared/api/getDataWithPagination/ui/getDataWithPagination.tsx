import {GetDataPaths} from "@/shared/api";
import {IPaginationParams, IPaginationData, IPaginationMeta} from "./getDataWithPagination.types";


export async function getDataWithPagination<T>(
	path: GetDataPaths,
	params: IPaginationParams
): Promise<IPaginationData<T>> {
	const {page = 1, pageSize, sort = ''} = params;
	const fetchData = async (page: number, pageSize: number) => {
		const res = await fetch(
			`${process.env.HOST_CMS}/api${path}?${sort}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
			{
				next: {revalidate: 10},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.API_TOKEN}`,
				},
			}
		);
		const allData: IPaginationData<T> = await res.json();
		return allData;
	};
	if (pageSize !== 'allData') {
		return fetchData(page, pageSize);
	} else {
		const fetchRes = await fetchData(page, 5);
		const pageCount = fetchRes.meta.pagination.pageCount;
		if (page < pageCount) {
			const fetchNextRes: IPaginationData<T> = await getDataWithPagination<T>(
				path,
				{page: page + 1, pageSize: 'allData'}
			);
			return {
				data: [...fetchRes.data, ...fetchNextRes.data],
				meta: fetchRes.meta,
			};
		} else {
			return {data: [...fetchRes.data], meta: fetchRes.meta};
		}
	}
}