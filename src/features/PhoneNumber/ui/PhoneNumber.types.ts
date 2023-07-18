export interface IPhoneNumberData {
	id: number,
	attributes: {
		Number: string,
		NumberLink: string
	}
}

export interface IPhoneNumberProps {
	withTitle?: boolean;
	ghost?: boolean;
}