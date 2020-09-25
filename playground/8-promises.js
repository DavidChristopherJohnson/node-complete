const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([4, 4, 6]);
    },
        2000);
});

doWorkPromise.then((result) => console.log("Success: ", result))
    .catch((error) => console.log("Error: ", error));