var module = require('./DBModule');
var url=require('url');
var querystring=require('querystring');
var fs=require('fs');
var zlib = require('zlib');

exports.display_login=function(url, request, response){

			data1= '';

			request.on('data', function(chunk) {                                      
				data1 += chunk;                                               
			});          

			request.on('end', function() {
				qs=querystring.parse(data1);                   
				name=qs['username'];
				password=qs['password'];         
				result=module.authenticateUser(name,password);
				console.log("Result Fetched")
				if(result=="Valid User"){	
					
					fs.appendFile('./log.txt',"User "+name+"has Logged in at"+new Date(),function (err, html) {
						if (err) {
							throw err;
						}
					});

					response.writeHead(200, {'Content-Type': 'text/html'});
					
					fs.readFile('./Details_Book.html', function (err, html) {
						if (err) {
							throw err;
						}      

						response.writeHeader(200, {"Content-Type": "text/html"}); 
						response.write(html); 
						response.end(); 
					});
				}

				else{
					console.log("error");
					//response.end("Invalid User");
					response.writeHead(200, {'Content-Type': 'text/html'});
					response.write("<body bgcolor='#E2C2F6'><center>Invalid User try login Again!!</center></body>");
					response.write("<center><a href='home'>Back to Login</a></center>");
					response.end();
				}            



			});

}

exports.display_signup=function(url, request, response){          
			
			fs.readFile('./Signup_Book.html', function (err, html) {

				if (err) {
					throw err;
				}      

				response.writeHeader(200, {"Content-Type": "text/html"}); 
				response.write(html); 
				response.end(); 

			});

}

exports.display_register= function (url, request, response){   

			data1= '';

			request.on('data', function(chunk) {      
				console.log(chunk);
				data1 += chunk;                                               
				});                          

			request.on('end', function() {
				
				qs=querystring.parse(data1);
				console.log(qs);
				name=qs['username'];
				password=qs['password'];
				confirmpassword=qs['confirmpassword'];         
				address=qs['address'];
				phoneno=qs['phoneno'];
				email=qs['email'];

				if(password==confirmpassword){
					result=module.addUser(name,password,address,phoneno,email,response);
					response.writeHeader(200, {"Content-Type": "text/html"}); 
					response.write("<body bgcolor='#E2C2F6'><center>"+result+"</center></body>");
					response.write("<center><a href='home'>Click here to Login</a></center>");
					fs.readFile('./user_details.json', 'utf-8', function(err, data) {
						if (err) throw err
						var arrayOfObjects = JSON.parse(data)
						arrayOfObjects.users.push({
							name: name,
							password: password
						})
						fs.writeFile('./user_details.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
							if (err) throw err
						})
					})
				}

				else{

					response.writeHead(200, {'Content-Type': 'text/html'});
					response.write("<body bgcolor='#E2C2F6'><center>Password does not match with confirm password!!</center></body>");
					response.write("<center><a href='signup'>Try again</a></center>");
					response.end();             
				}

			});

}

exports.display_bookroom= function (url, request, response){   

	data1= '';

	request.on('data', function(chunk) {      
		console.log(chunk);
		data1 += chunk;                                               
		});                          

	request.on('end', function() {
		
		qs=querystring.parse(data1);
		console.log(qs);
		adults=qs['adults'];
		children=qs['children'];         
		roomtype=qs['roomtype'];

		if(roomtype){
			result=module.addBooking(adults,children,roomtype);
			response.writeHeader(200, {"Content-Type": "text/html"}); 
			response.write("<body bgcolor='#E2C2F6'><center>"+result+"</center></body>");
			response.write("<center><a href='home'>Go to HomePage</a></center>");
			fs.readFile('./booking_details.json', 'utf-8', function(err, data) {
				if (err) throw err
				var arrayOfObjects = JSON.parse(data)
				arrayOfObjects.bookings.push({
					adults: adults,
					children: children,
					roomtype:roomtype
				})
				fs.writeFile('./booking_details.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
					if (err) throw err
				})
			})
		}

		else{

			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write("<body bgcolor='#E2C2F6'><center>Booking could not be confirmed!</center></body>");
			response.write("<center><a href='signup'>Try again</a></center>");
			response.end();             
		}

	});

}

exports.display_home=function(url, request, response){          

			fs.readFile('./Login_Hotel.html', function (err, html) {
				
				if (err) {
					throw err;
				}      

				response.writeHeader(200, {"Content-Type": "text/html"}); 
				response.write(html); 
				response.end(); 
			});

}

exports.view_books=function(request, response){       
			
			fs.readFile('./rooms.json', function (err, json) {

				if (err) {
					throw err;
				}      

				response.writeHeader(200, {"Content-Type": "application/json"}); 
				response.end(json); 

			});

}

exports.getImageResponse=function(request,response){

			var img;

			switch(request.url) {

				case '/hotel-login.jpg':   img=fs.readFileSync('./hotel-images/hotel-login.jpg');

				break;

				case '/hotel-tariff':  img=fs.readFileSync('./hotel-images/hotel-tariff.jpg');

				break;

				case '/node3.jpg':  img=fs.readFileSync('./rooms/images/node3.jpg');

				break;

			}  

			response.writeHead(200, {'Content-Type': 'image/jpg' });
			response.end(img, 'binary');
}

exports.display_bookings=function(request,response){

	fs.readFile('./Booking.html', function (err, html) {

		if (err) {
			throw err;
		}      

		response.writeHeader(200, {"Content-Type": "text/html"}); 
		response.write(html); 
		response.end(); 

	});

}

exports.view_book=function(request, response){         

			var query=url.parse(request.url).query;
			var ebook=querystring.parse(query)["ebook"];                               
			file = fs.createReadStream("./rooms/"+ebook);
			file.pipe(response);   

}