const db = require("./data/db-config");
const request = require("supertest");
const server = require("./api/server");


afterAll(async () => {
// tüm testler tamamlandıktan sonra çalıştırılacak bir işlevi tanımlamanızı sağlar
  await db.destroy();
}); 


//veritabanını temizler, günceller ve başlangıç verileriyle doldurur.
beforeEach(async () => {
  //her bir testin başlamadan önce veritabanındaki tüm migrasyonları geri alarak temiz bir başlangıç yapmayı sağlar
  await db.migrate.rollback();
  //en son migrasrasyonu uygular
  await db.migrate.latest();
  // veritabanına başlangıç verilerini eklemeyi hedefler
  await db.seed.run();
});

describe("POST /register", () => {
  test("[1] yeni kullanıcı oluşuyor mu", async () => {
    // Kullanıcı kayıt için gönderilecek örnek veri
    const userData = {
      user_name: "John Doe",
      user_password: "password123",
      user_email: "john@example.com",
    };

    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    // İsteğin döndürdüğü yanıtın kontrolü
      expect(actual.status).toBe(201);
      expect(actual.body[0]).toHaveProperty("user_name", "John Doe");
      expect(actual.body[0]).toHaveProperty("user_email", "john@example.com");
  });

  test("[2] post methodunda olmayan alan hata döndürüyor mu", async () => {
    //arrange
    const userData = {
      user_name: "William"
    };
    //act
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);
    //assert
    expect(actual.status).toBe(500);
  });
});

// describe("Tweets testleri", () => {
//     test("[1] Get ile tüm tweetler geliyor mu?", async () => {
//        //act
//         const allTweets = await request(server).get("/api/users/")
//         //assert
//         expect(allTweets.statusCode).toBe(200)
//         expect(allTweets.body.length).toBe(4)

//    })
// })