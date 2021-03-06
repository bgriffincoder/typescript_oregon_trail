(function () {
    //create a random amount food between 0 and 100
    function getRandomIntInclusive(min, max) {
        var mininum = Math.ceil(min);
        var maximum = Math.floor(max);
        return (Math.floor(Math.random() * (maximum - mininum + 1) + mininum)); //The maximum is inclusive and the minimum is inclusive
    }
    //returns head or tails
    function coinFlip() {
        return (Math.floor(Math.random() * 2) == 0) ? "heads" : "tails";
    }
    /*
    * Classes
    */
    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    var Traveler = /** @class */ (function () {
        function Traveler(food, name, isHealthy) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }
        //There should be 50% chance to increase the traveler's food by 100. Return the travelers new food value
        Traveler.prototype.hunt = function () {
            var headOrTails = coinFlip();
            if (headOrTails == "heads") {
                this.food = this.food + 100;
            }
            return this.food;
        };
        ;
        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        Traveler.prototype.eat = function () {
            if (this.food >= 20) {
                this.food = this.food - 20;
            }
            else {
                this.isHealthy = false;
            }
            return this.isHealthy;
        };
        ;
        return Traveler;
    }());
    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    var Wagon = /** @class */ (function () {
        function Wagon(capacity) {
            this.capacity = capacity;
            this.passengerArray = [];
        }
        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        Wagon.prototype.addPassenger = function (traveler) {
            if (this.capacity > 0) {
                this.passengerArray.push(traveler);
                return traveler.name + " was added to the wagon!";
            }
            else {
                return "Sorry, the wagon is full!";
            }
        };
        ;
        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        Wagon.prototype.isQuarantined = function () {
            for (var i = 0; i < this.passengerArray.length; i++) {
                if (this.passengerArray[i].isHealthy == false) {
                    return true;
                }
            }
            return false;
        };
        ;
        //Return the total amount of food among all passengers of the wagon.
        Wagon.prototype.getFood = function () {
            var foodAmountTotal = 0;
            for (var i = 0; i < this.passengerArray.length; i++) {
                foodAmountTotal = foodAmountTotal + this.passengerArray[i].food;
            }
            return foodAmountTotal;
        };
        ;
        return Wagon;
    }());
    /*
    * Play the game
    *
    * Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    *
    * Create wagon with an empty passenger list and a capacity of 4.
    *
    * Make 3 of 5 the travelers eat by calling their eat methods
    *
    * Make the remaining 2 travelers hunt
    *
    * Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    * of attempting to be being added to the wagon using the wagons addPassenger method.
    *
    * Run the isQuarantined method for the wagon
    *
    * Run the getFood method for the wagon
    *
    * the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects
    *
    */
    //Create 5 healthy travelers
    var Jose = new Traveler(getRandomIntInclusive(0, 100), "Jose", true);
    var Bob = new Traveler(getRandomIntInclusive(0, 100), "Bob", true);
    var Mike = new Traveler(getRandomIntInclusive(0, 100), "Mike", true);
    var Tina = new Traveler(getRandomIntInclusive(0, 100), "Tina", true);
    var Jake = new Traveler(getRandomIntInclusive(0, 100), "Jake", true);
    //Create wagon with an empty passenger list and a capacity of 4.
    var myWagon = new Wagon(4);
    // Make 3 of 5 the travelers eat by calling their eat methods
    Jose.eat();
    Bob.eat();
    Mike.eat();
    //Make the remaining 2 travelers hunt
    Tina.hunt();
    Jake.hunt();
    // Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    // of attempting to be being added to the wagon using the wagons addPassenger method.
    var tempTravelerArray = [Jose, Bob, Mike, Tina, Jake];
    for (var i = 0; i < tempTravelerArray.length; i++) {
        if (myWagon.capacity > 0) {
            if (coinFlip() == "heads") {
                myWagon.addPassenger(tempTravelerArray[i]);
                myWagon.capacity = myWagon.capacity - 1;
            }
            else {
                console.log("Sorry! " + tempTravelerArray[i].name + " has terrible luck and can't be added to the wagon!");
            }
        }
    }
    //Show everyone's food amount
    console.log("Jose food = " + Jose.food);
    console.log("Bob food = " + Bob.food);
    console.log("Mike food = " + Mike.food);
    console.log("Tina food = " + Tina.food);
    console.log("Jake food = " + Jake.food);
    //Run the isQuarantined method for the wagon
    console.log("Is someone quarantined on the wagon? " + myWagon.isQuarantined());
    console.log("The total food left is on the wagon is: " + myWagon.getFood());
    //This is who is on the wagon
    var text = "";
    for (var i = 0; i < myWagon.passengerArray.length; i++) {
        text += myWagon.passengerArray[i].name + " ";
    }
    console.log("Who is on the wagon? " + text);
})();
