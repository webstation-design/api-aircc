module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      date: DataTypes.STRING,
      approved: DataTypes.BOOLEAN,
      user: DataTypes.INTEGER,
      spot: DataTypes.INTEGER,
      Spot: {
        type: DataTypes.VIRTUAL
      },
      User: {
        type: DataTypes.VIRTUAL
      }
    });
  
    return Booking;
  }