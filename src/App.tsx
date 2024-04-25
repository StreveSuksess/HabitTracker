import { FC, useEffect } from 'react'
import { Statistics } from './pages/Statistics/Statistics.tsx'
import { Home } from './pages/Home/Home.tsx'
import { Navbar } from './components/Navbar/Navbar.tsx'
import { createRoutesFromElements, Outlet, Route } from 'react-router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Settings } from './pages/Settings/Settings.tsx'
import { Profile } from './pages/Profile/Profile.tsx'
import { useActions } from './hooks/useActions.ts'
import { HabitsLibrary } from './pages/HabitsLibrary/HabitsLibrary.tsx'
import { PlaneCharacter } from './pages/Profile/PlaneCharacter.tsx'
import { Shop } from './pages/Profile/Shop/Shop.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Achievements } from './pages/Profile/Achievements/Achievements.tsx'

const Root: FC = () => {
	return (
		<main className='container'>
			<Navbar />
			<Outlet />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</main>
	)
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/HabitTracker' element={<Root />}>
			<Route index element={<Home />} />
			<Route path='/HabitTracker/statistics' element={<Statistics />} />
			<Route path='/HabitTracker/settings' element={<Settings />} />
			<Route path='/HabitTracker/profile' element={<Profile />} />
			<Route path='/HabitTracker/profile/planecharacter' element={<PlaneCharacter />} />
			<Route path='/HabitTracker/profile/shop' element={<Shop />} />
			<Route path='/HabitTracker/profile/achievements' element={<Achievements />} />
			<Route path='/HabitTracker/habitslibrary' element={<HabitsLibrary />} />
		</Route>
	)
)

const App: FC = () => {
	const { setLastActiveDate } = useActions()
	useEffect(() => {
		setLastActiveDate()
	}, [])

	return (
		<RouterProvider router={router} />
	)
}

export default App
