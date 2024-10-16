import mongoose, { Schema } from "mongoose";
import { config } from "../config/config";

const School  = new Schema({
    educationBoard: { type: String, required: true },

    languageMedium: { type: String, required: true },

    classCategory : { type: String, required: true },

    prePrimaryStandard: { type: String, required: false },
    
    higherStanadard: { type: String, required: false },

    subject: { type: [String], required: false },
})

const College  = new Schema({
    university: { type: String, required: true },

    degreeType: { type: String, required: true },

    departmentType : { type: String, required: true }
})


const CompetitiveExamCenter  = new Schema({
    examType: { type: String, required: true },

    course: { type: String, required: true }
})


const Registration: Schema = new Schema({

    name: { type: String, required: true, unique: true },

    address: { type: String, required: true },

    contactNumber: { type: String, required: true },

    instituteType: { type: String, required: true },

    school: { type: School, required: false },

    college: { type: College, required: false },

    competitiveExam: { type: CompetitiveExamCenter, required: false },
})

export const RegistrationEntity = mongoose.model(config.database.collectionName.registration, Registration)
