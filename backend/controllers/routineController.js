const Account = require ("../models/account");
const { RoutineProduct } = require("../models/joinTables");
const Profile = require("../models/profile");
const Routine = require("../models/routine");
const RoutineLog = require("../models/routineLog");

const addRoutine = async (req, res) => {
    // const account = req.account;

    try {
        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Error. Fields are empty."});
        }     
        
        const accountID = req.body.account_id;

        // const getAccount = await Account.findOne({ where: { account_id : account.account_id }, raw: true });
        // const getProfile = await Profile.findOne({ where: { account_id : account_id }, raw: true });

        /** Routine Table */
        const routineName = req.body.routineName;
        //Morning / Night
        const routineType = req.body.routineType;
        const routineStart = req.body.startDate;
        const routineEnd = req.body.endDate;
        //Day of month
        const frequency = req.body.frequency;

        await Routine.create({
            name: routineName, type: routineType, start_date: routineStart,
            end_date: routineEnd, frequency: frequency, profile_id: accountID });

        return res.status(201).json({ message: "Successfully created for Routine."});
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

//this is for linking both
const addProductToRoutine = async (req, res) => {
    try {

        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Error. Fields are empty."});
        }
        
        const routineID = req.body.routineID;
        const productID = req.body.productID;

        const createdRoutineProduct = await RoutineProduct.create({
            product_id: productID, routine_id: routineID
        });

        console.log(createdRoutineProduct);
        
        const routineProductDate = new Date().toJSON().slice(0, 10);
        await RoutineLog.create({
            routine_product_id: createdRoutineProduct.routine_product_id, date: routineProductDate,
            checklist: 0
        });

        return res.status(201).json({ message: "Successfully created a routine product."});
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const getAllRoutineLog = async (req, res) => {
    // const routineLogID = req.params.id;

    try {
        const allRoutineLogs = await RoutineLog.findAll(
            { raw : true
        });

        return res.status(201).json({ message: "Successfully gotten all routine logs.", allRoutineLogs});
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

//this is just to update checklist
const updateRoutineProductLog = async (req, res) => {
    const routineLogID = req.params.id;

    try {
        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Error. Fields are empty."});
        }

        const getProductIDUpdate = req.body.productID;
        const getRoutineIDUpdate = req.body.routineID;

        if (getProductUpdate != undefined && getRoutineIDUpdate != undefined) {
            await RoutineProduct.update({
                product_id: getProductIDUpdate, routineID: getRoutineIDUpdate, checklist: 0
            })
        } else {
            const checked = req.body.checklist;

            await RoutineLog.update(
                { checklist: checked },
                { where: { routine_log_id: routineLogID }
            });
        }
        
        return res.status(201).json({ message: "Successfully updated a routine log."});
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const deleteRoutine = async (req, res) => {
    const routineID = req.params.id;

    try {
        if (req.body === undefined || Object.keys(req.body).length === 0) {
          return res.status(400).json({ message: "Error. Fields are empty."});
        }

        await RoutineLog.destroy(
            { where: { routine_id: routineID }
        });

        return res.status(201).json({ message: "Successfully deleted a routine."});
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

module.exports = { addRoutine, addProductToRoutine, getAllRoutineLog, updateRoutineProductLog, deleteRoutine };