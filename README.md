# node.js-mysql

Bamazon Customer -
This project is taking mySQL and using node to read, update, add to, and display the database. It is an app for a store that displays items to the consumer and alows them to select items and buy them. When this is done the stock quantity for that item is updated. 

once the app is started the user has the display of all the items for sale, along with there price per item and the available in stock. The message asking if they would like to buy something or exit is also display with Buy and Exit as the choices.

![Step 1](./step1.jpg)

Selecting Buy will promt the user to put in the id of the product they would like to buy.

![What Item id](./id.jpg)

Then the user is asked how many they would like?

![How many](./howMany.jpg)

If nothing went wrong and there are enough available of said product the amount of the purchase is displayed with the product list again and asking if they would like to see the product list or Exit. Choosing the Product list option from here will start the whole process over. Exiting will end the app.

![Price and Option](./total.jpg)