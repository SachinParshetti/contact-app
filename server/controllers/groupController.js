import Group from "../models/groups.js";


export const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find({});
        if (groups.length > 0) {
            res.status(200).json(groups);
        } else {
            res.status(404).json({ message: "No Groups Found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getGroupById = async (req, res) => {
    try {
        const group = await Group.findOne({id:parseInt(req.params.id)});
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).json({ message: "Group Not Found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

