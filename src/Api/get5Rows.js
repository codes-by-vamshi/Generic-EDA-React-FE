import { _post } from "./commonApi";
export const get5Rows = async (uniqueCode, colNamesIncluded) => {
    const resp = await _post('https://dskvamshi.pythonanywhere.com/api/get5Rows', {}, {
        'Content-Type': 'application/json',
        'Unique-Identity': uniqueCode,
        'Col-Names-Included': colNamesIncluded,
    },
    );
    return resp.data;
}