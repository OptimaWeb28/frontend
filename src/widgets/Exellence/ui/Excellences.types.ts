export interface IExcellencesData {
	data: Datum[];
	meta: Meta;
}

interface Datum {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Title: string;
	Subtitle: string;
	Description: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
}

interface Meta {
	pagination: Pagination;
}

interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}