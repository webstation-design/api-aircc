module.exports = (sequelize, DataTypes) => {
    const Spot = sequelize.define('Spot', {
      thumbnail: DataTypes.STRING,
      company: DataTypes.STRING,
      price: DataTypes.INTEGER,
      techs: DataTypes.STRING,
      user: DataTypes.INTEGER,
      thumbnail_url: {
        type: DataTypes.VIRTUAL,
        get () {
          return `http://192.168.15.11:3333/files/${this.thumbnail}`
        }
      }
    })
  
    return Spot;
  }