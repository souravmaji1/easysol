import TelegramBot from 'node-telegram-bot-api';
import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import  "@solana/web3.js";
import secret from './guideSecret.json'  assert { type: "json" };



const bot = new TelegramBot('7031888930:AAHYPmAoHwGe5aD-37gvsKNLVuBKY1V44v4', {polling: true});
const umi = createUmi('https://solana-devnet.g.alchemy.com/v2/8PNaJLE8wbJnsfMw5fcR3r5crppkfREI'); //Replace with your QuickNode RPC Endpoint

const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);



// Command handler for creating a new token
bot.onText(/\/createtoken/, async (msg) => {
    const chatId = msg.chat.id;
  
    try {
      
      // Prompt the user for token details
      await bot.sendMessage(chatId, 'Please provide the token name:');
      const tokenName = (await getMessage(chatId)).text;
  
      await bot.sendMessage(chatId, 'Please provide the token symbol (e.g., XYZ):');
      const tokenSymbol = (await getMessage(chatId)).text;
  
      await bot.sendMessage(chatId, 'Please provide the number of decimal places (0-9):');
      const decimals = parseInt((await getMessage(chatId)).text);
  
      await bot.sendMessage(chatId, 'Please provide the initial supply:');
      const initialSupply = parseInt((await getMessage(chatId)).text);

      
  

const metadata = {
  name: tokenName,
  symbol: tokenSymbol,
  uri: "ipfs://bafyreifrkkhbwkf3fibwhbzcmpqnmh3b4t5t4ig7qdtymkdoatcycwe6n4/metadata.json",
  amount: initialSupply,
  decimals: decimals,
};

const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplCandyMachine())

createAndMint(umi, {
  mint,
  authority: umi.identity,
  name: metadata.name,
  symbol: metadata.symbol,
  uri: metadata.uri,
  sellerFeeBasisPoints: percentAmount(0),
  decimals: metadata.decimals,
  amount: metadata.amount,
  tokenOwner: userWallet.publicKey,
  tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi).then(() => {
  console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
});

  //amount: 1000000_00000000
      // Send the token information to the user
      await bot.sendMessage(
        chatId,
        `New token created:\nName: ${metadata.name}\nSymbol: ${metadata.symbol}\nMint Address: ${mint.publicKey}`
      );
    } catch (error) {
      console.error(error);
      await bot.sendMessage(chatId, 'Error creating the token. Please try again later.');
    }
  });
  
  // Helper function to get the next message from the user
  async function getMessage(chatId) {
    return new Promise((resolve) => {
      bot.once('message', (msg) => {
        if (msg.chat.id === chatId) {
          resolve(msg);
        }
      });
    });
  }

