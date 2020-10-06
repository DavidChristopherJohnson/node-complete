const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOne, userTwo, setupDatabase, taskOne, taskTwo } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'First test task',
        })
        .expect(201);

    const task = Task.findById(response.body._id);
    expect(task).not.toBeNull();

    expect(response.body).toMatchObject({
        description: 'First test task',
        completed: false,
    });
});

test('Should get all tasks for user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0]).toMatchObject({
        description: taskOne.description,
        completed: taskOne.completed
    });
    expect(response.body[1]).toMatchObject({
        description: taskTwo.description,
        completed: taskTwo.completed
    });
})


test('Should delete task for incorrect user', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);

    const task = await Task.findById(taskTwo._id);
    expect(task).not.toBeNull();
})