var passport = require('passport');
var mongoose = require('mongoose');
var moment = require('moment');
var Transaction = mongoose.model('transaction');
var Project = mongoose.model('project');

const IN_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"

module.exports.getTransactions = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    console.log("getting all the transactions")
    const transac = req.params.transaction;
    
    let query = {}
    if (transac !== undefined) {
        query["_id"] = transac
    } else {
        query["startTime"] = req.query.startTime !== undefined ? {
            "$gte": new Date(req.query.startTime)
        } : {
            "$gte": new Date(`2000-01-01 00:00:00`) //moment(`2000-01-01 00:00:00`, IN_DATE_FORMAT).toDate()
        }

        const endTime = new Date();
        endTime.setDate(endTime.getDate() + 1);
        query["endTime"] = req.query.endTime !== undefined ? {
            "$lte": new Date(req.query.endTime)
        } : {
            "$lte": endTime
        }
    }

    console.log(query)
    Transaction
        .find(query)
        .sort({
            startTime: "-1"
        })
        .exec()
        .then((transactions) => {
            // console.log("transactions found:", transactions)
            res.status(200).json(transactions);
        }).catch((error) => {
            console.log("we have an error while trying to get transactions")
            console.log(error)
            res.status(500).json({
                msg: "unable to get the transactions",
                error
            });

        })
};

module.exports.getTransaction = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    console.log("getting all the transactions")
    const id = req.params.transaction.toObjectId()
    console.log(id)
    var query = Transaction.find({
            id: id
        })
        .limit(15)
        .sort({
            startTime: "1"
        })
        .exec()
        .then((transactions) => {
            // console.log("transactions found:", transactions)
            res.status(200).json(transactions);
        }).catch((error) => {
            console.log("we have an error while trying to get transaction by id:", id)
            console.log(error)
            res.status(500).json({
                msg: "unable to get the transaction",
                error
            });

        })
};

module.exports.postTransaction = function (req, res) {

    const d = req.body
    let newT = new Transaction()

    newT.creationDate = new Date()
    newT.editDate = new Date()
    newT.description = d.description
    newT.billed = false
    newT.startTime = moment(d.startTime, IN_DATE_FORMAT).toDate()
    newT.endTime = moment(d.endTime, IN_DATE_FORMAT).toDate()

    newT.userId = d.userId
    newT.projectName = d.projectName

    newT.save().then((savingResposne) => {
        // console.log("new transaction saved:", savingResposne)
        res.status(200).json(savingResposne);
    }).catch((error) => {
        console.log("unable to save the transaction. here is the error:", error)
        res.status(500).json({
            msg: "unable to save the trasnsaction",
            error
        });
    })
};

// edit a transaction
module.exports.putTransaction = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    const d = req.body

    // some may send without undescore
    d.id = d.id || d._id

    // some clients send the 1 for true and 0 for false
    if (d.billed === "1" || d.billed === "0") {
        console.log("modifying the billed");
        d.billed === "1" ? true : false;
    }

    console.log(d);
    // console.log(Date(moment(d.startTime, IN_DATE_FORMAT).toDate()))
    // console.log(Date(moment(d.endTime, IN_DATE_FORMAT).toDate()))
    console.log(d.startTime, '::', moment(d.startTime, IN_DATE_FORMAT).utc().toDate())
    console.log(d.endTime, "::", moment(d.endTime, IN_DATE_FORMAT).utc().toDate())
    console.log("new Date()", new Date(), "::", moment(new Date(), IN_DATE_FORMAT).toDate())

    Transaction.findByIdAndUpdate({_id: d.id}, {
        editDate: new Date(),
        description: d.description,
        billed: d.billed,
        startTime: moment(d.startTime, IN_DATE_FORMAT).toDate(),
        endTime: moment(d.endTime, IN_DATE_FORMAT).toDate(),
        projectName: d.projectName
    }).then((savingResposne) => {
        // console.log("transaction has been updated:", savingResposne)
        res.status(200).json({
            msg: "transaction edited :" + d.id,
            transaction: savingResposne
        });
    }).catch((error) => {
        console.log("unable to update the transaction. here is the error:", error)
        res.status(500).json({
            msg: "unable to update the transaction",
            error
        });
    })
};

// 5a816995c05308001928b909
module.exports.deleteTransactions = function (req, res) {
    const d = req.query
    console.log(d)
    Transaction.findByIdAndRemove(d.id)
        .then((deleteResponse) => {
            // console.log(deleteResponse);
            res.status(200).json({
                msg: "transaction deleted :" + d.id,
                deleteResponse
            });
        })
        .catch((error) => {
            console.log("unable to update the transaction. here is the error:", error)
            res.status(500).json({
                msg: "unable to delete the transaction",
                error
            });
        })
}