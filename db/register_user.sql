INSERT INTO devmerch_users (username, firstname, lastname, password) 
values($1, $2, $3, $4)
RETURNING *;