
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

        //store data from product website
        // var body = JSON.stringify(request.body);  //if wanted entire body as JSON
        // var params = JSON.stringify(request.params);//if wanted parameters
        var FIRSTNAME = request.body.FIRSTNAME;
        var LASTNAME = request.body.LASTNAME;
        var BSTREET = request.body.STREET;
        var BCITY = request.body.CITY;
        var BSTATE = request.body.STATE;
        var BZIP = request.body.ZIP;
        var EMAIL = request.body.EMAIL;

        var CUSTOMER_ID = request.body.CUSTOMER_ID;
        var CREDITCARDTYPE = request.body.CREDITCARDTYPE;
        var CREDITCARDNUM = request.body.CREDITCARDNUM;
        var CREDITCARDEXP = request.body.CREDITCARDEXP;

        var SHIPPING_STREET = request.body.SHIPPING_STREET;
        var SHIPPING_CITY = request.body.SHIPPING_CITY;
        var SHIPPING_STATE = request.body.SHIPPING_STATE;
        var SHIPPING_ZIP = request.body.SHIPPING_ZIP;

        var BILLING_ID = request.body.BILLING_ID;
        var SHIPPING_ID = request.body.SHIPPING_ID;
        var DATE = request.body.DATE;

        response.send(FIRSTNAME+LASTNAME+BSTREET+BCITY+BSTATE+BZIP+EMAIL+CUSTOMER_ID+CREDITCARDTYPE+CREDITCARDNUM+CREDITCARDEXP+
    SHIPPING_STREET+SHIPPING_CITY+SHIPPING_STATE+SHIPPING_ZIP+BILLING_ID+SHIPPING_ID+DATE);



        //get collection of routes
        var Routes = db.collection('Routes');


        //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        var c = Routes.find({});

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
