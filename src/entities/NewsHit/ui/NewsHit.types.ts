export interface INewsHitProps {
	hit: Hit;
}

interface Hit {
	_meilisearch_id: string;
	id: number;
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Text: string;
	slug: string;
	Image: HitImage;
	_highlightResult: TResult;
	_snippetResult: TResult;
	__position: number;
	objectID: string;
}

interface HitImage {
	id: number;
	name: string;
	alternativeText: null;
	caption: null;
	width: number;
	height: number;
	formats: PurpleFormats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: null;
	placeholder: string;
	folderPath: string;
	createdAt: Date;
	updatedAt: Date;
}

interface PurpleFormats {
	thumbnail: PurpleSmall;
	medium: PurpleSmall;
	small: PurpleSmall;
}

interface PurpleSmall {
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

interface TResult {
	_meilisearch_id: Text;
	id: Text;
	Title: Text;
	createdAt: Text;
	updatedAt: Text;
	publishedAt: Text;
	Text: Text;
	slug: Text;
	Image: HighlightResultImage;
}

interface HighlightResultImage {
	id: Text;
	name: Text;
	alternativeText: Text;
	caption: Text;
	width: Text;
	height: Text;
	formats: FluffyFormats;
	hash: Text;
	ext: Text;
	mime: Text;
	size: Text;
	url: Text;
	previewUrl: Text;
	provider: Text;
	provider_metadata: Text;
	folderPath: Text;
	createdAt: Text;
	updatedAt: Text;
}

interface Text {
	value: string;
}

interface FluffyFormats {
	thumbnail: FluffySmall;
	small: FluffySmall;
}

interface FluffySmall {
	name: Text;
	hash: Text;
	ext: Text;
	mime: Text;
	path: Text;
	width: Text;
	height: Text;
	size: Text;
	url: Text;
}