export interface IDoctorsProps {
	page?: number
}

export interface IGetDoctorsParams {
	page: number,
	pageSize: number | 'allData'
}

export interface IDoctorsData {
	data: Doctor[];
	meta: Meta;
}

export interface Doctor {
	id: number;
	attributes: DoctorAttributes;
}

interface DoctorAttributes {
	FIO: string;
	slug: string;
	Position: string;
	Raiting: number;
	Satisfaction: number;
	Education: string;
	Experience: number;
	Description: string;
	Medods_link: string | null;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Photo: Photo;
}

interface Photo {
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
	previewUrl: null;
	provider: string;
	placeholder: string;
	provider_metadata: null;
	createdAt: Date;
	updatedAt: Date;
}

interface Formats {
	thumbnail: Format;
	medium: Format;
	small: Format;
	large: Format;
}

interface Format {
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
