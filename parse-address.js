//import ReadLine from "readline";

import yargs from "yargs";
import { parseAddress } from "./src/AddressParser.js";

//read params from input

const params = yargs(process.argv.slice(2))
  .usage("Usage: $0 --address [string] --delimiter [string]")
  .command(
    "Attempts to parse a concatenated address (combined by a delimiter) into street, po box, city, state, postal code and country."
  )
  .describe("a", "Address value to parse")
  .describe("d", "Character value to split the address parts.")
  .alias("address", "a")
  .alias("delimiter", "d")
  .demandOption(["address", "delimiter"]).argv;

try {
  const address = params.address;
  const delimiter = params.delimiter;

  //split value on delimiter
  const finalAddress = parseAddress(address, delimiter);

  //log what we found
  if (Object.values(finalAddress))
    console.log("Address parsed: ", finalAddress);
} catch (error) {
  //console.error(error);
}

/* const delimeter = "*";

const readline = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
}); */

/* readline.question("Enter an address value to parse: ", (address) => {
  //split values
  const parts = address.split(delimeter);

  //attempt to break value down and identify address segements
  const finalAddress = parseAddress(parts);

  //log what we found
  if (Object.values(finalAddress))
    console.log("Address parsed: ", finalAddress);

  //close console reader
  readline.close();
}); */
