import Enum from '../common/enum';
import Axios from './axios.ext';

const foodApi = {
    method: Enum.ApiMethod.GET,
    param: {},
    path: '/Foods',
    data: {},
    request(subPath) {
        let urlPath = this.path;
        if (subPath && subPath.length > 0) {
            urlPath = `${this.path}/${subPath}`;
        }
        return Axios.request(urlPath, this.param, this.method, this.data);
    },
};

export default foodApi;