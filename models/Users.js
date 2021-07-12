const DBConnect = require('../config/BurgerHouse')

const Users = {
  signup: async (email, name, password) => {
    const insertSql = 'INSERT INTO `users`(`user_mail`, `user_name`, `user_password`) VALUES (?,?,?)'
    const value = [email, name, password]
    const [rows] = await DBConnect.promise().execute(insertSql, value)
    return rows
  },
  login: async (email) => {
    const insertSQL = 'SELECT * FROM `users` WHERE user_mail = ?'
    const value = [email]
    const [row] = await DBConnect.promise().execute(insertSQL, value)
    return row
  },

}

module.exports = Users
