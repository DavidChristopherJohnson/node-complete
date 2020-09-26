const validUpdates = (keys, allowedFields) => keys.every(key => allowedFields.includes(key));

const sendResponseOrNotFound = (item, res, successStatus = 200) => {
    if (!item) {
        return res.status(404).send();
    }

    switch (successStatus) {
        case 204:
            return res.status(204).send();
        default:
            return res.status(successStatus).send(item);
    }
}

module.exports = [validUpdates, sendResponseOrNotFound];