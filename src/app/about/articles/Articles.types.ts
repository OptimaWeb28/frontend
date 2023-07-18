export interface IArticlesData {
	data: Article[];
	meta: Meta;
}

export interface Article {
	id: number;
	attributes: DatumAttributes;
}

interface DatumAttributes {
	Title: string;
	slug: string;
	Text: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Image: Image;
	Service: Service;
}

interface Image {
	data: ImageData;
}

interface ImageData {
	id: number;
	attributes: PurpleAttributes;
}

interface PurpleAttributes {
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
	previewUrl: null;
	provider: string;
	placeholder: string;
	provider_metadata: null;
	createdAt: Date;
	updatedAt: Date;
}

interface Formats {
	thumbnail: Large;
	medium: Large;
	small: Large;
	large: Large;
}

interface Large {
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

interface Service {
	data: ServiceData;
}

interface ServiceData {
	id: number;
	attributes: FluffyAttributes;
}

interface FluffyAttributes {
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Price: number;
	Medods_link: null | string;
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