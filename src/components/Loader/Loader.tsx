import styles from './Loader.module.scss'
import { Html } from '@react-three/drei'

export const Loader = () => {
	return (
		<Html>
			<div className={styles.loading}>
				<span className={styles.loader}></span>
			</div>
		</Html>
	)
}