interface SortTypeDescription {
    DateDescending: {value: number, label: string},
    DateAscending: {value: number, label: string},
    PriceDescending: {value: number, label: string},
    PriceAscending: {value: number, label: string},
    MilageDescending: {value: number, label: string},
    MilageAscending: {value: number, label: string}
}

export const SortType : SortTypeDescription = {
    DateDescending: {value: 1, label: "Date Descending"},
    DateAscending: {value: 2, label: "Date Ascending"},
    PriceDescending: {value: 3, label: "Price Descending"},
    PriceAscending: {value: 4, label: "Price Ascending"},
    MilageDescending: {value: 5, label: "Milage Descending"},
    MilageAscending: {value: 6, label: "Milage Ascending"}
};