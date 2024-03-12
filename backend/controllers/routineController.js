const Account = require ("../models/account");
const { RoutineProduct } = require("../models/joinTables");
const Profile = require("../models/profile");
const Routine = require("../models/routine");
const RoutineLog = require("../models/routineLog");

const addRoutine = async (req) => {
    
    const accountID = req.body.accountID;

    const getProfile = await Profile.findOne({ where: { account_id : accountID }, raw: true });

    /** Routine Table */
    const routineName = "default_" + Date.now();
    //Morning / Night
    const routineType = req.body.routineType;
    const routineStart = req.body.startDate;
    const routineEnd = req.body.endDate;
    //Day of month
    const frequency = req.body.frequency;

    const createdRoutineObj = await Routine.create({
        name: routineName, type: routineType, start_date: routineStart,
        end_date: routineEnd, frequency: frequency, profile_id: getProfile.profile_id });

    return createdRoutineObj;
}

//this is for linking both
const addProductToRoutine = async (routineID, productID) => {
    try {
        const createdRoutineProduct = await RoutineProduct.create({
            product_id: productID, routine_id: routineID
        });

        const routineProductDate = new Date().toJSON().slice(0, 10);
        await RoutineLog.create({
            routine_product_id: createdRoutineProduct.routine_product_id, date: routineProductDate,
            checklist: 0
        });

        return true;

    } catch (err) {
        console.log(err);
        return false;
    }
}

const addAdditionalProductToRoutine = async (req, res) => {
    try {

        const routineID = req.body.routineID;
        const productID = req.body.productID;

        for (const eachProdID of productID) {
            const createdRoutineProduct = await RoutineProduct.create({
                routine_id: routineID,
                product_id: eachProdID
            });

            const routineProductDate = new Date().toJSON().slice(0, 10);
            await RoutineLog.create({
                routine_product_id: createdRoutineProduct.routine_product_id, date: routineProductDate,
                checklist: 0
            });
        }

        return res.status(201).json({ message: "Successfully added each product to routine." });

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

module.exports = { addRoutine, addProductToRoutine, addAdditionalProductToRoutine, getAllRoutineLog, updateRoutineProductLog, deleteRoutine };