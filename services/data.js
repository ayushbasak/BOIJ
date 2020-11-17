const { response } = require('express');
require('dotenv').config()

const username = process.env.DB_USERNAME;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;

const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize(database, username, password,{
    host: 'localhost',
    dialect: 'postgres'
});

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
        consumerid: Math.floor(Math.random() * 10000000),
        name: body.name,
        dob: body.dob,
        pincode: body.pincode,
        phone: body.phone
    })
    .then(response => console.log(response))
    .catch((err)=> console.log(err));
}

module.exports = {
    consumer: consumer,
    authenticate: authenticate,
    insert: insert
} 