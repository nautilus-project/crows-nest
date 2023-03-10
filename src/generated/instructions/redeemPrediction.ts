/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category RedeemPrediction
 * @category generated
 */
export const redeemPredictionStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'RedeemPredictionInstructionArgs'
)
/**
 * Accounts required by the _redeemPrediction_ instruction
 *
 * @property [_writable_, **signer**] signer
 * @property [_writable_] prediction
 * @property [_writable_] game
 * @property [] clock
 * @category Instructions
 * @category RedeemPrediction
 * @category generated
 */
export type RedeemPredictionInstructionAccounts = {
  signer: web3.PublicKey
  prediction: web3.PublicKey
  game: web3.PublicKey
  clock: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const redeemPredictionInstructionDiscriminator = [
  21, 59, 216, 14, 130, 202, 41, 27,
]

/**
 * Creates a _RedeemPrediction_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category RedeemPrediction
 * @category generated
 */
export function createRedeemPredictionInstruction(
  accounts: RedeemPredictionInstructionAccounts,
  programId = new web3.PublicKey('2gUBz87HJU1w1JWWvNnZ7yjWHJZLhABdj1NrmAUU2A2z')
) {
  const [data] = redeemPredictionStruct.serialize({
    instructionDiscriminator: redeemPredictionInstructionDiscriminator,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.signer,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.prediction,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.game,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.clock,
      isWritable: false,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
