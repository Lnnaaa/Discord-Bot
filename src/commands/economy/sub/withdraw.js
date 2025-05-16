const { EmbedBuilder } = require("discord.js");
const { getUser } = require("@schemas/User");
const { EMBED_COLORS, ECONOMY } = require("@root/config");

module.exports = async (user, coins) => {
  if (isNaN(coins) || coins <= 0) return "Please enter a valid amount of coins to deposit";
  const userDb = await getUser(user);

  if (coins > userDb.bank) return `You only have ${userDb.bank}${ECONOMY.CURRENCY} coins in your bank`;

  userDb.bank -= coins;
  userDb.coins += coins;
  await userDb.save();

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setAuthor({ name: "New Balance" })
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      {
        name: "Wallet💵",
        value: `${userDb.coins}${ECONOMY.CURRENCY}`,
      },
      {
        name: "Bank🏦",
        value: `${userDb.bank}${ECONOMY.CURRENCY}`,
      },
      {
        name: "Net Worth💰",
        value: `${userDb.coins + userDb.bank}${ECONOMY.CURRENCY}`,
      }
    );

  return { embeds: [embed] };
};
