import { Request, Response, Router } from 'express';
import { RegistrationService } from '../service/registration.service';
import { validationMiddleware } from '../middleware/validation';
import { RegistrationDto } from '../dto/registration.dto';
import { CustomError } from '../error/error';

const router = Router();
const registrationService = new RegistrationService

router.post('/register', validationMiddleware(RegistrationDto), async (req: Request, res: Response) => {
    try {
        console.info(`Calling a service to add a new registration`)
        const dto: RegistrationDto = req.body;
        const details = await registrationService.addRegistration(dto);
        res.status(201).json(details);
    }
    catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.get('/details', async (req: Request, res: Response) => {
    try {
        console.info(`Calling a service to fetch all the details`)
        const details = await registrationService.getRegistrations();
        res.status(200).json(details);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.get('/details/:name',  async (req: Request, res: Response) => {
    try {
        console.info(`Calling a service to fetch details by name`)
        const name = req.params.name
        const details = await registrationService.getRegistrationById(name);
        res.status(200).json(details);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.patch('/details', async (req: Request, res: Response) => {
    try {
        console.info(`Calling a service to update a existing details`)
        const updateBody: RegistrationDto = req.body
        const details = await registrationService.updateRegistration(updateBody);
        res.status(200).json(details);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.delete('/details/:name', async (req: Request, res: Response) => {
    try {
        console.info(`Calling a service to delete a details`)
        const name = req.params.name
        const details = await registrationService.deleteRegistration(name);
        res.status(200).json(details);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(`Error occured: ${JSON.stringify(error)}`)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

export default router;