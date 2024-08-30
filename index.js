const mongoose = require("mongoose");

//map global promise - remove warning
mongoose.Promise = global.Promise;

//connect to db
mongoose
  .connect("mongodb://localhost:27017/customercli")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//import model
const Customer = require("./models/customer");

//add customer
const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info("New Customer Added");
    mongoose.connection.close();
  });
};

//find customer
const findCustomer = (name) => {
  //make case insensitive
  const search = new RegExp(name, "i");
  Customer.find({ $or: [{ firstName: search }, { lastName: search }] }).then(
    (customer) => {
      console.info(customer);
      console.info(`${customer.length} matches`);
      mongoose.connection.close();
    }
  );
};

//update customer
const updateCustomer = (_id, customer) => {
  Customer.findByIdAndUpdate({ _id }, customer).then((customer) => {
    console.info("Customer Updated");
    mongoose.connection.close();
  });
};

//remove customer
const removeCustomer = (_id) => {
  Customer.deleteOne({ _id }).then((customer) => {
    console.info("Customer Removed");
    mongoose.connection.close();
  });
};

//list all customer
const listCustomers = () => {
  Customer.find().then((customers) => {
    console.info(customers);
    console.info(`${customers.length} customers`);
    mongoose.connection.close();
  });
};

//export all methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
};
