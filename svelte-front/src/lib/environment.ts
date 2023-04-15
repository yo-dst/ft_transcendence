export const environment = {
	apiHost: import.meta.env.VITE_HOST,
	apiPort: import.meta.env.VITE_NESTJS_PORT,
	intraLoginUrl: import.meta.env.VITE_INTRA_LOGIN_URL
}

export const apiUrl = `http://${environment.apiHost}:${environment.apiPort}`;