
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://jk4629:password@ds113626.mlab.com:13626/heroku_xwg1wk7x';

/** getAllRoutes controller logic that current does model logic too -connects to Mongo database and
 * queries the Routes collection to retrieve all the routes and build the output usig the
 * ejs template storeData.ejs found in views directory
 * @param request
 * @param response
 *
 */
module.exports.storeData =  function (request, response) {
    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        var CUSTOMER_ID = Math.floor((Math.random() * 1000000000000) + 1);
        var BILLING_ID = Math.floor((Math.random() * 1000000000000) + 1);
        var SHIPPING_ID = Math.floor((Math.random() * 1000000000000) + 1);

        var CUSTOMERS = db.collection('CUSTOMERS');
        var BILLING = db.collection('BILLING');
        var SHIPPING = db.collection('SHIPPING');
        var ORDERS = db.collection('ORDERS');

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



        CUSTOMERS.insertOne(customerData, function (err, result)
        {
            if (err) throw err;
        });

        // BILLING.insertOne(billingData, function (err, result)
        // {
        //     if (err) throw err;
        // })
        //
        // SHIPPING.insertOne(shippingData, function (err, result)
        // {
        //     if (err) throw err;
        // })




        /*CUSTOMERS.deleteMany({}, function (err, result) {
        if (err) throw err;
        });*/





        //get collection of routes
        // var Routes = db.collection('Routes');


        //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        // var c = Routes.find({});

        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just  loging the output to the console
            }
        );


        //SECOND -show another way to make request for ALL Routes  and simply collect the  documents as an
        //   array called docs that you  forward to the  storeData.ejs view for use there
        Routes.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('storeData', {results: docs});

        });


        //Showing in comments here some alternative read (find) requests
        //this gets Routes where frequency>=10 and sorts by name
        // Routes.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Routes by name
        //  Routes.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {


        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        var CUSTOMER_ID = Math.floor((Math.random() * 1000000000000) + 1);
        var BILLING_ID = Math.floor((Math.random() * 1000000000000) + 1);
        var SHIPPING_ID = Math.floor((Math.random() * 1000000000000) + 1);

        var CUSTOMERS = db.collection('CUSTOMERS');
        var BILLING = db.collection('BILLING');
        var SHIPPING = db.collection('SHIPPING');
        var ORDERS = db.collection('ORDERS');

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



        // CUSTOMERS.insertOne(customerData, function (err, result)
        // {
        //     if (err) throw err;
        // })
        //
        BILLING.insertOne(billingData, function (err, result)
        {
            if (err) throw err;
        });
        //
        // SHIPPING.insertOne(shippingData, function (err, result)
        // {
        //     if (err) throw err;
        // })




        /*CUSTOMERS.deleteMany({}, function (err, result) {
        if (err) throw err;
        });*/





        //get collection of routes
        // var Routes = db.collection('Routes');


        //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        // var c = Routes.find({});

        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just  loging the output to the console
            }
        );


        //SECOND -show another way to make request for ALL Routes  and simply collect the  documents as an
        //   array called docs that you  forward to the  storeData.ejs view for use there
        Routes.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('storeData', {results: docs});

        });


        //Showing in comments here some alternative read (find) requests
        //this gets Routes where frequency>=10 and sorts by name
        // Routes.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Routes by name
        //  Routes.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {


        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function
