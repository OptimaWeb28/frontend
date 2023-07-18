export interface IAddressData {
	id: number,
	attributes: {
		City: string,
		Street: string
	},
}

export interface IAddressProps {
	withTitle?: boolean;
	ghost?: boolean
}