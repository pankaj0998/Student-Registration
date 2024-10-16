import { RegistrationDto } from "src/dto/registration.dto";
import { RegistrationRepository } from "../repository/registration.repository";


export class RegistrationService {
    private registrationRepository: RegistrationRepository;
    constructor() {
        this.registrationRepository = new RegistrationRepository();
    }

    async addRegistration(addRegistrationDto: RegistrationDto) {
        console.info(`[RegistrationService:addRegistration]: Adding a new Registration`)
        return await this.registrationRepository.createRegistration(addRegistrationDto)
    }

    async getRegistrations() {
        console.info(`[RegistrationService:getRegistrations]: Fetching all the Registrations`)
        return await this.registrationRepository.getAllRegistrationDetails()
    }

    async getRegistrationById(name: string) {
        console.info(`[RegistrationService:getRegistrationById]: Fetching a Registration for name: ${name}`)
        return await this.registrationRepository.getDetailsById(name)
    }

    async updateRegistration(updateRegistrationDto: RegistrationDto) {
        console.info(`[RegistrationService:updateRegistration]: Updating a Registration for name ${updateRegistrationDto.name}`)
        return await this.registrationRepository.updateDetails(updateRegistrationDto)
    }

    async deleteRegistration(name: string) {
        console.info(`[RegistrationService:deleteRegistration]: Deleting a Registration for name: ${name}`)
        return await this.registrationRepository.deleteDetails(name)
    }
}