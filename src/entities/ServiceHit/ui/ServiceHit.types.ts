export interface IServiceHitProps {
	hit: Hit;
}

interface Hit {
	_meilisearch_id: string;
	id: number;
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Medods_id: number;
	Price: number;
	Category: HitCategory;
	Sub_Category: HitSubCategory;
	Articles: any[];
	_highlightResult: TResult;
	_snippetResult: TResult;
	__position: number;
	objectID: string;
}

interface HitCategory {
	id: number;
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Subtitle: string;
	Start_price: number;
	slug: string;
	Description: string;
}

interface HitSubCategory {
	id: number;
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
}

interface TResult {
	_meilisearch_id: MedodsID;
	id: MedodsID;
	Title: MedodsID;
	createdAt: MedodsID;
	updatedAt: MedodsID;
	publishedAt: MedodsID;
	Medods_id: MedodsID;
	Price: MedodsID;
	Category: HighlightResultCategory;
	Sub_Category: HighlightResultSubCategory;
	Articles: any[];
}

interface HighlightResultCategory {
	id: MedodsID;
	Title: MedodsID;
	createdAt: MedodsID;
	updatedAt: MedodsID;
	publishedAt: MedodsID;
	Subtitle: MedodsID;
	Start_price: MedodsID;
	slug: MedodsID;
	Description: MedodsID;
}

interface MedodsID {
	value: string;
}

interface HighlightResultSubCategory {
	id: MedodsID;
	Title: MedodsID;
	createdAt: MedodsID;
	updatedAt: MedodsID;
	publishedAt: MedodsID;
}