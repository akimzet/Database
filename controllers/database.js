
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

        // Parse string data to create product vector
        var stringData = request.body.STRINGDATA;


        var customerData =
            {
                _id: CUSTOMER_ID,
                FIRSTNAME: request.body.FIRSTNAME,
                LASTNAME: request.body.LASTNAME,
                STREET: request.body.SHIPPING_STREET1 + ' ' + request.body.SHIPPING_STREET2,
                CITY: request.body.SHIPPING_CITY,
                STATE: request.body.SHIPPING_STATE,
                ZIP: request.body.SHIPPING_ZIP,
                PHONE: request.body.PHONE
            };


        var billingData =
            {
                _id: BILLING_ID,
                CUSTOMER_ID: CUSTOMER_ID,
                CREDITCARDTYPE: request.body.CREDITCARDTYPE,
                CREDITCARDNUM: request.body.CREDITCARDNUM,
                CREDITCARDEXP: request.body.CREDITCARDEXP,
                CREDITCARDSECURITYNUM: request.body.CREDITCARDSECURITYNUM
            };

        var shippingData =
            {
                _id: SHIPPING_ID,
                CUSTOMER_ID: CUSTOMER_ID,
                SHIPPING_STREET: request.body.SHIPPING_STREET1 + ' ' + request.body.SHIPPING_STREET2,
                SHIPPING_CITY: request.body.SHIPPING_CITY,
                SHIPPING_STATE: request.body.SHIPPING_STATE,
                SHIPPING_ZIP: request.body.SHIPPING_ZIP
            };

        var ordersData =
            {
                _id: ORDER_ID,
                CUSTOMER_ID: CUSTOMER_ID,
                BILLING_ID: BILLING_ID,
                SHIPPING_ID: SHIPPING_ID,
                DATE: DATE,
                PRODUCT_VECTOR: stringData
            };

        // Send data to mLab
        CUSTOMERS.insertOne(customerData, function (err, result){ if (err) throw err; });
        BILLING.insertOne(billingData, function (err, result){ if (err) throw err; });
        SHIPPING.insertOne(shippingData, function (err, result){ if (err) throw err; });
        ORDERS.insertOne(ordersData, function (err, result){ if (err) throw err; });

        // Close connection
        db.close(function (err){ if(err) throw err; });
    });


};//end function
