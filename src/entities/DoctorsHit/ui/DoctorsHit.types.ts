export interface IDoctorsHitProps {
	hit: Hit;
}

interface Hit {
	_meilisearch_id: string;
	id: number;
	FIO: string;
	Position: string;
	Raiting: number;
	Satisfaction: number;
	Education: string;
	Experience: number;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	slug: string;
	Description: string;
	Medods_id: number;
	Photo: HitPhoto;
	_highlightResult: TResult;
	_snippetResult: TResult;
	__position: number;
	objectID: string;
}

interface HitPhoto {
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
	thumbnail: PurpleLarge;
	small: PurpleLarge;
	large: PurpleLarge;
	medium: PurpleLarge;
}

interface PurpleLarge {
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
	_meilisearch_id: Description;
	id: Description;
	FIO: Description;
	Position: Description;
	Raiting: Description;
	Satisfaction: Description;
	Education: Description;
	Experience: Description;
	createdAt: Description;
	updatedAt: Description;
	publishedAt: Description;
	slug: Description;
	Description: Description;
	Medods_id: Description;
	Photo: HighlightResultPhoto;
}

interface Description {
	value: string;
}

interface HighlightResultPhoto {
	id: Description;
	name: Description;
	alternativeText: Description;
	caption: Description;
	width: Description;
	height: Description;
	formats: FluffyFormats;
	hash: Description;
	ext: Description;
	mime: Description;
	size: Description;
	url: Description;
	previewUrl: Description;
	provider: Description;
	provider_metadata: Description;
	folderPath: Description;
	createdAt: Description;
	updatedAt: Description;
}

interface FluffyFormats {
	thumbnail: FluffyLarge;
	small: FluffyLarge;
	large: FluffyLarge;
	medium: FluffyLarge;
}

interface FluffyLarge {
	name: Description;
	hash: Description;
	ext: Description;
	mime: Description;
	path: Description;
	width: Description;
	height: Description;
	size: Description;
	url: Description;
}