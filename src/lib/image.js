
import { basePath } from '../../next.config'
const BASE_PATH = basePath ? basePath : ''

export const imagePath = (path) => {
	return `${BASE_PATH}/${path}`;
}
