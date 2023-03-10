/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from "@solana/web3.js";
import * as beet from "@metaplex-foundation/beet";
import * as beetSolana from "@metaplex-foundation/beet-solana";
import { Position, positionBeet } from "../types/Position";

/**
 * Arguments used to create {@link Prediction}
 * @category Accounts
 * @category generated
 */
export type PredictionArgs = {
  game: web3.PublicKey;
  position: Position;
  amount: beet.bignum;
  claimed: boolean;
};

export const predictionDiscriminator = [98, 127, 141, 187, 218, 33, 8, 14];
/**
 * Holds the data for the {@link Prediction} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Prediction implements PredictionArgs {
  private constructor(
    readonly game: web3.PublicKey,
    readonly position: Position,
    readonly amount: beet.bignum,
    readonly claimed: boolean
  ) {}

  /**
   * Creates a {@link Prediction} instance from the provided args.
   */
  static fromArgs(args: PredictionArgs) {
    return new Prediction(args.game, args.position, args.amount, args.claimed);
  }

  /**
   * Deserializes the {@link Prediction} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [Prediction, number] {
    return Prediction.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Prediction} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<Prediction> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    );
    if (accountInfo == null) {
      throw new Error(`Unable to find Prediction account at ${address}`);
    }
    return Prediction.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      "43qTwSeRLWUWbibWhx7uQDp61R5e9P4RNUAabE3ow1Co"
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, predictionBeet);
  }

  /**
   * Deserializes the {@link Prediction} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Prediction, number] {
    return predictionBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link Prediction} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return predictionBeet.serialize({
      accountDiscriminator: predictionDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Prediction}
   */
  static get byteSize() {
    return predictionBeet.byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Prediction} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      Prediction.byteSize,
      commitment
    );
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link Prediction} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === Prediction.byteSize;
  }

  /**
   * Returns a readable version of {@link Prediction} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      game: this.game.toBase58(),
      position: "Position." + Position[this.position],
      amount: (() => {
        const x = <{ toNumber: () => number }>this.amount;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      claimed: this.claimed,
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const predictionBeet = new beet.BeetStruct<
  Prediction,
  PredictionArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["accountDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["game", beetSolana.publicKey],
    ["position", positionBeet],
    ["amount", beet.u64],
    ["claimed", beet.bool],
  ],
  Prediction.fromArgs,
  "Prediction"
);
