
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

async function main() {
    await prismaClient.availableTrigger.create({
        data: {
            id: "webhook",
            name: "Webhook",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
            
        }
    })    

    await prismaClient.availableAction.create({
        data: {
            id: "sol",
            name: "Send Solana",
            image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/solana_logo.jpeg.jpg"
        }
    })

    await prismaClient.availableAction.create({
        data: {
            id: "email",
            name: "Send Email",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s"
        }
    })
    
}

main();