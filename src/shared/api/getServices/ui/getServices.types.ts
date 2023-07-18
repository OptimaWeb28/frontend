export interface IServicesData {
	data: Service[];
	meta: Meta;
}

export interface Service {
	id: number;
	attributes: ServiceAttributes;
}

interface ServiceAttributes {
	Title: string;
	Price: number;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Medods_id: number | null;
	Category: Category | null;
	Sub_Category: SubCategory | null;
}

interface Category {
	data: CategoryData;
}

interface CategoryData {
	id: number;
	attributes: PurpleAttributes;
}

interface PurpleAttributes {
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	Subtitle: string;
	Start_price: number;
	slug: string;
	Description: string;
}

interface SubCategory {
	data: SubCategoryData;
}

interface SubCategoryData {
	id: number;
	attributes: FluffyAttributes;
}

interface FluffyAttributes {
	Title: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
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