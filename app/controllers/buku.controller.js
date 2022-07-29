const db = require("../models");
const { Kategori, Buku } = db.tables;
const Op = db.Sequelize.Op;

// Create and Save a new kategori
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a kategori
    const buku = {
        name: req.body.name,
        kategoris_id: req.body.kategoris_id,
        // description: req.body.description,
        // published: req.body.published ? req.body.published : false
    };
    // Save kategori in the database
    Buku.create(buku)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Buku."
            });
        });
};

// Retrieve all kategoris from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Buku.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving kategoris."
            });
        });
};

// Find a single kategori with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Buku.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find kategori with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving kategori with id=" + id
            });
        });
};

// Update a kategori by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Buku.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "kategori was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update kategori with id=${id}. Maybe kategori was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating kategori with id=" + id
            });
        });
};

// Delete a kategori with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Buku.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "kategori was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete kategori with id=${id}. Maybe kategori was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete kategori with id=" + id
            });
        });
};

// Delete all kategoris from the database.
exports.deleteAll = (req, res) => {
    Buku.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} kategoris were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all kategoris."
            });
        });
};

// Find all published kategoris
exports.findAllByGroup = (req, res) => {
    Buku.findAll({ include: { model: db.tables.Kategori, attributes: ['nama'], required: true }, group: 'name' })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving kategoris."
            });
        });
};