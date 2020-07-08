const { Spot } = require('../models');
const { User } = require('../models');
const sequelize = require('sequelize');

module.exports = {

    async index(req, res) {

        const { tech } = req.query;

        const spots = await Spot.findAll({
            where: {
                techs: sequelize.where(sequelize.fn('LOWER', sequelize.col('techs')), 'LIKE', '%' + tech + '%')
            }
        });

        return res.json(spots);

    },

    async store(req, res) {

        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;
        
        const user = await User.findOne({
            where: {
                id: user_id
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Usuario não existe' });
        }

        const spot = await Spot.create({ 
            user: user_id,
            thumbnail: filename,
            company,
            techs,
            price
         });

        return res.json(spot);

    }

};