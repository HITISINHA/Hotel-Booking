var fs = require('fs');
exports.authenticateUser = function(username,password) {
    var obj = JSON.parse(fs.readFileSync('./user_details.json', 'utf8'));
    console.log("File Read")
    let users=obj.users
    let user_test, pass_test
    users.forEach(user => {
        if ((user.name==username) && (user.password==password)){
            user_test=username
            pass_test=password
        }
    });
    if(username===user_test && password===pass_test){
        return "Valid User";
    }   else
        return "Invalid User";
}

exports.addUser = function(username, password, address, phoneno, email, res) {
    
     return "User added successfully";

}

exports.addBooking = function(username, password, address, phoneno, email, res) {
    
    return "Room is booked. Have a pleasant stay!!";

}
