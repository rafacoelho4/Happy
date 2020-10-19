import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

export default {
    async authenticate (request: Request, response: Response) {
        const { email, senha } = request.body;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOneOrFail({email: email});

        if(!user) return response.status(404).send({ error: "User not found" });

        const result = await bcrypt.compare(senha, user.senha, function(err, result) {
            // result == true
            console.log(result);
            return result;
        })

        if(result == false) return response.status(400).send({ error: "Senha inválida" });

        // Crio um token único recebendo três parâmetros:
        // 1: uma coisa única do meu usuário (id)
        // 2: uma coisa única da minha aplicação inteira (hash MD5 gerado manualmente)
        // 3: em quanto tempo o token irá expirar
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            // O token expira em um dia, ou 86400 segundos
            expiresIn: 86400,
        })

        return response.json({ user, token });
    }
}