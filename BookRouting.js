var routeHandler = require('./RouteHandler');

exports.enableRoute=function(url,request,response){
	
	var pathname=url.pathname;
	console.log("url_parts.pathname"+url.pathname);

	switch(pathname) {

		case '/home': routeHandler.display_home(pathname, request, response);

		break;

		case '/login':routeHandler.display_login(pathname, request, response);

		break;

		case '/signup':routeHandler.display_signup(pathname, request, response);

		break;

		case '/register':routeHandler.display_register(pathname, request, response);

		break;

		case '/bookroom':routeHandler.display_bookroom(pathname, request, response);

		break;

		case '/rooms': routeHandler.view_books(request, response);

		break;

		case '/hotel-login.jpg':routeHandler.getImageResponse(request,response);

		break;

		case '/hotel-tariff.jpg':routeHandler.getImageResponse(request,response);

		break;

		case '/node3.jpg':routeHandler.getImageResponse(request,response);

		break;

		case '/rooms/view': routeHandler.view_book(request, response);

		break;

		case '/rooms/booking': routeHandler.display_bookings(request, response);

		break;

		default:

		routeHandler.display_home(pathname, request,response);

	}

}
