const { Booking } = require('../models');
const { Spot } = require('../models');
const { User } = require('../models');

module.exports = {
    
    async store(req, res) {

        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;
        
        const booking = await Booking.create({ 
            user: user_id,
            spot: spot_id,
            date,
        });
        
        // await booking.populate('spot').populate('user').execPopulate();

        const spot = await Spot.findOne({
            where: {
                id: spot_id
            }
        });

        const user = await User.findOne({
            where: {
                id: user_id
            }
        });

        booking.Spot = spot;
        booking.User = user;

        const ownerSocket = req.connectedUsers[spot.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        console.log(ownerSocket);

        return res.json(booking);

    }

}