import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
    async index (request: Request, response: Response) {
        try {
            const orphanagesRepository = getRepository(Orphanage);

            const orphanages = await orphanagesRepository.find();
        
            return response.status(200).json(orphanages);
        } catch (error) {
            return response.status(400).send({"error": "ERROR: Not possible to retrieve orphanages"});
        }
    },

    async show (request: Request, response: Response) {
        try {
            const { id } = request.params;

            const orphanagesRepository = getRepository(Orphanage);

            const orphanage = await orphanagesRepository.findOneOrFail(id);
        
            return response.status(200).json(orphanage);
        } catch (error) {
            return response.status(400).send({"error": "ERROR: Not possible to retrieve this specific orphanage"});
        }
    },

    async create (request: Request, response: Response) {
        try {
            const {
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends
            } = request.body;
    
            const orphanagesRepository = getRepository(Orphanage);
    
            const orphanage = orphanagesRepository.create({
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends
            });

            await orphanagesRepository.save(orphanage);

            return response.status(201).send({"success": "SUCCESS: Orphanage created successfully"});

        } catch (error) {
            return response.status(400).send({"error": "ERROR: Not possible to create orphanage"});
        }
    },

    async destroy (request: Request, response: Response) {
        try {
            const { id } = request.params;

            const orphanagesRepository = getRepository(Orphanage);

            const orphanage = await orphanagesRepository.findOneOrFail(id);

            await orphanagesRepository.delete(id);
        
            return response.status(200).send({"success": "SUCCESS: Orphanage deleted successfully"});
        } catch (error) {
            return response.status(400).send({"error": "ERROR: Not possible to delete orphanage"});
        }
    },
}