import {GetDataPaths} from "@/shared/api";

export interface INewsProps {
	page: number;
	pageSize: number;
	path: GetDataPaths
	routeWithoutSlash: string;
	sort?: string;
	withPrice?: boolean;
}