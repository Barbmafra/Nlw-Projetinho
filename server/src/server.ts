import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHourStringtoMinutes } from './utils/convert-hour-to-minutes'
import { convertMinutestoHoursString } from './utils/convert-minutes-to-hours'

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
})

//localhost:1456/ads
app.get("/games", async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
            select: {
                ads: true,
            },
            },
        },
    });
    return response.json(games);
    });

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body : any = request.body;

    //validação -> zod biblioteca

    const ad = await prisma.ad.create({
        data: {
            gameId, 
            name: body.name,
            weekDays: body.weekDays.join(','),
            discord: body.discord,
            useVoiceChannel: body.useVoiceChannel,
            yearsPlaying: body.yearsPlaying,
            hourStart: convertHourStringtoMinutes(body.hourStart),
            hourEnd: convertHourStringtoMinutes(body.hourEnd)
        }
    })

    return response.status(201).json(ad);
});


app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd:  true,
        },
        where: {
            gameId : gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad => {
        return{
            ...ad,
            weekDays:ad.weekDays.split(','),
            hourStart: convertMinutestoHoursString(ad.hourStart),
            hourEnd: convertMinutestoHoursString(ad.hourEnd)
        }
    }))
});


app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord,
    })
})

app.listen(2222)
