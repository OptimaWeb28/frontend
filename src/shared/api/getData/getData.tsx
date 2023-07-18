import {GetDataPaths} from '..';

export async function getData(path: GetDataPaths, query: string = '') {
	const res = await fetch(process.env.HOST_CMS + '/api' + path + '?' + query + '&populate=*', {
		next: {revalidate: 10},
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.API_TOKEN}`
		}
	})
	// if (!res.ok) return undefined;
	const data = await res.json();
	return data;

}