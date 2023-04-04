# China-Market-Ecommerce

# ECommerce Website

![image](https://user-images.githubusercontent.com/115584175/229658391-ab227bd2-d831-4014-ab34-5fd93642e8e0.png)

![image](https://user-images.githubusercontent.com/115584175/229658538-eef55d90-77ed-44fb-a514-cf9771793929.png)
![image](https://user-images.githubusercontent.com/115584175/229658617-e4d6e09f-3019-4478-96c9-13feac99d3c8.png)
![image](https://user-images.githubusercontent.com/115584175/229658704-b2e0f1fd-7158-4d02-aee3-52cc38e01c4c.png)
![cart](https://user-images.githubusercontent.com/115584175/229658761-188bc71d-288a-4ec3-843b-ed002489630b.png)
![checkout](https://user-images.githubusercontent.com/115584175/229658798-44d3773a-8b8e-4313-a48a-186dbc2d1c6a.png)

![user card](https://user-images.githubusercontent.com/115584175/229658976-88783237-b313-426a-9bec-5ca3e9dc5ccd.png)


## Demo Website

- 👉 Render : [https://china-market.onrender.com/](https://china-market.onrender.com/)



## Run Locally

### 1. Clone repo

```
$ git clone https://github.com/Mohammad-Mubarak/China-Market-Ecommerce
```

### 2. Setup MongoDB
 - Download and Install it from [mongodb.com](https://www.mongodb.com/try/download/community)

### 3. Create .env file
- Create .env file in project folder
- Enter these lines to that:

```
PORT = 3000
MONGO_DB_URL=mongodb://127.0.0.1:27017/ecommerceproject
JWT_EXPIRY=2h
JWT_SECRET=
CLOUD_NAME=
CLOUD_API=
CLOUD_SECRET=

Mail_Host=
Mail_PORT=
Mail_User =
Mail_Pass=
```



### 4. Run Project

```
# open new terminal
$ npm install
$ node index.js
```





## Features

- ## User Authentication
- Users can register and login to access the website's features.
- If a user forgets their password, they can reset it using the forgot password functionality.
- Users can update their password, name, email, and profile picture.



- ## Shopping Cart
- Users can add products to their shopping cart and proceed to checkout. 
- The website provides a shopping cart feature that allows users to view the products in their cart and remove any products they no longer wish to purchase.
- Users can update their password, name, email, and profile picture.



- ## Admin Controls
- An admin can manage and control the users on the website. 
- The admin can update a user's information, such as their name, and email.
- The admin can also see a list of all registered users.


- ## Protected Routes
- Certain routes on the website are protected and can only be accessed by authenticated users.
- This includes the shopping cart, user profile, and checkout pages.
- If a user attempts to access these pages without logging in, they will be redirected to the login page.


## Tech Stack

**Client:** Ejs, CSS,HTML, TailwindCSS

**Server:** Node, Express ,MONGODB,Moongose


