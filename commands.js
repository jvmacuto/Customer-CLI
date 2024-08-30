#!/usr/bin/env node

//import functions
const { Command } = require("commander");
const program = new Command();
const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();

//import from index
const {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
} = require("./index");

//customer questions
const questions = [
  {
    type: "input",
    name: "firstName",
    message: "Customer First Name",
  },
  {
    type: "input",
    name: "lastName",
    message: "Customer Last Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number",
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email Address",
  },
];

//version
program.version("1.0.0").description("Client Management System");

//add command
program
  .command("add")
  .alias("a")
  .description("Add a customer")
  .action(() => {
    prompt(questions).then((answers) => addCustomer(answers));
  });

//find command
program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => {
    findCustomer(name);
  });

//update command
program
  .command("update <_id>")
  .alias("u")
  .description("Update a customer")
  .action((_id) => {
    prompt(questions).then((answers) => updateCustomer(_id, answers));
  });

//remove command
program
  .command("remove <_id>")
  .alias("r")
  .description("Remove a customer")
  .action((_id) => {
    removeCustomer(_id);
  });

//list command
program
  .command("list")
  .alias("l")
  .description("List all customers")
  .action(() => {
    listCustomers();
  });

//parse the arguments
program.parse(process.argv);
