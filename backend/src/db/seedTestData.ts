import { db } from "./db.js";
import { v4 as uuidv4 } from "uuid";

// Test user IDs
const user1Id = uuidv4();
const user2Id = uuidv4();
const adminId = uuidv4();

export const seedTestData = async () => {
  // Insert test users
  await db
    .insertInto("users")
    .values([
      {
        id: user1Id,
        email: "user1@gmail.com",
        username: "user1",
        password: "password1",
        admin: 0,
      },
      {
        id: user2Id,
        email: "user2@gmail.com",
        username: "user2",
        password: "password2",
        admin: 0,
      },
      {
        id: adminId,
        email: "admin@gmail.com",
        username: "admin",
        password: "admin",
        admin: 1,
      },
    ])
    .execute();

  // Insert test listings
  await db
    .insertInto("listings")
    .values([
      {
        title: "Novation Peak",
        description:
          "Polyphonic synthesizer, 8 voices. Great condition. Comes with original box.",
        location: "Tampere",
        price: 1200,
        user_id: user1Id,
        listing_type_id: 1,
        listing_category_id: 5,
      },
      {
        title: "Fender Stratocaster",
        description:
          "Looking to buy a Fender Stratocaster. Preferably made in the USA.",
        location: "Helsinki",
        user_id: user2Id,
        listing_type_id: 3,
        listing_category_id: 1,
      },
      {
        title: "Roland TR-808",
        description:
          "Renting classic drum machine for 50€/day. Used but in good working condition. Missing some knobs.",
        location: "Turku",
        user_id: user1Id,
        listing_type_id: 2,
        listing_category_id: 3,
      },
      {
        title: "Yamaha HS8",
        description: "Pair of Yamaha HS8 studio monitors. Great condition.",
        location: "Helsinki",
        price: 400,
        user_id: user1Id,
        listing_type_id: 1,
        listing_category_id: 6,
      },
    ])
    .execute();

  // Insert images for listings
  await db
    .insertInto("listings_images")
    .values([
      {
        url: "https://dt7v1i9vyp3mf.cloudfront.net/styles/news_large/s3/imagelibrary/n/novationpeak03-mYIVlc.PCmP1oLErPB9_NXTYTCB6CPxU.jpg",
        listing_id: 1,
      },
      {
        url: "https://images.equipboard.com/blog_content/novation-peak-in-box.jpg",
        listing_id: 1,
      },
      {
        url: "https://dt7v1i9vyp3mf.cloudfront.net/styles/news_large/s3/imagelibrary/n/novationpeak02-Ti0Q9_Rp1kqNeak7rtpqtWOECddmNE6Q.jpg",
        listing_id: 1,
      },
      {
        url: "https://www.nstuffmusic.com/images/product/large/ae00-59339.jpg",
        listing_id: 2,
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/TR-808_-_MIM%2C_Phoenix_%282019-08-30_14.59.26_by_Bryan_Pocius%29_%28cropped%29.jpg",
        listing_id: 3,
      },
      {
        url: "https://www.vintagesynth.com/sites/default/files/2017-05/roland_tr808.jpg",
        listing_id: 3,
      },
      {
        url: "https://media.rainpos.com/11442/HS8.jpg",
        listing_id: 4,
      },
    ])
    .execute();
};
