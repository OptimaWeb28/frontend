export interface IAccordionsProps {
	data: Record<string, IAccordionData[]>;
};

interface IAccordionData {
	Title: string;
	Price: number;
	Medods_id: number | null;
};