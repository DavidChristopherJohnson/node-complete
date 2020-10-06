const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'David',
        email: 'lasher.dcj@gmail.com',
        password: 'MyPass1234'
    }).expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assert the properties in the body
    expect(response.body).toMatchObject({
        user: {
            name: 'David',
            email: 'lasher.dcj@gmail.com'
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe('MyPass1234');

});

test('Should log in existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(user).not.toBeNull();

    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should fail log in non existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'i@dont.exist',
        password: 'badpassword'
    }).expect(400);
});

test('Should fail log in existing user with bad password', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'badpassword'
    }).expect(400);
});
test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('Should not get profile for user when it is unauthorised', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer something else')
        .send()
        .expect(401)
});

test('Should delete an authenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(204);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
})

test('Should not delete a user who is not authenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send('Authorization', 'something else')
        .expect(401);

    const user = await User.findById(userOneId);
    expect(user).not.toBeNull();
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', './tests/fixtures/profile-pic.jpg')
        .expect(204);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Dewsbury'
        }).expect(400);

    const user = await User.findById(userOneId);
    expect(user).not.toBeNull();

    expect(user).toMatchObject({
        name: userOne.name,
        email: userOne.email,
        age: 0
    });

    expect(user.location).toBeUndefined();
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `something else`)
        .send({
            name: 'Paul',
            email: 'paul@example.here',
            age: 99
        }).expect(401);

    const user = await User.findById(userOneId);

    expect(user).not.toBeNull();
    expect(user).toMatchObject({
        name: userOne.name,
        email: userOne.email,
        age: 0
    });
})

test('Should not update unauthed user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `something else`)
        .send({
            name: 'Paul',
            email: 'paul@example.here',
            age: 99
        }).expect(401);

    const user = await User.findById(userOneId);

    expect(user).not.toBeNull();
    expect(user).toMatchObject({
        name: userOne.name,
        email: userOne.email,
        age: 0
    });
})