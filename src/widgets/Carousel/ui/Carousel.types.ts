export interface ICarouselImagesData {
	data: CarouselImage[];
	meta: Meta;
}

interface CarouselImage {
	id: number;
	attributes: CarouselImageAttribute;
}

interface CarouselImageAttribute {
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
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
	ext: EXT;
	mime: MIME;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: null;
	placeholder: string;
	createdAt: Date;
	updatedAt: Date;
}

enum EXT {
	JPEG = ".jpeg",
	Jpg = ".jpg",
}

interface Formats {
	thumbnail: Large;
	small: Large;
	large: Large;
	medium: Large;
}

interface Large {
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
	ImageJPEG = "image/jpeg",
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