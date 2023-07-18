import {IAccordionsProps} from "./Accordions.types";
import {Accordion} from "@/features/Accordion";
import {Title} from "@/entities/Title";

export function Accordions(props: IAccordionsProps) {
	const {data} = props;
	return (
		<>
			{!!Object.entries(data).length && <Title title={"Цены:"} titleType={"h2"}/>}
			{Object.entries(data).map(([title, accordionData], index) => (
				<Accordion key={title} isOpen={index === 0} title={title} data={accordionData}/>
			))}
		</>
	);
}