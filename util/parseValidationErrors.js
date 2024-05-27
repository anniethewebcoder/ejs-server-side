const parseValidationErrors = (error, req) => {
    const keys = Object.keys(error.errors)

    keys.forEach((key) => {
        req.flash("error", key + ": " + error.errors[key].properties.message)
    })
}

module.exports = parseValidationErrors