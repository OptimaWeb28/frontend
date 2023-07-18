export interface IHeadExcellenceData {
	data: Data;
	meta: Meta;
}

interface Data {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Text: string;
	Digit: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
}

interface Meta {
}