const { response } = require('express');

const sequelize = require('./database.js').sequelize;
const DataTypes = require('./database').DataTypes;

const generateRandom = (val)=>{
    let mult = Math.pow(10,val)/10;
    return Math.floor(Math.random() * 9 * mult + mult);
}

const consumer = sequelize.define('consumer', {
    consumerid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    dob: {
        type: DataTypes.DATE
    },
    pincode: {
        type: DataTypes.INTEGER
    },
    phone: {
        type: DataTypes.BIGINT
    },
    accountno: {
        type: DataTypes.BIGINT
    },
    pin:{
        type: DataTypes.INTEGER
    }
},{timestamps: false, freezeTableName: true})

const authenticate = ()=>{
    sequelize
        .authenticate()
        .then(()=>console.log('Connection Successfull'))
        .catch((error)=>console.log(err));
}

const insert = async (body)=>{
    await consumer.create({
        consumerid: generateRandom(9),
        name: body.name.toUpperCase(),
        dob: body.dob,
        pincode: body.pincode,
        phone: body.phone,
        accountno: generateRandom(10),
        pin: generateRandom(4)
    })
    .then(response => console.log(response))
    .catch((err)=> console.log(err));
}

const access = async (AccountId, PIN)=>{
    await consumer.findAll({
        where: {
            accountno: AccountId,
            pin: PIN
        }
    })
    .then(response => val = response)
    .catch((err)=> val = 'INVALID DETAILS');

    if(val.length === 0)
        val = "INVALID DETAILS"
    console.log(val);
    return val;
}

const details = async ()=>{
    await consumer.findAll()
    .then(response => val = response)
    .catch((err)=> val = err);

    return val;
}

module.exports = {
    consumer: consumer,
    authenticate: authenticate,
    insert: insert,
    access: access,
    details: details
} 