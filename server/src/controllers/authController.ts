import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/User';

export default {
    async authenticate (request: Request, response: Response, next: NextFunction) {

        const { email, senha } = request.body;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({email: email});

        if(!user) return response.status(404).send({ error: "User not found" });

        bcrypt.compare(senha, user.senha, function(err, result) {
            if(result == true) {
                const token = jwt.sign({ id: user.id }, authConfig.secret, {
                    // O token expira em um dia, ou 86400 segundos
                    expiresIn: 86400,
                })
    
                return response.json({ id: user.id, token: token });
            } else {
                return response.status(400).send({ error: "Senha inválida" });
            }
        });
    }
}