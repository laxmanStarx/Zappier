
const TOPIC_NAME = "zap-events"

import {Kafka} from 'kafkajs';

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost: 9092']
})



async function main(){
    const consumer = kafka.consumer({groupId: 'main-worker3'})
        await consumer.connect()

        await consumer.subscribe({topic: TOPIC_NAME, fromBeginning: true})

        await consumer.run({
            autoCommit: false,
            eachMessage: async({topic,partition,message})=>{
                console.log({partition, offset: message.offset,value: message.value.toString()})
                await new Promise(r => setTimeout(r, 5000))
                console.log("proccesed done")

                await consumer.commitOffsets([{
                    topic: TOPIC_NAME,
                    partition: partition,
                    offset: (parseInt(message.offset) + 1).toString()
                }])
            },
        })

  
    
}

main()