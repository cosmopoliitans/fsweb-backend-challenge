const db = require("../../data/db-config.js");

// "users" tablosu için model işlemleri
function getAllUsers() {
  return db("users");
}

function getUserById(user_id) {
  return db("users").where("user_id", user_id);
}
function getUserByName(user_name) {
  return db("users").where("user_name", user_name);
}

async function createUser({ user_name, user_password, user_email }) {
  let created_user_id;
  await db.transaction(async (trx) => {
    const [user_id] = await trx("users").insert({
      user_name,
      user_password,
      user_email,
    });
    created_user_id = user_id;
  });
  return getUserById(created_user_id);
}

// "tweets" tablosu için model işlemleri

function getAllTweets() {
  return db("tweets");
}

function getTweetById(user_id) {
  return db("tweets").where("user_id", user_id).first();
}

async function createTweet(tweet) {
  const [insertedId] = await db("tweets").insert(tweet);
  const inserted = await db("tweets").where("tweets_id", insertedId).first();
  return inserted;
}

function removeTweet(tweets_id) {
  return db("tweets").where("tweets_id", Number(tweets_id)).del();
}

module.exports = {
  getAllUsers,
  createUser,
  getAllTweets,
  getTweetById,
  createTweet,
  removeTweet,
  getUserById,
  getUserByName,
};
