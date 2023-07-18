import {Loader} from '@/shared/ui';

export default function Loading() {
	return (
		<div style={{
			display: 'flex',
			'justifyContent': 'center',
			'alignItems': 'center',
			'height': '100%',
			'width': '100%'
		}}>
			<Loader/>
		</div>
	)
}