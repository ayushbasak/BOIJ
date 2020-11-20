const { response } = require('express');

const sequelize = require('./database.js').sequelize;
const DataTypes = require('./database').DataTypes;

const generateRandom = (val)=>{
    let mult = Math.pow(10,val)/10;
    return Math.floor(Math.random() * 9 * mult + mult);
}

const authenticate = ()=>{
    sequelize
        .authenticate()
        .then(()=>console.log('Connection Successfull'))
        .catch((error)=>console.log(err));
}


const balance = sequelize.define('balance',{
    balanceid:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    consumerid: {
        type: DataTypes.INTEGER
    },
    balance:{
        type: DataTypes.INTEGER
    },
    accountno: {
        type: DataTypes.BIGINT
    }
}, {timestamps: false, freezeTableName: true});

const access = async (accountno)=>{
    await balance.findOne({
        where:{
            accountno: accountno
        }
    })
    .then(response=> val = response)
    .catch(e => val = e);

    return val;
}

const insert = async (body)=>{

    await balance.create({
        balanceid: generateRandom(8),
        consumerid: body.consumerid,
        balance: 0,
        accountno: body.accountno
    })
    .then(response => console.log(response))
    .catch(e => console.log(e))
}

const update = async ({value, accountno, method})=>{
    value = parseInt(value);
    let currBalance = 0;
    let responseText = '';
    await balance.findOne({
        where:{
            accountno: accountno
        }
    })
    .then(response => currBalance = parseInt(response.dataValues.balance));

    if(method == 'DEBIT'){
        if(value > currBalance){
            responseText = 'LOW BALANCE';
        }
        else{
        currBalance -= value;
        await balance.update({balance: currBalance},{where: {accountno: accountno}})
                .then(response=> responseText = 'DEBITED from account: ' + accountno + " with amount : " + value)
                .catch(e => console.log(e))
        }
    }
    else if(method == 'CREDIT'){
        currBalance += value;
        await balance.update({balance: currBalance}, {where: {accountno: accountno}})
                .then(response => responseText = 'CREDITED to account: ' + accountno +" with amount : " + value)
                .catch(e => console.log(e))
    }
    console.log(responseText);
    return responseText;
    // await balance.update()
}

module.exports = {
    balance: balance,
    authenticate: authenticate,
    access: access,
    insert: insert,
    update: update
}