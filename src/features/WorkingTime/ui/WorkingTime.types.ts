export interface IWorkingTimeData {
	id: number,
	attributes: {
		Days: string,
		Hours: string
	}
}

export interface IWorkingTimeProps {
	withTitle?: boolean;
}