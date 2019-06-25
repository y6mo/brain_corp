Hi! Welcome to my implementation on Passwd as a service. 

Setup: 
1. Type in terminal the following command: git clone https://github.com/y6mo/brain_corp.git
2. cd into the cloned directory: cd brain_corp
3. install dependencies: npm install

To run:
1. Type in terminal: node app.js
2. go to browser and use link: http://localhost:3000/ (* NOTE: this home link has no route)
3. use http requests below

To use / commands (same as outlined in assignment instructions):
1. return all users: 
   http://localhost:3000/users 
2. return all users with matching parameters: 
   http://localhost:3000/users/query?[name=<nq>][&uid=<uid>][&gid=<gid>][&comment=<cq>][&home=<hq>][&shell=<sq>]
3. return user with uid: 
   http://localhost:3000/<uid> 
4. return groups a user is in: 
   http://localhost:3000/<uid>/groups
5. return all groups:
   http://localhost:3000/groups
6. return groups with matching parameters:
   http://localhost:3000/groups/query?[name=<nq>][&gid=<gid>][&member=<mq1>][&member=<mq2>... (any # of members)
7. return group with gid:
   http://localhost:3000/groups/<gid>
   
   

