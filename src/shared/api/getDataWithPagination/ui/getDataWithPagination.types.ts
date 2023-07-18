export interface IPaginationMeta {
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}

export interface IPaginationData<T> {
	data: T[];
	meta: IPaginationMeta;
}

export interface IPaginationParams {
	page?: number;
	pageSize: number | 'allData';
	sort?: string;
}
