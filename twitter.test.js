const db = require("./data/db-config");
const request = require("supertest");
const server = require("./api/server");


afterAll(async () => {
// tüm testler tamamlandıktan sonra çalıştırılacak bir işlevi tanımlamanızı sağlar
  await db.destroy();
}); 


//veritabanını temizler, günceller ve başlangıç verileriyle doldurur.
beforeAll(async () => {
  //her bir testin başlamadan önce veritabanındaki tüm migrasyonları geri alarak temiz bir başlangıç yapmayı sağlar
  await db.migrate.rollback();
  //en son migrasrasyonu uygular
  await db.migrate.latest();
  // veritabanına başlangıç verilerini eklemeyi hedefler
  await db.seed.run();
});

describe("POST /register ve /login", () => {
  test("[1] yeni kullanıcı oluşuyor mu", async () => {
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
      user_name: "William",
    };
    //act
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);
    //assert
    expect(actual.status).toBe(400);
  });

  test("[3] login bilgileri hatalı ise giriş yapılıyor mu", async () => {
    const userDataLogin = {
      user_name: "John Doe",
      user_password: "1452",
      user_email: "john@example.com",
      user_id: "4",
    };

    let actual = await request(server)
      .post("/api/auth/login")
      .send(userDataLogin);

    // İsteğin döndürdüğü yanıtın kontrolü
    expect(actual.status).toBe(401);
  });

  test("[4]Get tüm kullanıcılar geliyor mu", async () => {
    // Arrange
    let loginPayload = {
      user_name: "John Doe",
      user_password: "password123",
      user_email: "john@example.com"
    };
    let actual = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    expect(actual.status).toBe(200);
    /// Act
    const response = await request(server)
      .get("/api/auth")
      .set("authorization", actual.body.token);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
describe("Tweets testleri", () => {
    test("[5] Get ile tüm tweetler geliyor mu?", async () => {
       //act
      var loginPayload = {
        user_name: "John Doe",
        user_password: "password123",
        user_email: "john@example.com",
        user_id: "4",
      };
      let actual = await request(server)
        .post("/api/auth/login")
        .send(loginPayload);
      expect(actual.status).toBe(200);
      /// Act
      const response = await request(server)
        .get("/api/users/")
        .set("authorization", actual.body.token);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);

    })
  test("[6] yeni tweet oluşuyor mu", async () => {
    const userDataTweet = {
      img_url:
        "https://www.aydemirlergergitavan.com/wp-content/uploads/2019/05/pembe-1.jpg",
      user_name: "John Doe",
      body: "Who wants to come to the movies with me?",
      user_id: "4",
    };

    let actual = await request(server)
      .post("/api/users/tweets")
      .send(userDataTweet);

    // İsteğin döndürdüğü yanıtın kontrolü
    expect(actual.status).toBe(201);
  });
 })
