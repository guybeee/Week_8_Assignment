/*
Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
Use at least one array.
Use at least two classes.
Your menu should have the options to create, view, and delete elements
*/


// Shopping List
class ShoppingList {
    constructor(item, quantity) {
        this.item = item
        this.quantity = quantity
    }

    describe() {
        return `${this.quantity} ${this.item} is added to the shopping.`
    }
}


class Lists {
    constructor(name) {
        this.name = name;
        this.item = [];
    }

    describe() {
        return `${this.name} has ${this.item.length} items in the shopping list.`;
    }

    addItem(item) {
        if (item instanceof ShoppingList) {
            this.item.push(item);
        } else {
            throw new Error(`You can only add an instance of ShoppingList. Argument is not an item; ${item}`);
        }
    }
}


class Menu {
    constructor() {
        this.category = []
        this.selectedCategory = null
    }
    start() {
        let selection= this.showMainMenuOptions()
        while (selection !== '0') {
            switch (selection) {
                case '1':
                    this.createShoppingList();
                    break;
                case '2':
                    this.viewShoppingList();
                    break;
                case '3':
                    this.deleteShoppingList();
                    break;
                case '4':
                    this.displayShoppingList();
                    break;
                default:
                    selection = '0';
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new shopping list
        2) view a shopping lists
        3) delete a shopping list
        4) display all shopping list`)
    }

    showShoppingMenuOptions(shoppingInfo) {
        return prompt(`
        0) back
        1) add new item
        2) delete item
        -----------------
        ${shoppingInfo}
        `)
    }
    
    displayShoppingList() {
        let shoppingString = '';
        for (let i = 0; i < this.category.length; i++) {
            shoppingString += i + ') ' + this.category[i].name + '\n';
        }
        alert(shoppingString);
    }

    createShoppingList() {
        let name = prompt('Enter name for new shopping list: ');
        this.category.push(new Lists(name));
    }

    viewShoppingList() {
        let index = prompt("Enter the index of the shopping list that you want to view:");
        if (index > -1 && index < this.category.length) {
            this.selectedCategory = this.category[index];
            let description = 'Shopping Name: ' + this.selectedCategory.name + '\n';
            description += ' ' + this.selectedCategory.describe() + '\n ';
            for (let i = 0; i < this.selectedCategory.item.length; i++) {
                description += i + ') ' + this.selectedCategory.item[i].describe() + '\n';
            }
            let selection1 = this.showShoppingMenuOptions(description);
            switch (selection1) {
                case '0':
                    // Go back
                    break;
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
                    break;
            }
        } // validate user input
    }

    deleteShoppingList() {
        let index = prompt('Enter the index of the shopping list that you wish to delete: ');
        if (index > -1 && index < this.category.length) {
            this.category.splice(index, 1);
        }
    }

    createItem() {
        let name = prompt('Enter name for new item: ');
        let quantity = prompt('Enter the quantity of the item: ');
        this.selectedCategory.addItem(new ShoppingList(name, quantity));
    }

    deleteItem() {
        let index = prompt('Enter the index of the item you wish to delete: ');
        if (index > -1 && index < this.selectedCategory.item.length) {
            this.selectedCategory.item.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();



