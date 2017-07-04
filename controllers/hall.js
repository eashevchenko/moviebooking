const Hall = require('../model/hall');
const Cinema = require('../model/cinema');
const {getDefaultValues} = require('../helpers/appHelper');
const {initMessageObj, messages} = require('../helpers/messageHelper');

module.exports = {

    getHalls: async (req, res, next) => {
        try {
            const halls = await Hall.find({}).sort({ title: 'desc' });
            res.status(200).json(halls);
        } catch (err) {
            next(err);
        }
    },

    getHallsByPagination: async (req, res, next) => {
        try {

            const {page, limit, sort} = req.query;

            const pageRes = parseInt(page) ||  getDefaultValues.defaultPage;
            const limitRes = parseInt(limit) || getDefaultValues.defaultLimit;
            const sortRes = sort || getDefaultValues.defaultSort;

            const skipRes = (pageRes * limitRes) - limitRes;
            const paginatedHalls = await Hall.find({}).skip(skipRes).limit(limitRes).sort({ title: sortRes });
            res.status(200).json(paginatedHalls);
        } catch (err) {
            next(err);
        }
    },

    getHallById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const hall = await Hall.findById(id);

            if(!hall) {
                return res.status(404).json(initMessageObj(messages.hallNotFoundMessage));
            }

            res.status(200).json(hall);
        } catch (err) {
            next(err);
        }
    },

    getHallByTitle: async (req, res, next) => {
        try {
            const {title} = req.body;
            const hall = await Hall.find({
               title: title
            });

            hall ? res.status(200).json(hall)
                 : res.status(404).json(initMessageObj(messages.hallNotFoundMessage));
        } catch (err) {
            next(err);
        }
    },

    getHallCinema: async (req, res, next) => {
        try {
            const {id} = req.params;
            const options = {
              path: 'cinema',
              select: {'title': 1, 'address': 1}
            };

            const hallCinema = await Hall.findById(id).populate(options);

            if(!hallCinema) {
                return  res.status(404).json(initMessageObj(messages.cinemaNotFoundMessage));
            }

            res.status(200).json(hallCinema.cinema);
        } catch (err) {
            next(err);
        }
    },

    createHallByCinema: async (req, res, next) => {
        try {
            const {id} = req.params;
            const cinema = await Cinema.findById(id);

            if(!cinema) return res.status(404).json(initMessageObj(messages.cinemaNotFoundMessage));

            const hall = new Hall(req.body);

            hall.cinema = cinema._id;

            await hall.save();

            cinema.halls.push(hall);

            await cinema.save();

            res.status(201).json(hall);
        } catch (err) {
            next(err);
        }
    }
};