import config from '../config.js' 
import getApi from './getRequestApi.js';


const getAbilities = async () => {
    const abilitiesUrl = config.endpoints.baseEndpoint + 'ability?limit=10000'
    const abilitiesJson = await getApi(abilitiesUrl);
    const abilities = abilitiesJson.results
        .map((x) => x.name.toUpperCase())
        .sort();
    return abilities
};

export default getAbilities;