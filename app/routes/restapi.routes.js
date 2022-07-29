module.exports = app => {
    const kategori = require("../controllers/kategori.controller.js");
    const buku = require("../controllers/buku.controller.js");
    var router = require("express").Router();

    //kategori
    router.post("/kategori", kategori.create);
    router.get("/kategori", kategori.findAll);
    router.get("/kategori/:id", kategori.findOne);
    router.put("/kategori/:id", kategori.update);
    router.delete("/kategori/:id", kategori.delete);
    router.delete("/kategori", kategori.deleteAll);

    //buku
    router.post("/buku", buku.create);
    router.get("/buku", buku.findAll);
    router.get("/buku/group", buku.findAllByGroup);
    router.get("/buku/:id", buku.findOne);
    router.put("/buku/:id", buku.update);
    router.delete("/buku/:id", buku.delete);
    router.delete("/buku/", buku.deleteAll);

    app.use('/restapi/', router);
};