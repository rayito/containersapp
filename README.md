# containersapp
### Wastes & Containers management web app

![Codefish status](https://codeship.io/projects/09e1f920-d123-0131-db62-1211774025ad/status)

## Instructions to run in local
 
Install mongodb, node and express.

Then cd into the cloned directory and run: 
`$ mongod --dbpath ./db`

In another terminal, cd into the cloned dir as well and run:
`$ node app`


Check it out:
`http://localhost:3000` --> express should be running!


Create a new container:
`http://localhost:3000/create?lat=[latitude]&lng=[longitude]&level=[filling level]`  
(latitude and longitude in decimal notation, level is optional)


Show a container:
`http://localhost:3000/show?id=[container ID]`


Show all the containers:
`http://localhost:3000/containers`


Modify the filling level of a container:
`http://localhost:3000/update?id=[container ID]&level=[filling level]`


Delete a container from de data base:
`http://localhost:3000/delete?id=[container ID]`

