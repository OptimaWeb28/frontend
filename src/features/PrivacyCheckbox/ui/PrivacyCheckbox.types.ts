export interface PrivacyCheckboxProps {
	privacy: boolean;
	warning: boolean;
	togglePrivacy: (e: any) => void;
	className?: string;
}