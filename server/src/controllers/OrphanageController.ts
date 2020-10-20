import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {
    async index (request: Request, response: Response) {
        try {
            const orphanagesRepository = getRepository(Orphanage);

            const orphanages = await orphanagesRepository.find({
                relations: ['images']
            });
        
            return response.status(200).json(orphanageView.renderMany(orphanages));
        } catch (error) {
            return response.status(400).send({"error": "ERROR: Not possible to retrieve orphanages"});
        }
    },

    async show (request: Request, response: Response) {
        try {
            const { id } = request.params;

            const orphanagesRepository = getRepository(Orphanage);

            const orphanage = await orphanagesRepository.findOneOrFail(id, {
                relations: ['images']
            });
        
            return response.status(200).json(orphanageView.render(orphanage));
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
                open_on_weekends,
                user_id
            } = request.body;

            console.log({
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends,
                user_id
            });

            const orphanagesRepository = getRepository(Orphanage);

            const requestImages = request.files as Express.Multer.File[];
            const images = requestImages.map(image => {
                return { path: image.filename };
            })

            const data = {
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends: open_on_weekends == 'true',
                images,
                user_id
            };

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                latitude: Yup.number().required(),
                longitude: Yup.string().required(),
                about: Yup.string().required().max(300),
                instructions: Yup.string().required(),
                opening_hours: Yup.string().required(),
                open_on_weekends: Yup.boolean().required(),
                images: Yup.array(Yup.object().shape({
                    path: Yup.string().required()
                })),
                user_id: Yup.string().required()
            });

            await schema.validate(data, {
                abortEarly: false
            });

            const orphanage = orphanagesRepository.create();

            await orphanagesRepository.save(data);

            return response.status(201).json(orphanage);

        } catch (error) {
            return response.status(400).json(error);
            // return response.status(400).send({"error": "ERROR: Not possible to create orphanage"});
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