### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

JSON Web Token used for sending information between the client and the server, usally used for authentication and authorization.

- What is the signature portion of the JWT?  What does it do?

The signature portion of a JWT is one of its three main parts, alongside the header and payload. The signature is created by taking the encoded header, encoded payload, a secret key (or private key in some cases), and a signing algorithm, and then generating a signature. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't tampered with during transmission.

- If a JWT is intercepted, can the attacker see what's inside the payload?

If an attacker intercepts a JWT they can easily see the payload and contents, sensitive information should not be stored in JWT payload.  
- How can you implement authentication with a JWT?  

Describe how it works at a high level.

JWT-based authentication involves the following high-level steps:

User logs in with their credentials (username and password).
The server validates the credentials and, if correct, generates a JWT token.
The server sends the JWT token back to the client.
The client stores the token, typically in a cookie or local storage.
For subsequent requests to protected resources, the client includes the JWT in the request headers.
The server validates the JWT's signature and expiration, allowing access if the JWT is valid.

- Compare and contrast unit, integration and end-to-end tests.

Unit tests: Focus on testing individual components or functions in isolation. They are small in scope and typically don't involve external dependencies. Unit tests help ensure that specific units of code work correctly.

Integration tests: Test the interactions between different components or modules of an application. They check if these components work together as expected and often involve external dependencies.

End-to-end tests: Test the entire application from start to finish, simulating real user interactions. They ensure that the entire system functions correctly, including its user interface and external integrations.
 
- What is a mock? What are some things you would mock?

A mock is a fake object or function used in testing to isolate whats being test from external dependencies.

- What is continuous integration?

CI is the practice where code changes are automatically built, tested, and integrated into a shared repository on a frequent basis, often multiple times a day. CI aims to detect and address integration issues early in the development process, ensuring that the codebase remains stable and that new changes do not break existing functionality.

- What is an environment variable and what are they used for?

An enviroment variable is a variable outside the application that holds configuration information, it is used to keep sensitive information seperate from code and allows for changes without modifying code.

- What is TDD? What are some benefits and drawbacks?

Test-Driven-Development is the aproach where test are written before code is written. 

Some benefits are that it allows for faster debuggging , better documentation and overall improved code quality. 

Some drawbacks are that TTD takes more time to write, test may not cover all possible edge cases and it can be challenging to write tests before code.  

- What is the value of using JSONSchema for validation?

JSONSchema is a valuable tool for creating structures and constraints for JSON data ensuring that your data conforms to a predefined schema. THis provides consistency in data, data validation and better documentation.

- What are some ways to decide which code to test?

Some ways to decide which code to test are 

-code that frequently changes
-Edge cases 
-Error handling
-Places where code intergrates with external factors 


- What does `RETURNING` do in SQL? When would you use it?

RETURNING is used to retrieve values of certain columns after the operation has been performed, it can be used to retrieve new data or updated data without having to make any additional querries.

- What are some differences between Web Sockets and HTTP?

HTTP is a request-response protocol, while Web Sockets provide full-duplex communication, allowing both the client and server to send messages independently.

HTTP is stateless, meaning each request is independent, while Web Sockets maintain a persistent connection.

HTTP is often used for traditional web page loading, while Web Sockets are used for real-time communication and applications like chat, gaming, and collaborative

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?

While Flask seems to be more straight foward and easy to use at first, I prefer Express there are more capabilities and the overall fuctionality and ease of use is greater.