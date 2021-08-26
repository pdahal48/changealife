# Change-a-Life
Change-a-life help create a personal connection between people facing homelessness and people who are willing to help change lives. Site provides mini biography about the homeless person and what they are in need of at the moment. Willing donors are able to buy the exact item from their wishlist and send it to their current shelter or donate money directly to the person. Paypal API is be used for payment processing. The main difference between this site and other crowd-sourcing web applications is that this one is dedicated to homeless people and noone else. At the moment, Shelter must be enrolled into the program first by contacting the developer with their information. This is to prevent fraudulent activities from people posing to be homeless. 

## How to use the service
If you are a homeless person, you must first sign up for the service. A page is created with your information provided during the signup process. If your shelter is not on the list, send me an email and I will contact your shelter and encourage them to enroll. After you login, if you click on preferences tab, you can report a success story, edit your profile or logout. 

if you are a donor, you can find all the enrolled users in People page. You are able to see their highlight explaining their situation in a few sentences. If you click on their card, you are able to read
about their information in detail. You can also see what they are in need of at the moment and their shelter information. You can also donate directly to them. Payment are processed by PayPal. 

## User flow
Users will land on a home page containing a carasoul that contains three most recent signed up users. You can click on user to be directed to their page. Below the carousel, You can read about all the success stories and more reasons to make a donation that may possibly change a life. 

### External Services
* Paypal for payment processing - https://developer.paypal.com/docs/business/
* AWS S3 Bucket - for image storage

### Schema Model

#### User Table

|username|password|fullName|city|state|age|highlight|bio|phone|email|shelter|is_admin|is_creator
|--|--|--|--|--|--|--|--|--|--|--|--|--|
|Jdoe0| hashedPassword1!|John Doe|New York|New York|100|a sample highlight|a sample bio|3150001111|sample@gmail.com|New York Shelter|false|false

#### Shelter Table

|id|Name|St. Address|City|State|Email|Phone Number
|--|------|-----|-----------|----------|----------|----
|1|Butler County Shelter|1111 E. Main St|Hamilton|Ohio|bch@butlercounty.org|513-111-1212

#### Image Table

|id|user_username|src
|--|------|-----
|1|jdoe0|/images/1

#### Wishlist Table

|id|user_username|Wish
|--|------|-----
|1|jdoe0|A Warm Sweater

#### Success Story Table

|id|user_username|story
|--|------|-----
|1|jdoe0|A sample success story

#### Shelter_users Table

|id|user_username|shelter_name
|--|------|-----
|1|jdoe0|New York Shelter
___

## Notes for Developers: 
This app is created using Node.js for the backend and react.js for the frontend. If you would like to clone and run the app on you local server. feel free to do so. 

* Clone the repository and do npm i or npm install to install the needed dependencies
* To start the backend server, cd to backend and run npm start
    * server starts on localhost 3001
* To start the frontend server, cd to Frontend/cal and run npm start
    * server starts on localhost 3000
* To run tests, do npm test `<filename>`

## At this point, this is only a model and still in development. Access the app at - change-a-life.surge.sh

Tools Used:
* Frontend: React, Bootstrap
* Backend: Node/Express.js
* Database: postgreSQL
