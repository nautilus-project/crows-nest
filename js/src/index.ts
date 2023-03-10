import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { NautilusQuery, NautilusTable } from "./sql";

export class Nautilus {
  connection: Connection;
  program: PublicKey;
  generated: any | null = null;
  tables: string[] = [];

  private queryTable: string | null = null;
  private queryFilters: any[] = [];
  private queryInsert: object | null = null;
  private querySigner: PublicKey | null = null;

  constructor(
    connection: Connection,
    program: PublicKey,
    generated: any,
    tables: string[]
  ) {
    this.connection = connection;
    this.program = program;
    this.generated = generated;
    this.tables = tables;
  }

  signer(signer: PublicKey) {
    this.querySigner = signer;
    return this;
  }

  where(tableName: string) {
    if (!this.tables.includes(tableName)) {
      throw new Error("Invalid table name");
    }
    this.queryTable = tableName;
    return this;
  }

  async get(): Promise<any> {
    if (!this.queryTable) {
      throw new Error("Must use where before get");
    }
    const gpaBuilder = await this.generated[this.queryTable]
      .gpaBuilder(this.program)
      .addFilter(
        "accountDiscriminator",
        this.generated[this.queryTable.toLowerCase() + "Discriminator"]
      );
    console.log(gpaBuilder);
    for (const filter of this.queryFilters) {
      gpaBuilder.addFilter(filter.arg1, filter.arg2);
    }
    const data = await gpaBuilder.run(this.connection);
    // @ts-ignore
    const accounts = data.map((d) => {
      // @ts-ignore
      const value = this.generated[this.queryTable].fromAccountInfo(
        d.account
      )[0];
      return { data: value, pubkey: d.pubkey };
    });
    return Promise.resolve(accounts);
  }

  eq(arg1: any, arg2: any) {
    if (!this.queryTable) {
      throw new Error("Must use where before eq");
    }
    this.queryFilters.push({
      arg1: arg1,
      arg2: arg2,
    });
    return this;
  }
  instruction(): TransactionInstruction {
    if (!this.queryTable) {
      throw new Error("Must use where before instruction");
    }
    if (!this.queryInsert) {
      throw new Error("Must use insert before instruction");
    }
    const [pda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(this.queryTable.toLowerCase()),
        // @ts-ignore
        Uint8Array.of(19),
      ],
      this.program
    );
    const instruction = this.generated.createCreateGameInstruction(
      {
        game: pda,
        signer: this.querySigner,
      },
      this.queryInsert
    );
    return instruction;
  }
  insert(data: object) {
    if (!this.queryTable) {
      throw new Error("Must use where before insert");
    }
    if (this.queryInsert) {
      throw new Error("Cannot insert multiple times");
    }
    this.queryInsert = data;
    return this;
  }
  sql(query: string) {
    return new NautilusQuery(this, query);
  }
}
