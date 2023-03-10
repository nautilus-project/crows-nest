import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { Nautilus } from "../../js/src/index";

import * as Generated from "./generated";

//
// Deploy test program before executing
//
export const CONNECTION = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

export const PROGRAM_ID = new PublicKey(
  "2gUBz87HJU1w1JWWvNnZ7yjWHJZLhABdj1NrmAUU2A2z"
);

function createKeypairFromFile(path: string): Keypair {
  return Keypair.fromSecretKey(
    Buffer.from(JSON.parse(require("fs").readFileSync(path, "utf-8")))
  );
}

const keypair1 = createKeypairFromFile(
  require("os").homedir() + "/.config/solana/testkeypair1.json"
);

const nautilus = new Nautilus(CONNECTION, PROGRAM_ID, Generated, [
  "Game",
  "Prediction",
]);

async function test() {
  const tx = new Transaction();
  const ix = nautilus
    .where("Game")
    .insert({ id: 21 })
    .signer(keypair1.publicKey)
    .instruction();
  tx.add(ix);
  const signature = await sendAndConfirmTransaction(CONNECTION, tx, [keypair1]);
  console.log(signature);
}

async function test2() {
  const data = await nautilus.where("Game").get();
  console.log(data);
}

test();
test2();
