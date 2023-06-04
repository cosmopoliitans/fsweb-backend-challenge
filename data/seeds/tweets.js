/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex("users").truncate();
  await knex("tweets").truncate();

  const defaultUsers = [
    {
      user_name: "ajdarius",
      user_email: "octopusshead@gmail.com",
      user_password: "14021995",
    },
    {
      user_name: "burcu",
      user_email: "burcu@gmail.com",
      user_password: "123456",
    },
    {
      user_name: "ayşen",
      user_email: "aysen@gmail.com",
      user_password: "1234",
    },
  ];

  const defaultTweets = [
    {
      img_url:
        "https://media.licdn.com/dms/image/D4D03AQGTCzXqbA1F4w/profile-displayphoto-shrink_800_800/0/1684492838144?e=2147483647&v=beta&t=cL5-NVIWCQCu36qtFhoTCZmjrCF6hLOLXd6pUa3kLFs",
      user_name: "ajdarius",
      body: "Dışarı çıkmak için kötü bir gün!",
      user_id: "1",
    },
    {
      img_url:
        "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png",
      user_name: "burcu",
      body: "Hava çok sıcakkkk!!!!",
      user_id: "2",
    },
    {
      img_url:
        "https://img.favpng.com/14/6/3/computer-icons-user-profile-avatar-woman-png-favpng-YdKuA8GaKJMLBvX70sbctFDSh.jpg",
      user_name: "burcu",
      body: "Yazılım öğrenmek çok keyifli,fakat zor :)",
      user_id: "2",
    },
    {
      img_url:
        "https://i4.hurimg.com/i/hurriyet/75/750x422/62dc5c5b4e3fe0161830f255.jpg",
      user_name: "ayşen",
      body: "Geleceğin yazılımcı kadını yetişiyor!!!",
      user_id: "3",
    },
  ];

  await knex("users").insert(defaultUsers);
  await knex("tweets").insert(defaultTweets);
};
