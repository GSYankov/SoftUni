const Warehouse = require("./Warehouse");

const expect = require("chai").expect;
const assert = require('chai').assert;

describe('Warehouse', function () {

    describe('Constructor', function () {
        it('Constructor returns a message if called with negative value', function () {
            assert.throw(() => new Warehouse(-1), "Invalid given warehouse space")
        });

        it('Constructor returns a message if called with NaN', function () {
            assert.throw(() => new Warehouse(-1), "Invalid given warehouse space")
        })
    });

    describe('Function addProduct', function () {
        it('Returns particular message if no space available', function () {
            let warehouse = new Warehouse(1);
            assert.throw(() => warehouse
                .addProduct('Food', 'Soda', 5), "There is not enough space or the warehouse is already full")
        });

        it('Captures the added product', function () {
            let warehouse = new Warehouse(10);
            let prodType = 'Drink';
            let product = 'Soda';
            let quantity = 5;
            warehouse.addProduct(prodType, product, quantity);

            assert(warehouse.availableProducts[prodType].hasOwnProperty(product))
        });

        it('Sums same product quantity', function () {
            let warehouse = new Warehouse(10);
            let prodType = 'Drink';
            let product = 'Soda';
            let quantity = 3;
            warehouse.addProduct(prodType, product, quantity);
            warehouse.addProduct(prodType, product, 5);

            assert.equal(warehouse.availableProducts[prodType][product], 8)
            assert.equal(warehouse.addProduct(prodType, product, 1).toString(), {"Soda": 9});
        });
    });

    describe('Function orderProducts', function () {
        it('Sorts all products of a given type in descending order by the quantity', function () {
            let warehouse = new Warehouse(10);
            warehouse.addProduct('Drink', 'Soda', 2);
            warehouse.addProduct('Drink', 'Coke', 3);
            warehouse.addProduct('Food', 'Pizza', 5);
            warehouse.orderProducts('Drink');
            assert.deepEqual(warehouse.availableProducts['Drink'],{ Coke: 3, Soda: 2 });
        })
    });

    describe('Function occupiedCapacity', function () {
        it('Returns a number, which represents the already occupied place in the warehouse',function () {
            let warehouse = new Warehouse(11);
            warehouse.addProduct('Drink', 'Soda', 2);
            warehouse.addProduct('Drink', 'Coke', 3);
            warehouse.addProduct('Food', 'Pizza', 5);

            assert.equal(warehouse.occupiedCapacity(),10);
        })
    });

    describe('Function revision',function () {
        it('Returns particular output',function () {
            let warehouse = new Warehouse(11);
            warehouse.addProduct('Drink', 'Soda', 2);
            warehouse.addProduct('Drink', 'Coke', 3);
            warehouse.addProduct('Food', 'Pizza', 5);

            assert.equal(warehouse.revision(),'Product type - [Food]\n- Pizza 5\nProduct type - [Drink]\n- Soda 2\n- Coke 3')
        });

        it('Returns a particular string if the warehouse is empty',function () {
            let warehouse = new Warehouse(2);
            warehouse.addProduct('Drink', 'Soda', 2);
            warehouse.scrapeAProduct( 'Soda', 2);
            assert.equal(warehouse.revision(),'The warehouse is empty')
        });
    });

    describe('Function scrapeAProduct', function () {
        it('reduce his quantity, otherwise it resets it. ',function () {
            let warehouse = new Warehouse(11);
            warehouse.addProduct('Drink', 'Coke', 3);
            warehouse.addProduct('Drink', 'Soda', 3);
            warehouse.scrapeAProduct('Soda',4);
            warehouse.scrapeAProduct('Soda',2);
            warehouse.scrapeAProduct('Coke',2);

            assert.equal(warehouse.availableProducts['Drink']['Soda'],0);
        });
    });
});