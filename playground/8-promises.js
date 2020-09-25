//Promise example
// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([4, 4, 6]);
//     },
//         2000);
// });

// doWorkPromise.then((result) => console.log("Success: ", result))
//     .catch((error) => console.log("Error: ", error));

//Nested Promise
// const add = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a + b);
//         }, 2000);
//     });
// };

// add(1, 2).then((sum) => {
//     console.log(sum)

//     add(sum, 5).then((sum2) => {
//         console.log(sum2);
//     }).catch(e => {
//         console.log(e);
//     })
// }).catch(e => {
//     console.log(e);
// });

//Promise Chaining
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

add(1, 1).then(sum => {
    console.log(sum);

    return add(sum, 7);
}).then(sum => {
    console.log(sum);
}).catch(e => {
    console.log(e);
})