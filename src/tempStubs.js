export const categories = [
    {id: "1", color:"#FF6F00", name: "Personal1", budget: 100, balanceLogic: 'Carryover', locations: ['one', 'two']},
    {id: "2", color:"#00D9C5", name: "Personal2", budget: 110, balanceLogic: 'Reset Monthly', locations: ['North Star', 'Hubbard Grill', 'Jeni`s', 'Iron Wafel']},
    {id: "3", color:"#FF00A2", name: "Personal3", budget: 120, balanceLogic: 'Reset Monthly'},
    {id: "4", color:"#007AFF", name: "Personal4", budget: 130, balanceLogic: 'Carryover'},
    {id: "5", color:"#00B309", name: "Personal5", budget: 140, balanceLogic: 'Increment Daily'},
    {id: "6", color:"#6D4322", name: "Personal6", budget: 190, balanceLogic: 'Carryover',
        transactionHistory: {
            may: {
                month: 'May',
                expenses: [
                    {
                        date: '05/29/19',
                        location: 'Fox In The Snow',
                        spent: 56.23,
                        description: 'ate an egg sandwich'
                    },
                    {
                        date: '05/30/19',
                        location: 'Fox In The Snow',
                        spent: 56.23,
                        description: 'ate an egg sandwich'
                    },
                    {
                        date: '05/31/19',
                        location: 'Fox In The Snow',
                        spent: 56.23,
                        description: 'ate an egg sandwich'
                    },
                ]
            },
            apr: {
                month: 'April',
                expenses: [
                    {
                        date: '04/29/19',
                        location: 'Iron Wafel',
                        spent: 10.74,
                        description: 'ate a waffle'
                    },
                    {
                        date: '04/30/19',
                        location: 'Iron Wafel',
                        spent: 10.74,
                        description: 'ate a waffle'
                    },
                    {
                        date: '04/31/19',
                        location: 'Iron Wafel',
                        spent: 10.74,
                        description: 'ate a waffle'
                    },
                ]
            },
            mar: {
                month: 'March',
                expenses: [
                    {
                        date: '04/29/19',
                        location: 'Jeni\'s',
                        spent: 11.74,
                        description: 'ate ice cream'
                    },
                    {
                        date: '04/30/19',
                        location: 'Jeni\'s',
                        spent: 11.74,
                        description: 'ate ice cream'
                    },
                    {
                        date: '04/31/19',
                        location: 'Jeni\'s',
                        spent: 11.74,
                        description: 'ate ice cream'
                    },
                ]
            },
        }
    }
]
