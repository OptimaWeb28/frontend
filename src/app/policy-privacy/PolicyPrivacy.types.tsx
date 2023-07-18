export interface IPolicyPrivacyData {
	data: Data;
	meta: Meta;
}

interface Data {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Text: string;
	createdAt: Date;
	updatedAt: Date;
}

interface Meta {
}