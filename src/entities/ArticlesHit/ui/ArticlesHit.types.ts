export interface IArticlesHitProps {
	hit: Hit;
}

interface Hit {
	_meilisearch_id: string;
	id: number;
	Title: string;
	slug: string;
	Text: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Image: HitImage;
	Service: HitService;
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
	placeholder: string;
	provider_metadata: null;
	folderPath: string;
	createdAt: Date;
	updatedAt: Date;
}

interface PurpleFormats {
	thumbnail: PurpleLarge;
	large: PurpleLarge;
	small: PurpleLarge;
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

interface HitService {
	id: number;
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Price: number;
	Medods_link: string | null;
}

interface TResult {
	_meilisearch_id: Text;
	id: Text;
	Title: Text;
	slug: Text;
	Text: Text;
	createdAt: Text;
	updatedAt: Text;
	publishedAt: Text;
	Image: HighlightResultImage;
	Service: HighlightResultService;
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
	thumbnail: FluffyLarge;
	large: FluffyLarge;
	small: FluffyLarge;
	medium: FluffyLarge;
}

interface FluffyLarge {
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

interface HighlightResultService {
	id: Text;
	Title: Text;
	createdAt: Text;
	updatedAt: Text;
	publishedAt: Text;
	Price: Text;
	Medods_link: Text;
}