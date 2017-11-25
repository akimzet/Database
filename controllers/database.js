var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://jk4629:password@ds113626.mlab.com:13626/heroku_xwg1wk7x';

module.exports.storeData =  function (request, response)
{
    mongodb.MongoClient.connect(mongoDBURI, function(err, db)
    {
        if(err) throw err;

        var CUSTOMER_ID = Math.floor((Math.random() * 1000000000000) + 1);
        var BILLING_ID = Math.floor((Math.random() * 1000000000000) + 1);
        var SHIPPING_ID = Math.floor((Math.random() * 1000000000000) + 1);
        var ORDER_ID = Math.floor((Math.random() * 1000000000000) + 1);

        var CUSTOMERS = db.collection('CUSTOMERS');
        var BILLING = db.collection('BILLING');
        var SHIPPING = db.collection('SHIPPING');
        var ORDERS = db.collection('ORDERS');
        var ALL = db.collection('ALL');

        // Parse string data to create product vector
        var stringData = request.body.STRINGDATA;
        var arrayData = stringData.split(' ').map(Number);
        var count1 = 0
        var count2 = 1
        var count3 = 2
        var stringVector = '';
        var size = Math.floor(arrayData.length / 3);
        for ( var i = 0; i < size ; i++)
        {
            stringVector += '{' + arrayData[count1] + ', ' + arrayData[count2] + ', ' + arrayData[count3] + '}';
            count1 += 3
            count2 += 3
            count3 += 3
            if(i != size - 1) stringVector += ', ';
        }


        var customerData =
            {
                _id: CUSTOMER_ID,
                FIRSTNAME: request.body.FIRSTNAME,
                LASTNAME: request.body.LASTNAME,
                BILLING_STREET: request.body.BILLING_STREET1 + ' ' + request.body.BILLING_STREET2,
                CITY: request.body.CITY,
                STATE: request.body.STATE,
                ZIP: request.body.ZIP,
                PHONE: request.body.PHONE,
                EMAIL: request.body.EMAIL
            };


        var billingData =
            {
                _id: BILLING_ID,
                CUSTOMER_ID: CUSTOMER_ID,
                CREDITCARDTYPE: request.body.CREDITCARDTYPE,
                CREDITCARDNUM: request.body.CREDITCARDNUM,
                CREDITCARDEXP: request.body.CREDITCARDEXPM + ' ' + request.body.CREDITCARDEXPY,
                CREDITCARDSECURITYNUM: request.body.CREDITCARDSECURITYNUM
            };

        var shippingData =
            {
                _id: SHIPPING_ID,
                CUSTOMER_ID: CUSTOMER_ID,
                SHIPPING_STREET: request.body.SHIPPING_STREET1 + ' ' + request.body.SHIPPING_STREET2,
                SHIPPING_CITY: request.body.SHIPPING_CITY    ,
                SHIPPING_STATE: request.body.SHIPPING_STATE,
                SHIPPING_ZIP: request.body.SHIPPING_ZIP
            };

        var ordersData =
            {
                _id: ORDER_ID,
                CUSTOMER_ID: CUSTOMER_ID,
                BILLING_ID: BILLING_ID,
                SHIPPING_ID: SHIPPING_ID,
                DATE: request.body.DATE,
                PRODUCT_VECTOR: stringVector,
                ORDER_TOTAL: request.body.ORDER_TOTAL
            };

        // Put all MongoDB Data into one collection
        var allData =
            {
                cid: CUSTOMER_ID,
                FIRSTNAME: request.body.FIRSTNAME,
                LASTNAME: request.body.LASTNAME,
                BILLING_STREET: request.body.BILLING_STREET1 + ' ' + request.body.BILLING_STREET2,
                CITY: request.body.SHIPPING_CITY,
                STATE: request.body.SHIPPING_STATE,
                ZIP: request.body.SHIPPING_ZIP,
                PHONE: request.body.PHONE,
                EMAIL: request.body.EMAIL,

                bid: BILLING_ID,
                CUSTOMER_ID: CUSTOMER_ID,
                CREDITCARDTYPE: request.body.CREDITCARDTYPE,
                CREDITCARDNUM: request.body.CREDITCARDNUM,
                CREDITCARDEXP: request.body.CREDITCARDEXPM + ' ' + request.body.CREDITCARDEXPY,
                CREDITCARDSECURITYNUM: request.body.CREDITCARDSECURITYNUM,

                sid: SHIPPING_ID,
                SHIPPING_STREET: request.body.SHIPPING_STREET1 + ' ' + request.body.SHIPPING_STREET2,
                SHIPPING_CITY: request.body.SHIPPING_CITY,
                SHIPPING_STATE: request.body.SHIPPING_STATE,
                SHIPPING_ZIP: request.body.SHIPPING_ZIP,

                oid: ORDER_ID,
                BILLING_ID: BILLING_ID,
                SHIPPING_ID: SHIPPING_ID,
                DATE: request.body.DATE,
                PRODUCT_VECTOR: stringVector,
                ORDER_TOTAL: request.body.ORDER_TOTAL
            };


        // Send data to mLab
        CUSTOMERS.insertOne(customerData, function (err, result){ if (err) throw err; });
        BILLING.insertOne(billingData, function (err, result){ if (err) throw err; });
        SHIPPING.insertOne(shippingData, function (err, result){ if (err) throw err; });
        ORDERS.insertOne(ordersData, function (err, result){ if (err) throw err; });
        ALL.insertOne(allData, function (err, result){ if (err) throw err; });



        // Send data needed to views
        ALL.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('storeData', {results: docs});

        });

        // Close connection to mLab
        db.close(function (err){ if(err) throw err; });

        response.send('Order Successful');
    });


};//end function
