const event = {
    name: "Birthday Party",
    guestList: ["David", "Peter", "Robert"],
    printGuestList() {
        console.log(`Guests attending ${this.name}`);

        this.guestList.forEach((guest) => {
            console.log(`${guest} is attending ${this.name}`);
        })
    }
}

event.printGuestList();