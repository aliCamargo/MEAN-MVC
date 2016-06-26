/**
 * Created by alicamargo on 6/24/16.
 */
var mongoose = require( 'mongoose' );

var locationSchema = new mongoose.Schema(
    {
        address : { type: String, default: '' },
        coords  : { type: [Number], index: '2dsphere' } //-- 2dsphere here is the critical part, as that’s what enables MongoDB to do the correct calculations when running queries and returning results
    },
    { timestamps: true }
    ),

    petSchema = new mongoose.Schema(
        {
            name        : { type: String, required: true },
            date_bird   : { type: Date, required: true }
        },
        { timestamps: true }
    ),

    userSchema = new mongoose.Schema(
        {
            name        : {type: String, required: true},
            surname     : String,
            hobbies     : [String],
            location    : {type : mongoose.Schema.ObjectId, ref : 'Location'},
            pets        : [{type : mongoose.Schema.ObjectId, ref : 'Pet'}]
        },
        { timestamps: true }
    )
    ;

// mongoose.model('Location', locationSchema);
// mongoose.model('Pet', petSchema);
// mongoose.model('User', userSchema);