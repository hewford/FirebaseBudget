import _ from "lodash";
export const budgetsOne = {userId:"abc"}
let budgetsData = []

let budgetCollection = {
    budgetsData: [],
    doc: (id) => {
        var budgetData = budgetsData.find(doc => id === doc.id)
        if (!id) {
            return { get: () => budgetsData }
        } else {
            return {
                get: () => {
                    
                    return {
                        then: (callback) => {
                            if (budgetData) {
                                callback({
                                    ...budgetData
                                })
                                return {
                                    catch:() => {}
                                }
                            } else {
                                return {
                                    catch:(errback) => errback("error")
                                }
                            }
                        } 
                    }
                },
                set: (newBudget) => {
                    const oldBudgetsData = budgetCollection.budgetsData
                    let change = false
                    budgetCollection.budgetsData = budgetCollection.budgetsData.map(doc => {
                        if (budgetData.id === doc.id) {
                            change = true;
                            return {...doc, data: () => newBudget}
                        }
                        return doc
                    })
                    return {
                        then: (callback) => {
                            if (change) {
                                callback()
                                return {
                                    catch:() => {}
                                }
                            } else {
                                return {
                                    catch:(errback) => errback("error")
                                }
                            }
                        } 
                    }
                }
            }
        }
    },
    add: (newBudget) => {
        const id = "budgetId"+budgetCollection.budgetsData.length
        budgetCollection.budgetsData.push({
            data: () => newBudget,
            id: id
        })
        return {
            then: (callback) => {
                if (budgetCollection.budgetsData.find(doc => doc.id === id)) {
                    callback()
                    return {
                        catch:() => {}
                    }
                } else {
                    return {
                        catch:(errback) => errback("error")
                    }
                }
            } 
        }
    },
    where: (key, condition, value) => {
        const budgetData = budgetCollection.budgetsData.filter(doc => {
            if (condition == "==") {
                const budget = doc.data()
                return budget[key] == value;
            } else {
                return true
            }
        })
        return {
            get: () => {
                return {
                    then: (callback) => {
                        if (budgetData) {
                            callback({
                                docs: budgetData
                            })
                            return {
                                catch:() => {}
                            }
                        } else {
                            return {
                                catch:(errback) => errback("error")
                            }
                        }
                    } 
                }
            }
        }
    }
}
const firestore = {
    budgetCollection: budgetCollection,
    collection: (collection) => {
        if (collection == "budgets") {
            return firestore.budgetCollection
        }
    },
    get: (collection) => {
        firestore.budgetsData = _.cloneDeep(firestore.budgetCollection.budgetsData)
        return firestore.budgetsData
    },
    budgetsData: [],
    reset: () => {
        firestore.budgetsData = []
        firestore.budgetCollection.budgetsData = [];
    }
}
export const getFirestore = () => {
    

    return firestore
}