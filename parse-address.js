import yargs from "yargs";
import { parseAddress } from "./src/AddressParser.js";

let params;

try {
  params = yargs(process.argv.slice(2))
    .usage("Usage: $0 -a -d")
    .example('$0 -a "1234 Main St*PO Box 99*Anytown*NY*10001*US -d "*"')
    .example('$0 -a "1234 Main St,PO Box 99,Anytown,NY,10001,US -d ","')
    .example('$0 -a "1234 Main St|PO Box 99|Anytown|NY|10001|US -d "|"')
    .help("h")
    .alias("h", "help")
    .alias("version", "v")
    .alias("a", "address")
    .alias("d", "delimiter")
    .describe("a", "An concatenated address value joined by a delimiter")
    .describe("d", "The delimiter character for the address value")
    .demandOption("a")
    .demandOption("d").argv;
} catch (error) {
  console.error(
    "Error",
    "Invalid parameters: Please check your input values again"
  );
}

try {
  const delimiter = params.delimiter;
  const address = params.address;

  const result = parseAddress(address, delimiter);
  console.log("Parsed Address", result);
} catch (error) {
  console.log(
    "Error",
    "An error occured while attempting to parse address value."
  );
}
