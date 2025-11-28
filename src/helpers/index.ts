import { DATA } from "../constants"

export const findPizza = (id: number) => {
    return DATA.find(pizza => pizza.id === id)
}
