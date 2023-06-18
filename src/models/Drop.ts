export default interface Drop {
    handleOptionChange?: Function,
    setSelectedTypes: Function
    update?: Function
    selectedTypes: any[]
    placeholder: string
    options: any[]
    type: number
    selectedMan?: any[]
}