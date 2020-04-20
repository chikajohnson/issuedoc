const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

const User = require('../db/models/user');
const { setupDb: setupDB } = require('./init/dbsetup');

setupDB(process.env.DB_TEST, true);

it('Should signup a user', async done => {
    const res = await request.post('/api/v1/auth/signup')
        .send({
            firstName: "Jones",
            lastName: "Emeka",
            email: "chikamadu@gmail.com",
            phoneNumber: "0898283832",
            dateOfBirth: "2009-12-12",
            placeOfBirth: "Ipaja",
            parish: "St Ferdinand, Boys Town",
            gender: "male",
            password: "!pass4sure",
            confirmPassword: "!pass4sure"
        });

    const { data: response } = res.body
    // Ensures response contains name and email
    expect(response.firstName).toBeTruthy()
    expect(response.email).toBeTruthy()

    // fetch created user
    const user = await User.findOne({ email: response.email })
    expect(user.firstName).toBeTruthy();
    expect(user.email).toBeTruthy();

    done()
})