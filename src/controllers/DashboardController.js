const { Spot } = require('../models');

module.exports = {

    async show(req, res) {

        const { user_id } = req.headers;

        const spots = await Spot.findAll({
            where: {
                user: user_id
            }
        });

        return res.json(spots);

    }

};