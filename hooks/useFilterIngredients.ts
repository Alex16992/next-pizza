import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import React from "react"
import { useSet } from "react-use"

interface ReturnProps {
    ingredients: Ingredient[]
    loading: boolean
    selectedIds: Set<string>
    onAddId: (ids: string[]) => void
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    const [selectedIds, { add, remove, toggle }] = useSet<string>(new Set<string>([]));

    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true);
                const response = await Api.ingredients.getAll();
                setIngredients(response.ingredients);
            } catch (error) {
                console.log(error);
                setIngredients([]);
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients();
    }, [])

    // Create a handler that properly deals with array of values
    const handleToggleIds = (ids: string[]) => {
        ids.forEach(id => {
            if (selectedIds.has(id)) {
                remove(id);
            } else {
                add(id);
            }
        });
    };

    return {
        ingredients,
        loading,
        onAddId: handleToggleIds,
        selectedIds
    }
}