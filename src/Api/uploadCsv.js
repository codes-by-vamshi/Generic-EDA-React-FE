import { _post } from "./commonApi";
export const uploadCsvFile = async (file, uniqueCode, colNamesIncluded) => {
    const formData = new FormData();
    formData.append('file', file);
    const resp = await _post('http://localhost:5000/api/uploadCsv', formData, {
        'Content-Type': 'multipart/form-data',
        'Unique-Identity': uniqueCode,
        'Col-Names-Included': colNamesIncluded,
    },
    );
    return resp.data;
}