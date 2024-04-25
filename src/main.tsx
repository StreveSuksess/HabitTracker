import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/scss/index.scss'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

function requestPermission() {
	return new Promise(function(resolve, reject) {
		const permissionResult = Notification.requestPermission(function(result) {
			resolve(result)
		})

		if (permissionResult) {
			permissionResult.then(resolve, reject)
		}
	})
		.then(function(permissionResult) {
			if (permissionResult !== 'granted') {
				throw new Error('Permission not granted.')
			}
		})
}

requestPermission().then(res =>
	console.log(res)
)


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
