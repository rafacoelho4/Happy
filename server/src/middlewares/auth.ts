import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default (request: Request, response:Response, next: NextFunction) => {
    // Recebendo no meu header o meu "authorization"
    const authHeader = request.headers.authorization;

    // Se não existir, retorna erro
    if (!authHeader) return response.status(401).send({ error: "Token não informado" });

    // O authorization deve vir no formato "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2MDAxMzc3MTMsImV4cCI6MTYwMDIyNDExM30.pls4iMk5TPv25rvlaAGJAbpAnBGhuFQ1_uWV4lTjuog
    // Aqui estou separando em duas strings pelo espaço
    const parts = authHeader.split(' ');

    // Se não vier exatamente duas strings separadas por um espaço, retorno erro
    if (!(parts.length === 2)) return response.status(401).send({ error: "Faltando ou sobrando elementos" });

    // Desestruturação: estou pegando o "Bearer" e colocando numa variável scheme, e o token no token
    const [ scheme, token ] = parts;

    // Rejex - Verificando se a palavra "Bearer" está em scheme
    if (!/^Bearer$/i.test(scheme)) {
        return response.status(401).send({ error: "Erro na formatação" });
    }

    // Verificando se o meu token foi gerado pela minha chave única, minha secret
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return response.status(401).send({ error: "Token inválido" });

        // request.userId = decoded.id;
        // next() faz pular pro controller
        return next();
    })
}