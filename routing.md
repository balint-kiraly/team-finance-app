GET /dashboard              -dashboard
GET /login                  -login
POST /login

GET /register               -register
POST /register

GET /forgotpw               -forgot pw
POST /forgotpw

GET /logout                 -logout
****
GET /team                   -team

POST /team/add
POST /team/del/:userid
****
GET /transactions           -transactions

GET /transaction/new        -new transaction
POST /transaction/new

GET /transaction/edit/:id   -edit transaction
POST /transaction/edit/:id

GET /transaction/del/:id -delete transaction