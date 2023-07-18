export interface IAccordionProps {
	title: string;
	isOpen: boolean;
	data: AccordionData[];
};

interface AccordionData {
	Title: string;
	Price: number;
	Medods_id: number | null;
};
