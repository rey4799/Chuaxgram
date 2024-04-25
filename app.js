



//npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,Role:string



//Users-id-username:string (optional)-email:string  (validation: required, uniq, email format)-password:string  (validation: required, length min 8)-Role:string (validation: in [‘buyer’, ‘seller’])



//    npx sequelize model:generate --name Profile --attributes fullName:string,bio:string,avatarUrl