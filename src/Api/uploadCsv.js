import { API_ENDPOINT } from "./ApiConstants";
import { _post } from "./commonApi";
export const uploadCsvFile = async (file, uniqueCode, colNamesIncluded) => {
    const formData = new FormData();
    formData.append('file', file);
    const resp = await _post(`${API_ENDPOINT}/api/uploadCsv`, formData, {
        'Content-Type': 'multipart/form-data',
        'Unique-Identity': uniqueCode,
        'Col-Names-Included': colNamesIncluded,
    },
    );
    return resp.data;
}