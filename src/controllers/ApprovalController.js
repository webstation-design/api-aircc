const { Booking } = require('../models');
const { Spot } = require('../models');
const { User } = require('../models');

module.exports = {
    
    async store(req, res) {

        const { booking_id } = req.params;

        const booking = await Booking.findOne({
            where: {
                id: booking_id
            }
        });

        const spot = await Spot.findOne({
            where: {
                id: booking.spot
            }
        });

        const user = await User.findOne({
            where: {
                id: booking.user
            }
        });

        booking.approved = true;

        await booking.save();

        booking.Spot = spot;
        booking.User = user;

        const bookingUserSocket = req.connectedUsers[booking.user];

        if (bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }

};