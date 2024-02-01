const {get_profile_from_acc_id} = require('../../controllers/profileController')
const Profile = require("../../models/profile")
// const Account = require("../../models/Account")

const { expect, test} = require('@jest/globals')
jest.mock("../../models/profile")
// jest.mock("../../models/profile")


const res = {
    status : jest.fn((x) => x),
    json: jest.fn((x) => x)
}


test('return 400 when no such profile found', async() => {
    const req = {
        params : {
            id : 2,
        }
    };


    Profile.findOne.mockImplementationOnce(() => null);

    await get_profile_from_acc_id(req,res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledTimes(1)
})