import { _post } from "./commonApi";
import { API_ENDPOINT } from './ApiConstants';

export const get5Rows = async (uniqueCode, colNamesIncluded) => {
    const resp = await _post(`${API_ENDPOINT}/api/get5Rows`, {}, {
        'Content-Type': 'application/json',
        'Unique-Identity': uniqueCode,
        'Col-Names-Included': colNamesIncluded,
    },
    );
    return resp.data;
}