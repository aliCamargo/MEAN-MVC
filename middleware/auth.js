
/**
 * Created by alicamargo on 6/28/16.
 */

var jwt = require('express-jwt');

module.exports = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'current_user'
});
