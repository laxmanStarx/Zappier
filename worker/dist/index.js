"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
const TOPIC_NAME = "zap-events";
const kafkajs_1 = require("kafkajs");
const parser_1 = require("./parser");
const email_1 = require("./email");
// import { sendSol } from "./solana";
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost: 9092']
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: 'main-worker3' });
        yield consumer.connect();
        const producer = kafka.producer();
        yield producer.connect();
        yield consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
        yield consumer.run({
            autoCommit: false,
            eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g;
                console.log({ partition, offset: message.offset, value: (_a = message.value) === null || _a === void 0 ? void 0 : _a.toString() });
                if (!((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString())) {
                    return;
                }
                const parsedValue = JSON.parse((_c = message.value) === null || _c === void 0 ? void 0 : _c.toString());
                const zapRunId = parsedValue.zapRunId;
                const stage = parsedValue.stage;
                const zapRunDetails = yield prismaClient.zapRun.findFirst({
                    where: {
                        id: zapRunId
                    },
                    include: {
                        zap: {
                            include: {
                                actions: {
                                    include: {
                                        type: true
                                    }
                                }
                            }
                        },
                    }
                });
                const currentAction = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions.find(x => x.sortingOrder === stage);
                if (!currentAction) {
                    console.log("Current action not found?");
                    return;
                }
                console.log(currentAction);
                const zapRunMetadata = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.metadata;
                if (currentAction.type.id === "email") {
                    const body = (0, parser_1.parse)((_d = currentAction.metadata) === null || _d === void 0 ? void 0 : _d.body, zapRunMetadata);
                    const to = (0, parser_1.parse)((_e = currentAction.metadata) === null || _e === void 0 ? void 0 : _e.email, zapRunMetadata);
                    console.log(`Sending out email to ${to} body is ${body}`);
                    yield (0, email_1.sendEmail)(to, body);
                }
                if (currentAction.type.id === "sol") {
                    console.log("Sending an sol");
                    // const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
                    // const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
                    // console.log(`Sending out SOL of ${amount} to address ${address}`);
                    // await sendSol(address, amount);
                }
                yield new Promise(r => setTimeout(r, 5000));
                const zapId = (_f = message.value) === null || _f === void 0 ? void 0 : _f.toString();
                const lastStage = (((_g = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions) === null || _g === void 0 ? void 0 : _g.length) || 1) - 1;
                if (lastStage !== stage) {
                    console.log("pushing back to the queue");
                    yield producer.send({
                        topic: TOPIC_NAME,
                        messages: [{
                                value: JSON.stringify({
                                    stage: stage + 1,
                                    zapRunId
                                })
                            }]
                    });
                }
                console.log("proccesed done");
                yield consumer.commitOffsets([{
                        topic: TOPIC_NAME,
                        partition: partition,
                        offset: (parseInt(message.offset) + 1).toString()
                    }]);
            }),
        });
    });
}
main();
