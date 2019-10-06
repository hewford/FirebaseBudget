import {
    addTransaction,
    editTransaction,
    deleteTransaction,
    addLocation,
    editCategory,
    updateCategory,
    addCategory,
    getAllMonthsWithTransactions,
    getCategoryBalance,
    getTransacationsWithinTimeframe
} from "./index.js";
import moment from "moment";

describe('', () => {
    let budget;
    let category;
    const septemberFirstDeposit = {
        amount: 100,
        deposit: true,
        description: "Deposit budget amount",
        id: "abc", timestamp: 1567383427189 // September 1st
    }
    const augustExpense = {amount:30, timestamp:1565783527189}
    const septemberExpenseOne = {amount:10, timestamp:1569781527189}
    const septemberExpenseTwo = {amount:20, timestamp:1569783527189}

    beforeEach(() => {
        category = {
            budget: 100,
            name: "Test Category",
            color: "blue",
            locations: [],
            transactions: [septemberFirstDeposit],
            id: "1234"
        }

        budget = {
            categories: [ category ]
        }
    })

    it('should be able to add a transaction and edit/delete transactions', () => {
        expect(category.transactions.length).toBe(1)

        let updatedCategory = addTransaction( category, {amount: 21.25} )

        expect(updatedCategory.transactions.length).toBe(2)
        expect(updatedCategory.transactions[1].amount).toBe(21.25);
        expect(updatedCategory.transactions[1].id).not.toBeNull();
        expect(moment(updatedCategory.transactions[0].timestamp).format("D")).toBe("1");
        expect(moment(updatedCategory.transactions[0].timestamp).format("MMMM")).toBe("September"); 


        let updatedCategory2 = addTransaction( updatedCategory, {amount: 25.25, location: "North Star"} )

        expect(updatedCategory2.transactions.length).toBe(3)

        const transactionOneId = updatedCategory2.transactions[1].id
        const transactionTwo = updatedCategory2.transactions[2]
        const transactionTwoId = transactionTwo.id

        let updatedCategory3 = deleteTransaction(updatedCategory2, transactionOneId)

        expect(updatedCategory3.transactions.length).toBe(2)
        expect(updatedCategory3.transactions[1].id).toBe(transactionTwoId)

        expect(updatedCategory3.transactions[1].description).not.toBe("Burrito");
        let updatedCategory4 = editTransaction(updatedCategory3, {...transactionTwo, amount: 30, description: "Burrito"})
        expect(updatedCategory4.transactions[1].amount).toBe(30);
        expect(updatedCategory4.transactions[1].description).toBe("Burrito");
    });

    it('should be able to add a unique location', () => {
        expect(category.locations.length).toBe(0)

        let category2 = addLocation(category, "North Star")

        expect(category2.locations.length).toBe(1)
        expect(category2.locations[0]).toBe("North Star")

        let category3 = addLocation(category2, "north star")
        expect(category3.locations.length).toBe(1)

        let category4 = addLocation(category3, "NorthStar")
        expect(category4.locations.length).toBe(1)

        let category5 = addLocation(category4, "North Market")
        expect(category5.locations.length).toBe(2)
    })

    it("should be able to updated category info", () => {
        expect(category.budget).toBe(100);

        let updatedCategory = editCategory(category, {budget: 150})

        expect(updatedCategory.budget).toBe(150);
        expect(updatedCategory).not.toEqual(category)
    }),

    it("should be able to target a category and update it", () => {
        const newBudget = updateCategory(budget, "1234", {amount: 21.25}, addTransaction)

        expect(getCategory(newBudget.categories, "1234").transactions.length).toBe(2)
        expect(getCategory(newBudget.categories, "1234").transactions[1].amount).toBe(21.25)

        const transactionId = getCategory(newBudget.categories, "1234").transactions[1].id
        const newBudget2 = updateCategory(newBudget, "1234", transactionId, deleteTransaction)

        expect(getCategory(newBudget2.categories, "1234").transactions.length).toBe(1)

        expect(getCategory(newBudget2.categories, "1234").locations.length).toBe(0)
        const newBudget3 = updateCategory(newBudget2, "1234", "North Star", addLocation)

        expect(getCategory(newBudget3.categories, "1234").locations.length).toBe(1)
        expect(getCategory(newBudget3.categories, "1234").locations[0]).toBe("North Star")
    })

    it("should be able to add a category to a budget", () => {
        const newCategory = {
            budget: 100,
            name: "Test Category Two",
        }

        const newBudget = addCategory(budget, newCategory)
        const initialDeposit = newBudget.categories[1].transactions[0]

        expect(newBudget.categories.length).toBe(2)
        expect(initialDeposit.amount).toBe(100)
        expect(initialDeposit.deposit).toBe(true)
    })

    it("can get all months with transactions in a category", () => {
        /** Below has 2 transactions from September and 1 from August 
         * timestamp: 1569783527189 => September 29, 2019 around 3PM
         * timestamp: 1565783527189 => Auguth ??, 2019 sometime...
        */
        let newCategory = addTransaction(category, septemberExpenseTwo)
        newCategory = addTransaction(newCategory, septemberExpenseOne)
        newCategory = addTransaction(newCategory, augustExpense)
        let timeframes = getAllMonthsWithTransactions(newCategory)
        timeframes[2019] = timeframes[2019].sort();
        expect(timeframes).toEqual({"2019": ["August", "September"]})
    })

    it("should be able to get category balance", () => {
        let newCategory = addTransaction(category, septemberExpenseTwo) // September 2019
        newCategory = addTransaction(newCategory, septemberExpenseOne) // September 2019
        newCategory = addTransaction(newCategory, augustExpense) // August 2019

        expect(getCategoryBalance(newCategory)).toBe(100 - 20 - 10 - 30)
    })

    it('shoud be able to filter transactions for selected timeframe', () => {
        let newCategory = addTransaction(category, septemberExpenseTwo) // September 2019
        newCategory = addTransaction(newCategory, septemberExpenseOne) // September 2019
        newCategory = addTransaction(newCategory, augustExpense) // August 2019
        
        const expectedTransaction = [septemberFirstDeposit, septemberExpenseOne, septemberExpenseTwo].map(transaction=>{
            const { amount, timestamp } = transaction
            return {amount, timestamp}
        })
        const filteredTransactions = getTransacationsWithinTimeframe(newCategory.transactions, "2019", "September").map(transaction=>{
            const { amount, timestamp } = transaction
            return {amount, timestamp}
        })
        
        expect(JSON.stringify(filteredTransactions.sort((a,b) => a.timestamp - b.timestamp)))
            .toEqual(JSON.stringify(expectedTransaction.sort((a,b) => a.timestamp - b.timestamp)))
    })
})

const getCategory = (categories, id) => categories.find(category => category.id === id)
