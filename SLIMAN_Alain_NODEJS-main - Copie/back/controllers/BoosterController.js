import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const openBooster = async (req, res) => {
    console.log('Request received at /api/open-booster'); // Debug: Log request reception
    console.log('Request headers:', req.headers); // Debug: Log headers
    console.log('Request body:', req.body); // Debug: Log the request body

    const { cards } = req.body;
    const userId = req.userId;

    console.log('User ID:', userId); // Debug: Log the user ID
    console.log('Cards:', cards); // Debug: Log the cards

    if (!cards || !Array.isArray(cards)) {
        console.log('Invalid cards data'); // Debug: Log invalid cards data
        return res.status(400).json({ message: 'Invalid cards data' });
    }

    const cardIds = cards.map(card => card.id);
    console.log('Card IDs:', cardIds); // Debug: Log the card IDs

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        console.log('User found:', user); // Debug: Log the user

        if (!user) {
            console.log('User not found'); // Debug: Log user not found
            return res.status(404).json({ message: 'User not found' });
        }

        // Vérifiez et ajoutez les cartes à la table Card si elles n'existent pas déjà
        for (const card of cards) {
            await prisma.card.upsert({
                where: { id: card.id },
                update: {},
                create: {
                    id: card.id,
                    name: card.name,
                    imageUrl: card.image
                },
            });
        }

        const existingCards = await prisma.card.findMany({
            where: {
                id: { in: cardIds },
            },
        });

        const existingCardIds = existingCards.map(card => card.id);
        console.log('Existing Card IDs:', existingCardIds); // Debug: Log existing card IDs

        for (const cardId of existingCardIds) {
            console.log('Adding card with ID:', cardId); // Debug: Log each card ID
            await prisma.userCards.create({
                data: {
                    userId: userId,
                    cardId: cardId,
                },
            });
        }

        console.log('Cards added successfully');
        return res.status(200).json({ message: 'Cards added successfully' });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export { openBooster };

