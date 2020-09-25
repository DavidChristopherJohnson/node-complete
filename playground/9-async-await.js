const add = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) {
            return reject('Inputs must be non negative');
        }

        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

const doWork = async () => {
    const sum = await add(1, 99);
    const sum2 = await add(-3, sum);
    const sum3 = await add(50, sum2);
    return sum3;
};

doWork().then(value => {
    console.log(value);
}).catch(e => {
    console.log('Error:', e);
});

