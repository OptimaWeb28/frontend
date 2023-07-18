export interface IDevicesProps {
	page?: number;
}

interface IGetDevicesParams {
	page: number,
	pageSize: number | 'allData'
}

export interface IDevicesData {
	data: Device[];
	meta: Meta;
}

export interface Device {
	id: number;
	attributes: DeviceAttributes;
}

interface DeviceAttributes {
	Title: string;
	Text: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
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
