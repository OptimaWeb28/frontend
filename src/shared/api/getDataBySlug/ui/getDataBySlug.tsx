import {GetDataPaths} from "@/shared/api";

export async function getDataBySlug<T>(path: GetDataPaths, slug: string): Promise<T> {
	const res = await fetch(`${process.env.HOST_CMS}/api${path}?filters[slug][$eq]=${slug}&populate=*`, {
		next: {revalidate: 10},
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.API_TOKEN}`
		}
	});
	const data: T = await res.json();
	return data;
}