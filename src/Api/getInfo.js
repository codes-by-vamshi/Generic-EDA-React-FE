import { _post } from "./commonApi";
export const getInfo = async (uniqueCode, colNamesIncluded) => {
    const resp = await _post('http://localhost:5000/api/getInfo', {}, {
        'Content-Type': 'application/json',
        'Unique-Identity': uniqueCode,
        'Col-Names-Included': colNamesIncluded,
    },
    );
    return resp.data;
}