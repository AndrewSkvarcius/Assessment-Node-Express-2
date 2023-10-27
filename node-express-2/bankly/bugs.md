#1 Auth login route missing await keyword for User.authenticate

By adding await before User.authenticate(username, password), you will ensure that the asynchronous authentication process is completed and that the user variable holds the resolved value (or an error if authentication fails) before proceeding to create the token and respond to the request.

#2 Middleware function authUser uses unconventional methods to Retrieve JWT token/ cur_username returns undefined causing 401 unauthorized response.

  by switching to use of an Authorization Header ,use of res.locals and following startdard conventions the token was transmitted properly fixed the 401 error. ALSO adding verification of security signature helped to stop any potential attacks.