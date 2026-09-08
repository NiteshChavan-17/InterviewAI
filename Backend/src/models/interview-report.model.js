import mongoose from 'mongoose';

const technicalQuestionsSchema = new mongoose.Schema({

    question: {
        type:String,
        required:[true,"question is required"]
    },

    intention: {
        type:String,
        required:[true,"Intention is required"]
    },

    answer: {
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
})

const BehavioralQuestionsSchema = new mongoose.Schema({

    question: {
        type:String,
        required:[true,"question is required"]
    },

    intention: {
        type:String,
        required:[true,"Intention is required"]
    },

    answer: {
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
});

const SkillGapsSchema = new mongoose.Schema({

    skill: {
        type:String,
        required:[true, "Skill is Required"]
    },

    severity: {
        type:String,
        enum: ["low", "medium", "high"],
        required:[true,"severity is required"]
    }
}, {
    _id:false
});

const PreparationPlanSchema = new mongoose.Schema({
    day: {
        type:Number,
        required:[true,"Day is required"]
    },

    focus: {
        type:String,
        required:[true,"Focus is required"]
    },

    tasks: [{
        type:String,
        required:[true,"Task is required"]
    }]
})


const interviewReportSchema = new mongoose.Schema({

    jobDescription:{
        type:String,
        required:[true, "Job Description is Required"],
    },

    resume:{
        type:String
    },

    selfDescription: {
        type:String,
    },

    matchScore: {
        type: Number,
        min:0,
        max:100
    },

    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [BehavioralQuestionsSchema],
    skillGaps: [SkillGapsSchema],
    preparationPlan: [PreparationPlanSchema],
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    title: {
        type:String,
        required:[true,"Title is Required"]
    }

}, {
    timestamps:true
})

export const InterviewReport = mongoose.model("InterviewReport",interviewReportSchema);