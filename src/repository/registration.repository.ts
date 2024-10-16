
import { RegistrationEntity } from "../entity/registration.entity";
import { RegistrationDto } from "../dto/registration.dto";
import { CustomError } from "../error/error";


export class RegistrationRepository {
    async createRegistration(registrationDto: RegistrationDto) {
        try {
            console.info(`[RegistrationRepository: createRegistration]: Creating new Registration`)
            const details = await RegistrationEntity.findOne({ name: registrationDto.name }).lean().exec()
            if (details) {
                const error = new CustomError('Details already exists', 409);
                throw error;
            }
            console.info(`[RegistrationRepository: createRegistration]: Adding new Registration`)
            let result = new RegistrationEntity(registrationDto);
            result= await result.save();
            if (result) {
                return {
                    message: 'Registration Added Successfully',
                    data: result
                }
            }
        } catch (error) {
            console.error(`[RegistrationRepository: createRegistration]: Error occurred while add the Registration`)
            throw error;
        }
    }

    async getAllRegistrationDetails() {
        try {
            console.info(`[RegistrationRepository: getAllRegistrationDetails]: Finding all registration list`)
            const result = await RegistrationEntity.find({}, { _id: 0, __v: 0 }).exec()
            if (!result || result.length === 0) {
                const error = new CustomError('Registrations Not Found', 404)
                throw error
            }
            return {
                message: 'Registration details fetched',
                data: result
            }
        } catch (error) {
            console.error(`[RegistrationRepository]: Error occurred while fetching the details`)
            throw error
        }
    }

    async getDetailsById(name: string) {
        try {
            console.info(`[RegistrationRepository:getDetailsById]: Finding location by id`)
            const result = await RegistrationEntity.findOne({ name: name }, { _id: 0, __v: 0 }).exec()
            if (!result) {
                const error = new CustomError('Details Not Found', 404)
                throw error
            }
            return {
                message: `Details Fetched for Name: ${name}`,
                data: result
            }
        } catch (error) {
            console.error(`[RegistrationRepository: getDetailsById]: Error occurred while fetching the details`)
            throw error
        }
    }

    async updateDetails(updateDto: RegistrationDto) {
        try {
            console.info(`[RegistrationRepository:updateDetails]: Updating a details for name: ${updateDto.name}`)
            const result = await RegistrationEntity.findOneAndUpdate({ name: updateDto.name }, { $set: updateDto }, { new: true, override: true,upsert: true }).exec()
            if (!result) {
                const error = new CustomError('Details Not Updated', 404)
                throw error
            }
            return {
                message: `Details Updated for name: ${updateDto.name}`,
                data: result
            }
        } catch (error) {
            console.error(`[RegistrationRepository]: Error occurred while updating the details`)
            throw error
        }
    }

    async deleteDetails(name: string) {
        try {
            console.info(`[RegistrationRepository:deleteDetails]: Deleting a details for name: ${name}`)
            const result = await RegistrationEntity.findOneAndDelete({ name: name }).exec()
            if (!result) {
                const error = new CustomError('Details Not Found', 404)
                throw error
            }
            return {
                message: `Details Deleted for name: ${name}`,
                data: result
            }
        } catch (error) {
            console.error(`[RegistrationRepository]: Error occurred while deleting the details`)
            throw error
        }
    }
}