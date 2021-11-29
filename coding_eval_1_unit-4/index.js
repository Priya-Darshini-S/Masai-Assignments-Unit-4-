/* STORY We are building a job portal company like Naukri and we want to be able to respond to
 following conditions in our apis Write apis that can handle the below cases get all jobs

get all jobs in a particular city which matches a particular skill
find all the jobs that are available as Work from home.
find all the jobs that will accept a notice period of 2 months.
find all jobs by sorting the jobs as per their rating.
an api to get details of the company.
find the company that has the most open jobs.

NOTE :- Approach this by thinking how the queries will run based on requirements 
and then structure your tables and also consider the principles taught.

*/

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const connect =() => {
    return mongoose.connect("mongodb://127.0.0.1:27017/test");
};
const jobSchema = new mongoose.Schema(
    {
      job_title: { type: String, required: true },
      skill: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
const Job = mongoose.model("job", jobSchema);

const companySchema = new mongoose.Schema(
    {
        company_name: {type: String, required: true},
        location: {type: String, required: true},
        openings: {type: Number, required: true},
        company_det: {type: String, required:true},
        job_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "job",
            required: "true",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }

);

const Company = mongoose.model("company", companySchema);

const workSchema = new mongoose.Schema(
    {
        work_type: {type: String, required: true},
        notice_period: {type: String, required: true},
        job_detail_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "company",
            required: "true",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }

);

const Work = mongoose.model("work", workSchema);

//----------------------JOB CRUD-------------------------------------------------------------

app.post("/jobs", async (req, res) => {
    try {
      const job = await Job.create(req.body);
  
      return res.status(201).send(job);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

app.get("/jobs", async (req, res) => {
    try{
        const jobs = await Job.find().lean().exec();
        return res.status(201).send({jobs});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

app.get("/jobs/:id", async (req, res) => {
    try{
        const job = await Job.findById(req.params.id).lean().exec();
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

app.patch("/jobs/:id", async (req, res) => {
    try{
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

app.delete("/jobs/:id", async (req, res) => {
    try{
        const job = await Job.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(job);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})



//-----------------------------Company CRUD-------------------------------------------------

app.post("/companys", async (req, res) => {
    try {
      const company = await Company.create(req.body);
  
      return res.status(201).send(company);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

app.get("/companys", async (req, res) => {
    try{
        const companys = await Company.find().lean().exec();
        return res.status(201).send({companys});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

app.get("/companys/:id", async (req, res) => {
    try{
        const company = await Company.findById(req.params.id).lean().exec();
        return res.status(201).send(company);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

app.patch("/companys/:id", async (req, res) => {
    try{
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(company);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

app.delete("/companys/:id", async (req, res) => {
    try{
        const company = await company.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(company);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

//-----------------------------Work CRUD-------------------------------------------------


app.post("/works", async (req, res) => {
    try {
      const work = await Work.create(req.body);
  
      return res.status(201).send(work);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

app.get("/works", async (req, res) => {
    try{
        const works = await Work.find().lean().exec();
        return res.status(201).send({works});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

app.get("/works/:id", async (req, res) => {
    try{
        const work = await Work.findById(req.params.id).lean().exec();
        return res.status(201).send(work);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

app.patch("/works/:id", async (req, res) => {
    try{
        const work = await Work.findByIdAndUpdate(req.params.id, req.body, {
          new: true,  
        }).lean().exec();
        return res.status(201).send(work);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

app.delete("/works/:id", async (req, res) => {
    try{
        const work = await Work.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(work);
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})



//----------------------------------queries-------------------------------------------------


app.get("/company/:location", async (req, res) => {
    try{
        const companys = await Company.find({location: req.params.location}).populate({path: "job_id", select:"skill"}).lean().exec();
        return res.status(201).send({companys});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});

app.get("/company", async (req, res) => {
    try{
        const companys = await Company.find().lean().exec();
        for(let i=0; i<companys.length; i++){
            return res.status(201).send(companys[i]); 
        }
       // return res.status(201).send({companys});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
});


app.get("/jobs_sort", async (req, res) => {
    try{
        const jobs = await Job.find().sort({rating: 1}).lean().exec();
        return res.status(201).send({jobs});
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"});
    }
})

//find().sort({year: -1, movie_name: 1}).pretty()        

app.listen(3001, async function() {
    await connect();
    console.log("Listening in 3001");
});
