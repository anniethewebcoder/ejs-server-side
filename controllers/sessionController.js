const User = require("../models/User")
const parseVErr = require("../util/parseValidationErrors")

const registerShow = async (req, res) => {
    res.render("REGISTER")
}


const registerDo = async (req, res, next) => {
    if(req.body.password !== req.body.password1) {
        req.flash("error", "The passwords entered do not match.")
        
        return res.render("register", {
            errors: flash("errors")
        })
    }

    try {
        await User.create(req.body)
    } catch(error) {
        if(error.constructor.name === "ValidationError") {
            parseVErr(error, req)
        } else if(error.name === "MongoServerError" && error.code === 11000) {
            req.flash("error", "That email address is already registered.")
        } else {
            return next(error)
        }

        return res.render("register", {
            errors: flash("errors")
        })
    }

    res.redirect("/")
}

const logoff = (req, res) => {
    req.session.destry(function(error) {
        if(err) {
            console.log(error)
        }

        res.redirect("/")
    })
}

const logonShow = (req, res) => {
    if(req.user) {
        return res.redirect("/")
    }

    res.render("logon")
}

module.exports = {
    registerShow,
    registerDo,
    logoff,
    logonShow
}