export interface IAboutContentProps {
	type: 'page' | 'widget'
}

export interface IAboutData {
	data: About;
	meta: Meta;
}

export interface About {
	id: number;
	attributes: PurpleAttributes;
}

interface PurpleAttributes {
	Title: string;
	Text: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Image: Image;
}

interface Image {
	data: ImageData;
}

interface ImageData {
	id: number;
	attributes: FluffyAttributes;
}

interface FluffyAttributes {
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
	provider_metadata: null;
	placeholder: string;
	createdAt: Date;
	updatedAt: Date;
}

interface Formats {
	thumbnail: Thumbnail;
}

interface Thumbnail {
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
}