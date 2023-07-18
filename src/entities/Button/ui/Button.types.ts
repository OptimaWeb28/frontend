export interface IButtonProps {
	text: string,
	className?: string,
	color?: 'primary' | 'secondary',
	size?: 'small' | '100%',
	iconFontClass?: string,
	click?: 'openChat' | 'openCallback' | 'openRecord' | string,
}