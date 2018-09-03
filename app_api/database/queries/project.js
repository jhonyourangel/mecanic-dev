var passport = require('passport');
var mongoose = require('mongoose');
var moment = require('moment');
var Project = mongoose.model('project');

const IN_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"

module.exports.getProject = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    console.log("getting all the projects")
    const proj = req.params.project;
    let query = {}
    if (proj !== undefined) {
        query["_id"] = proj
    }

    Project
        .find({})
        .select({
            hash: 0,
            salt: 0
        })
        .then((project) => {
            console.log("project found:", project)
            res.status(200).json(project);
        }).catch((error) => {
            console.log("we have an error while trying to get project")
            console.log(error)
            res.status(500).json({
                msg: "unable to get the project",
                error
            });

        })
};

module.exports.getProjects = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    console.log("getting all the projects")
    Project.find()
        .limit(15)
        .select({
            hash: 0,
            salt: 0
        })
        .exec()
        .then((projects) => {
            //console.log("projects found:", projects)
            res.status(200).json(projects);
        }).catch((error) => {
            console.log("we have an error while trying to get transaction by id:", id)
            console.log(error)
            res.status(500).json({
                msg: "unable to get the transaction",
                error
            });

        })
};

module.exports.postProject = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    const d = req.body
    let newP = new Project()

    newP.name = d.name
    newP.income = d.income

    newP.save().then((savingResposne) => {
        console.log("new transaction saved:", savingResposne)
        res.status(200).json(savingResposne);
    }).catch((error) => {
        console.log("unable to save the transaction. here is the error:", error)
        res.status(500).json({
            msg: "unable to save the trasnsaction",
            error
        });
    })
};

// edit a project
module.exports.putProject = function (req, res) {
    // find all users, get only the name field and limit to 5 users
    const d = req.body

    Project.findByIdAndUpdate(d.id, {
        income: d.income,
        name: d.name
    }).then((savingResposne) => {
        console.log("project has been updated:", savingResposne)
        res.status(200).json({
            msg: "project edited :" + d.id,
            project: savingResposne
        });
    }).catch((error) => {
        console.log("unable to update the project. here is the error:", error)
        res.status(500).json({
            msg: "unable to save the user",
            error
        });
    })
};

module.exports.deleteProject = function (req, res) {
    const d = req.query
    console.log("id to delete", d.id)
    Project.findByIdAndRemove(d.id)
    .then( (project) => {
        console.log(project);
        res.status(200).json({
            msg: "Project deleted :" + d.id,
            project
        });
    })
    .catch((error) => {
        console.log("unable to update the Project. here is the error:", error)
        res.status(500).json({
            msg: "unable to delete the Project",
            error
        });
    })
}