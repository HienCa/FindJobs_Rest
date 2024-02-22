const Job = require('../models/Job');

module.exports = {

    createJob: async (req, res) => {
        const newJob = new Job(req.body);

        try {
            const createdJob = await newJob.save();
            const { __v, createdAt, updatedAt, ...newJobInfo } = createdJob._doc;

            res.status(200).json(newJobInfo);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateJob: async (req, res) => {

        try {
            const updatedJob = await Job.findByIdAndUpdate(
                req.params.id, {
                $set: req.body
            }, { new: true }
            );
            const { password, __v, createdAt, updatedAt, ...jobData } = updatedJob._doc

            res.status(200).json(jobData);
        } catch (error) {
            res.status(500).json(error);
        }

    },
    deleteJob: async (req, res) => {
        try {
            await Job.findByIdAndDelete(req.params.id)

            res.status(200).json("Job Success Delete.");

        } catch (error) {
            res.status(500).json(error);
        }
    }
    ,
    getJob: async (req, res) => {
        try {
            const job = await Job.findById(req.params.id)
            const { password, __v, createdAt, updatedAt, ...jobData } = job._doc

            res.status(200).json(jobData);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllJob: async (req, res) => {
        try {
            const jobs = await Job.find();
            console.log(jobs);
            res.status(200).json(jobs);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchJobs: async (req, res) => {
        try {
            const jobs = await Job.aggregate(
                [
                    {
                        $search: {
                            index: "jobsearch",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            );
            console.log(jobs);
            res.status(200).json(jobs);

        } catch (error) {
            res.status(500).json(error);
        }
    }

}
