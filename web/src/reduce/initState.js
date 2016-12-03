// Initial redux store, have to setup here in case of a bad state is passing

/**
 Main Investment Category
 */

const basicArrayCategory = [
        {name:'Bonds', value: 0},
        {name:'Stocks', value: 0},
        {name:'Mutual Funds', value: 0},
        {name:'Forex', value: 0},
        {name:'Real Estate', value: 0}
    ];

export default {
    // arbitrary risk level
    riskLevel : [
        [10,10,30,5,45], 
        [30,10,30,15,25],
        [20,20,20,30,10],
        [5,30,5,55,5],
        [5,10,5,75,5],
    ],
    activeRiskLevel: 0, //set to low risk level by default
    currentInvestment: [...basicArrayCategory]
};