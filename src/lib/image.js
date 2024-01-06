
import { basePath } from '../../next.config'
const BASE_PATH = basePath ? basePath : ''

const imagePath = (path) => {
	return `${BASE_PATH}/${path}`;
}

export default imagePath;
