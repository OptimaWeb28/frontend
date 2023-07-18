export interface INewsData {
	data: NewsType[];
	meta: Meta;
}

export interface NewsType {
	id: number;
	attributes: NewsAttributes;
}

interface NewsAttributes {
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Text: string;
	slug: string;
	Image: Image;
}

interface Image {
	data: Data;
}

interface Data {
	id: number;
	attributes: DataAttributes;
}

interface DataAttributes {
	name: string;
	alternativeText: null;
	caption: null;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	placeholder: string;
	previewUrl: null;
	provider: string;
	provider_metadata: null;
	createdAt: Date;
	updatedAt: Date;
}

interface Formats {
	thumbnail: Small;
	small: Small;
}

interface Small {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: null;
	width: number;
	height: number;
	size: number;
	url: string;
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