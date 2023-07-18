export interface ISliderProps {
	images: ISliderProp[];
};

export interface ISliderProp {
	image: string,
	path: string,
	placeholder: string;
}

export interface ISliderImagesData {
	data: SliderImage[];
	meta: Meta;
}

interface SliderImage {
	id: number;
	attributes: SliderImageAttributes;
}

interface SliderImageAttributes {
	Path: string;
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
	placeholder: string;
	previewUrl: null;
	provider: string;
	provider_metadata: null;
	createdAt: Date;
	updatedAt: Date;
}

enum EXT {
	Jpg = ".jpg",
}

interface Formats {
	thumbnail: Large;
	large: Large;
	medium: Large;
	small: Large;
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