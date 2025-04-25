import { Ingredient } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"

interface IngredientsResponse {
    ingredients: Ingredient[]
}

export const getAll = async (): Promise<IngredientsResponse> => {
    const {data} = await axiosInstance.get<IngredientsResponse>(ApiRoutes.GET_INGRIDIENTS)

    return data
}