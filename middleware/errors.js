const handleValidationErrors = (error, response) => {
    const errors = Object.values(error.errors).map(element => element.message);
    if (error.length > 1) {
        const errorMessages = errors.join(" || ")
        response.status(400).send({msg: errorMessages})
    } else {
        response.status(400).send({msg: errors});
    };
};

const handleTypeError = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        handleValidationErrors(error, response);
    } else {
        response.status(500).send('There was a problem')
    }
};

module.exports = {handleTypeError};