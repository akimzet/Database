
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://jk4629:password@ds255715.mlab.com:55715/heroku_4j5xvh9t';


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
