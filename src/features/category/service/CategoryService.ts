import { fetchData } from "../../../api/api";

class CategoryService {
    getAllCategoriesAndSubCategories = async (endpoint: string) => {
        const res = await fetchData(endpoint);
        return res?.data
    }
}

export default new CategoryService();