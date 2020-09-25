const greeter = (name = 'anonymous', { age = 100, title = "Person" } = {}) => {
    console.log('Hello ' + name);
    console.log("Age: ", age);
    console.log("Title: ", title);
}

greeter('David', { age: 34, title: "Sofrware Developer" });
console.log('');
greeter();

