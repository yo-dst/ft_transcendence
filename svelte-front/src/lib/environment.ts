export const environment = {
	apiHost: import.meta.env.VITE_HOST,
	apiPort: import.meta.env.VITE_NESTJS_PORT
}

export const apiUrl = `http://${environment.apiHost}:${environment.apiPort}`;