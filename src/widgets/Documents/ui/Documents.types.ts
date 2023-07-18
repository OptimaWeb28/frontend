export interface IDocumentsData {
	data: IDocument[];
	meta: Meta;
}

export interface IDocument {
	id: number;
	attributes: DocumentAttributes;
}

interface DocumentAttributes {
	Name: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Document: Document;
}

interface Document {
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
	width: null;
	height: null;
	formats: null;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: null;
	createdAt: Date;
	updatedAt: Date;
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