import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';
import userView from '../views/users_view';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import validateEmail from '../utils/validateEmail';

export default {
    async index (request: Request, response: Response) {
        try {
            const usersRepository = getRepository(User);

            const users = await usersRepository.find({
                relations: ['orphanages']
            });
        
            return response.status(200).json(userView.renderMany(users));
        } catch (error) {
            return response.status(400).send(error);
        }
    },

    async show (request: Request, response: Response) {
        try {
            const { id } = request.params;

            const usersRepository = getRepository(User);

            const user = await usersRepository.findOneOrFail(id, {
                relations: ['orphanages']
            });

            // return response.status(200).json(user);
            return response.status(200).send(userView.render(user));

        } catch (error) {
            return response.status(400).send(error);
        }
    },

    async create (request: Request, response: Response) {
        try {
            const { email, senha } = request.body;

            const validation = validateEmail(email);
            if(!validation) return response.status(417).send({ msg: "Email não existe" });

            const saltRounds = 8;
            const hash = await bcrypt.hash(senha, saltRounds);
            const id = crypto.randomBytes(4).toString('hex');

            const usersRepository = getRepository(User);

            const user = usersRepository.create();

            const data = { 
                id, 
                email, 
                senha: hash, 
                orphanages: []
            };

            const token = await jwt.sign({ id: user.id }, authConfig.secret, {
                // O token expira em um dia, ou 86400 segundos
                expiresIn: 86400,
            })

            await usersRepository.save(data);

            return response.status(201).json({id, token: token});
        } catch (error) {
            return response.status(406).send(error);
        }
    },

    async destroy (request: Request, response: Response) {
        try {
            const { id } = request.params;

            const usersRepository = getRepository(User);

            const user = await usersRepository.findOneOrFail(id);

            await usersRepository.delete(id);
            
            return response.status(200).send({"success": "SUCCESS: Orphanage deleted successfully"});
        } catch (error) {
            return response.status(400).send(error);
        }
    },
}