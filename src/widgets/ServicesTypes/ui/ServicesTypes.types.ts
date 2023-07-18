export interface IServicesTypesData {
	data: IServicesType[];
	meta: Meta;
}

interface IServicesType {
	id: number;
	attributes: PurpleAttributes;
}

interface PurpleAttributes {
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Subtitle: string;
	Start_price: number;
	slug: string;
	Services: Services;
	Image: Image;
	Description: string;
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
	formats: Formats | null;
	hash: string;
	ext: EXT;
	mime: MIME;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: null;
	createdAt: Date;
	updatedAt: Date;
}

enum EXT {
	PNG = ".png",
}

interface Formats {
	thumbnail: Small;
	small: Small;
}

interface Small {
	name: string;
	hash: string;
	ext: EXT;
	mime: MIME;
	path: null;
	width: number;
	height: number;
	size: number;
	url: string;
}

enum MIME {
	ImagePNG = "image/png",
}

interface Services {
	data: ServicesDatum[];
}

interface ServicesDatum {
	id: number;
	attributes: FluffyAttributes;
}

interface FluffyAttributes {
	Title: string;
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