import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const getUser = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Utiliser le token depuis l'en-tête Authorization
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            include: {
                cards: {
                    include: {
                        card: true,
                    },
                },
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export { getUser };
