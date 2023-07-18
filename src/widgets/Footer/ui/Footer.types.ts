export interface ISocialLinksData {
	data: ISocialLink;
	meta: Meta;
}

export interface ISocialLink {
	id: number;
	attributes: Attributes;
}

interface Attributes {
	Vk: string;
	Ok: string;
	WhatsApp: string;
	createdAt: Date;
	updatedAt: Date;
}

interface Meta {
}