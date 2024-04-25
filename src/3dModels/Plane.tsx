import { FC, useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

type Props = {
	position: number[],
	scale: number[],
	rotation: number[],
}

export const Plane: FC<Props> = (props) => {
	const planeRef = useRef()
	const { scene, animations } = useGLTF('/HabitTracker/plane.glb')
	const { actions } = useAnimations(animations, planeRef)
	useEffect(() => {
		// @ts-ignore
		actions['Take 001'].play()
	}, [actions])
	return (
		// @ts-ignore
		<mesh scale={props.scale} rotation={props.rotation} position={props.position} ref={planeRef}>
			<primitive object={scene} />
		</mesh>
	)
}
