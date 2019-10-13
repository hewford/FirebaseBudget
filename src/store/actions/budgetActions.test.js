import { budgetsData, budgets, budgetCollection, getFirestore } from "./mockFireStore"
import {addCategory} from "../../methods"
import { firestoreAddBudget } from "./firestoreActions"
// let budgetsData = [
//     {data:()=>budgetsOne, id:"123"}
// ]
describe('', () => {
    let response;
    const uid = "abcxyz"
    const dispatch = (action) => {
        response = action
    }
    const getState = () => {
        return {
            firebase: {
                auth: {
                    uid
                }
            }
        }
    }
    beforeEach(() => {
        // getFirestore().reset();
    })
    it('applesauce', () => {
        const db = getFirestore();
        console.log(db.budgetsData)
        firestoreAddBudget(dispatch, getState, {getFirestore})
        console.log(db.budgetsData)
        expect(response.type).toBe('CREATE_BUDGET_SUCCESS')
        db.get("budgets");
        const firestore = getFirestore();
        firestore.get("budgets")
        console.log(firestore.budgetsData)
        expect(db.budgetsData[0].data().userId).toEqual(uid)

        // const db = getFirestore()
        // const newBudget = addCategory({ categories: [], userId: uid}, category)
        // db.collections("budgets")
        // .add(newBudget)
        // .then(() => {
        //     console.log("ADDED")
        //     console.log(budgetsData)
        // })
        // .catch(() => {
        //     console.log("FAIL TO ADD")
        // })

        // db.collections()
        
        // console.log(
        //     db.collections("budgets")
        //         .where("userId", "==", "xyz")
        //         .get()
        //         .then((data) => {
        //             const budgetId = data.docs[0].id
        //             const budget = data.docs[0].data()
        //             console.log(budgetId, budget)
        //         })
        // )
        // console.log(
        //     db.collections("budgets")
        //         .doc("123")
        //         .get()
        //         .then(doc => {
        //             const budget = doc.data()
        //             console.log(budget)
        //             // const budgetId = data.docs[0].id
        //             // const budget = data.docs[0].data()
        //             // console.log(budgetId, budget)
        //         })
        //         .catch(()=>{
        //             console.log("catch")
        //         })
        // )
        // console.log("BEFORE:", budgetsData[0].data())
        // db.collections("budgets")
        //     .doc("123")
        //     .set({userId:"ooo"})
        //     .then(() => {
        //         console.log("SUCCESS")
        //         console.log("AFTER:",budgetsData[0].data())
        //     })
        //     .catch(() => {
        //         console.log("FAIL")
        //     })
        // db.collections("budgets")
        //     .add({userId:"xyz"})
        //     .then(() => {
        //         console.log("ADDED")
        //         console.log(budgetsData)
        //     })
        //     .catch(() => {
        //         console.log("FAIL TO ADD")
        //     })
        // db.collections("budgets")
        //     .add({userId:"xyz"})
        //     .then(() => {
        //         console.log("ADDED")
        //         console.log(budgetsData)
        //     })
        //     .catch(() => {
        //         console.log("FAIL TO ADD")
        //     })
    })
})