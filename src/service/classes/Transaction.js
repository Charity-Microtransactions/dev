module.exports = class Transaction {
    constructor (id, from_id, to_id, amount, date){
        this.id = id;
        this.from_id = from_id;
        this.to_id = to_id;
        this.amount = amount;
        this.date  = date;
    }
}
