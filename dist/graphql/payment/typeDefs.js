"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const typeDefs = (0, graphql_tag_1.default) `
    scalar JSON

    input InitiateTransactionInput {
        email:String!
        amount:String!
        currency:String
        channels:JSON
        reference:String!
        callback_url:String!
        metadata:JSON!
    }

    type Mutation {
        initiateTransaction(InitiateTransactionInput:InitiateTransactionInput!): JSON
        verifyTransaction(Reference: String!): JSON
        makePaymentToOwner(bookingId:ID!):JSON
    }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map