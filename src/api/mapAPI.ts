import { Path } from '../types/typings.t';
import { API } from './api';

const MapAPI = {
  storePath: async (newPathData: Path) => API.post('/users/paths', newPathData),
};

export default MapAPI;
