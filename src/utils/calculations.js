export const calculateCurrentExpenses = (category, previousMonth) => {
    return category.expenses ? category.expenses.reduce((spent, item) => {
        const targetMonth = previousMonth ? new Date().getMonth() - 1 : new Date().getMonth()

        if (new Date(item.date.seconds * 1000).getMonth() === targetMonth) {
            spent += Number(item.spent)
        }
        
        return spent
    }, 0) : 0
}