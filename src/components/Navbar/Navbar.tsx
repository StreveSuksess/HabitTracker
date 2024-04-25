import { FC } from 'react'
import s from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'
import { HomeSvg } from '../../assets/Svg/HomeSvg.tsx'
import { ActivitySvg } from '../../assets/Svg/ActivitySvg.tsx'
import { SettingsSvg } from '../../assets/Svg/SettingsSvg.tsx'
import { ProfileSvg } from '../../assets/Svg/ProfileSvg.tsx'
import { LibrarySvg } from '../../assets/Svg/LibrarySvg.tsx'

export const Navbar: FC = () => {
	return (
		<nav className={s.navBar}>
			<ul className={s.links}>
				<li>
					<NavLink className={({ isActive }) =>
						isActive ? `${s.active} ${s.link}` : s.link
					} to={'/HabitTracker/'}><HomeSvg /></NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) =>
						isActive ? `${s.active} ${s.link} ${s.libraryLink}` : `${s.libraryLink} ${s.link}`
					} to={'/HabitTracker/habitslibrary'}><LibrarySvg /></NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) =>
						isActive ? `${s.active} ${s.link}` : s.link
					} to={'/HabitTracker/statistics'}><ActivitySvg /></NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) =>
						isActive ? `${s.active} ${s.link}` : s.link
					} to={'/HabitTracker/settings'}><SettingsSvg /></NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) =>
						isActive ? `${s.active} ${s.link}` : s.link
					} to={'/HabitTracker/profile'}><ProfileSvg /></NavLink>
				</li>
			</ul>
		</nav>
	)
}
