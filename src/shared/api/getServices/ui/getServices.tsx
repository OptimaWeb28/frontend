import {IServicesData} from "./getServices.types";

export async function getServices(slug: string) {
	const fetchData = async (page: number): Promise<IServicesData> => {
		const res = await fetch(
			`${process.env.HOST_CMS}/api/services?filters[Category][slug][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=100&populate=*`,
			{
				next: {revalidate: 10},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.API_TOKEN}`,
				},
			}
		);
		const allData: IServicesData = await res.json();
		const {data, meta} = allData;
		if (meta.pagination.pageCount > page) {
			return {data: [...data, ...((await fetchData(page + 1)).data)], meta}
		}
		return allData;
	};
	const res = await fetchData(1);

	return res;
}