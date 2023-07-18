export interface ICommentsListData {
	data: Datum[];
	meta: Meta;
}

interface Datum {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Name: string;
	Text: string;
	createdAt: Date;
	updatedAt: Date;
	Status: string;
	Raiting: string;
	Date: string;
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