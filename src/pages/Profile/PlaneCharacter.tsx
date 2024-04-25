import { Plane } from '../../3dModels/Plane.tsx'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import s from './Profile.module.scss'
import { OrbitControls } from '@react-three/drei'
import { useAppSelector } from '../../hooks/useAppSelector.ts'
import { Link } from 'react-router-dom'
import { ArrowSvg } from '../../assets/Svg/ArrowSvg.tsx'
import { Loader } from '../../components/Loader/Loader.tsx'

const adjustPlaneForScreenSize = () => {
	const screenScale: number[] = [3, 3, 3]
	const screenPosition: number[] = [0, -1, -2]

	return [screenScale, screenPosition]
}

export const PlaneCharacter = () => {
	const currentActiveScore = useAppSelector(state => state.habitsData.activity.currentActiveScore)
	const [planeScale, planePosition] = adjustPlaneForScreenSize()


	return (
		<section className={s.sceneSection}>
			<Link to='/HabitTracker/profile' className='back-link'><ArrowSvg /> <span>Назад к профилю</span></Link>
			{
				currentActiveScore === 1 ?
					<>
						<h3 className='orange-gradient-text'>Вы не заходили в приложение 1 или более дней и теперь ваш самолёт идёт
							на
							снижение!!!</h3>
						<h3 className='orange-gradient-text'>Если вы не придёте завтра - он вообще упадёт!!!</h3>
					</> :
					<>
						<h3 className='green-gradient-text'>Ты молодец, твой самолёт взлетает!!!</h3>
						<h3 className='green-gradient-text'> Если будешь продолжать в таком духе -
							он обязательно куда-нибудь прилетит!!!</h3>
					</>

			}
			<Canvas camera={{ near: 0.1, far: 1000 }}>
				<OrbitControls enablePan={false} />
				<Suspense fallback={<Loader />}>
					<directionalLight position={[1, 1, 1]} intensity={2} />
					<ambientLight intensity={0.7} />
					<pointLight position={[10, 5, 10]} intensity={2} />
					<spotLight
						position={[0, 50, 10]}
						angle={0.15}
						penumbra={1}
						intensity={2}
					/>
					<hemisphereLight
						groundColor='#000000'
						intensity={1}
					/>
					<Plane
						position={planePosition}
						rotation={currentActiveScore === 1 ? [1.6, 20.1, -1.5] : [7.8, 20.7, 5]}
						scale={planeScale}
					/>
				</Suspense>
			</Canvas>
		</section>
	)
}
