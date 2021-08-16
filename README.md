# Change-a-Life

Change-a-life help create a personal connection between people facing homelessness and people who are willing to help change lives. Site provides mini biography about the homeless person and what they are in need of at the moment. Willing donors are able to buy the exact item from their wishlist and send it to the shelter or to a nearby amazon locker, donate money directly to the person, or make a donation to the homeless shelter. Paypal API will be used to to process payments. 

## User flow
Users will be greeted with a carasoul that contains a most recent success story made possible because of a donation. Below that, there will be cards of each homeless personal with a highlight sentence, their basic infomration, and their photo. Users can click on the card and read the mini biography in detail, and choose a donation option.

### List of API
* Paypal - https://developer.paypal.com/docs/business/ 

### Tentative Schema Model

#### Shelter Table

|id|Name|St. Address|City|State|Email|Phone Number
|--|------|-----|-----------|----------|----------|----
|1|Butler County Shelter|1111 E. Main St|Hamilton|Ohio|bch@butlercounty.org|513-111-1212

#### Person Table

|id|Name|image|Age|Highlight
|--|------|-----|-----------|----------
|1|John Doe| https://image.com|54|A test

#### Summary Table

|id|Person_id|biography
|--|------|-----
|1|1|Multiple situations lead to homelessness

#### Wishlist Table

|id|Person_id|Wish
|--|------|-----
|1|1|A Warm Sweater
___

Tools Used:
* Frontend: React, Bootstrap
* Backend: Node/Express.js
* Database: postgreSQL
