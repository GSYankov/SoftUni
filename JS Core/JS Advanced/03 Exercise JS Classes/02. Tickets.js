function solve(tickets, sortCriterion) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let ticketDb = [];
    tickets.forEach(t => {
        let ticketData = t.split('|');
        let destination = ticketData[0];
        let price = Number(ticketData[1]);
        let status = ticketData[2];

        let ticket = new Ticket(destination, price, status);
        ticketDb.push(ticket);
    });

    ticketDb.sort((a, b) => {
        let valueA = a[sortCriterion];
        let valueB = b[sortCriterion];
        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    return ticketDb;
}

console.log(solve(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'status'
));