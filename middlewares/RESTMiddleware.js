const bodyParser = require('body-parser');

const multer = require('multer');
const storage = multer.memoryStorage();

module.exports = {
    init: (app) => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.use(multer({storage: storage}).any());
    }
};
