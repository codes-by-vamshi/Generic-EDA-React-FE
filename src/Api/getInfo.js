import { API_ENDPOINT } from "./ApiConstants";
import { _post } from "./commonApi";
export const getInfo = async (uniqueCode, colNamesIncluded) => {
    const resp = await _post(`${API_ENDPOINT}/api/getInfo`, {}, {
        'Content-Type': 'application/json',
        'Unique-Identity': uniqueCode,
        'Col-Names-Included': colNamesIncluded,
    },
    );
    return resp.data;
}