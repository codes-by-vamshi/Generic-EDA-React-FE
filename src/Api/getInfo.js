import { _post } from "./commonApi";
export const getInfo = async (uniqueCode, colNamesIncluded) => {
    const resp = await _post('https://dskvamshi.pythonanywhere.com/api/getInfo', {}, {
        'Content-Type': 'application/json',
        'Unique-Identity': uniqueCode,
        'Col-Names-Included': colNamesIncluded,
    },
    );
    return resp.data;
}