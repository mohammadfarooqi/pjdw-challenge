Instructions

1. IMPORTANT - have Postgres running
2. Create .env file 
```
sample .env file
PORT=4000
NODE_ENV=development
APP_SECRET=mysuperperduppersecret123
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASS=Pass2020!
DB_NAME=pjdw
DB_URL=postgres://postgres:Pass2020!@127.0.0.1:5432/pjdw
DB_DEBUG=false
APOLLO_KEY=service:pjdw:P769Zy68v67QM32CysBdiQ
```
3. Run `npm i` in root folder
4. `cd` to `client` folder and run `npm i`
5. `cd` back to root folder
4. Run `db:migrate:latest`
5. Run `db:seed:run`
6. Run `npm run dev`... this will start the react app and server

Backend:
- All routes have been implemented

Frontend:
- All tasks implemented

Test:
- Not implemented

GraphQL playground query for reference
```
# User

query LoginUser {
  login(email: "mohammad@abc.com") {
    user {
      id
      firstName
      lastName
      email
    }
    token
  }
}

query GetAllUsers {
  # users(first: 1, skip: 2) {
  #   id
  #   firstName
  #   lastName
  #   email
  # }
  
  users {
    id
    firstName
    lastName
    email
  }
}

# Product

query GetProductById {
  getProduct(id: "09d8963a-3319-4e94-aa15-a3038a62faf0") {
    id
    name
    description
    price
    image
  }
}

query GetAllProducts {
  getAllProducts {
    id
    name
    description
    price
    image
  }
}

mutation InsertProduct {
  insertProduct(name: "Teddy Bear 3", description: "This is a Teddy Bear for Kids", price: 2.23) {
    id
    name
    description
    price
    image
  }
}

mutation UpdateProduct {
  updateProduct(
    id: "bf36ff1b-eb71-467c-ace5-e554046099c3", 
    name: "Polar Bear", 
    description: "This was a Teddy Bear for Kids but is now a Polar Bear", 
    price: 22.97
  ) {
    id
    name
    description
    price
    image
  }
}

mutation DeleteProductById {
  deleteProduct(id: "0a331cd0-0efd-47e9-9e12-a2dbff62ac94") {
		success
  }
}

mutation UploadProductImage {
  uploadProductImage(
    id: "bf36ff1b-eb71-467c-ace5-e554046099c3", 
    image: "data:image/gif;base64,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"
  ) {
    id
    name
    description
    price
    image
  }
}

mutation AddProductToUser {
  addProductToUser(id: "33812943-75d6-40cc-8529-cc57fee08008") {
    success
    message
  }
}

mutation RemoveProductFromUser {
  removeProductFromUser(id: "0a965483-b00b-43df-a671-7278bb60958f") {
    success
    message
  }
}

query GetAllProductsForUser {
  # getAllProductsForUser {
  #   id
  #   name
  #   description
  #   price
  #   image
  # }
  
  getAllProductsForUser(id: "e366c3a0-f3fc-4f0d-bb71-fd1066bc3d09") {
    id
    name
    description
    price
    image
  }
}
```