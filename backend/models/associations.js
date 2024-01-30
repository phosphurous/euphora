const Account = require('./account');
const Profile = require('./profile')

const initAssociations = () => {
    Account.hasOne(Profile, {foreignKey: 'account_id'})
    Profile.belongsTo(Account, {foreignKey: 'account_id'})
}


module.exports = initAssociations;