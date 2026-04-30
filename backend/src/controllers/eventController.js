const Event = require("../models/Event");
const redis = require("../config/redis");

exports.getEvents = async (req, res) => {
    try{
        const cache = await redis.get("events");
        if(cache){
            console.log("serving from cache");
            return res.json(JSON.parse(cache));
        }
        const events  = await Event.find();
        await redis.setEx("events", 60, JSON.stringify(events));
        res.json(events);
    }
    catch(err){
        res.status(500).json({message: "server error", error: err.message});
    }
};

exports.createEvent = async(req, res) => {
    try{
        const { title, description } = req.body;
        const event  = await Event.create({
            title,
            description,
            createdBy: req.user.email
        });
        await redis.del("events");
        res.status(201).json(event);
    }catch(err){
        res.status(500).json({message: "server error", error: err.message});
    }
};
