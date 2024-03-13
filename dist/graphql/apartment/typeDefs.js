"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const typeDefs = (0, graphql_tag_1.default) `
  extend type Query {
    getApartment(apartmentId: ID!): Apartment
    getAllOwnerApartments: [Apartment]
    getAllApartments(GetAllApartmentsInput: GetAllApartmentsInput): [Apartment]
  }

  type Image {
    useId:ID!
    filename:String!
    path:String!
  }

  type Apartment {
    _id: ID!
    owner: ID!
    name: String!
    description: String!
    location: String!
    bedrooms: Int!
    bathrooms: Int!
    amenities: [String]!
    price: Float!
    available: Boolean!
    images: [Image]
    reviews: [ApartmentReviews]
  }

  type ApartmentReviews {
    rating: Int!
    comment: String!
  }

  input ApartmentReviewsInput {
    rating: Int!
    comment: String!
  }

  input FilterOperatorsIntInput {
    ne: Int
    gt: Int
    eq: Int
    gte: Int
    lt: Int
    lte: Int
  }

  input FiltersInput {
    bedrooms: FilterOperatorsIntInput
    bathrooms: FilterOperatorsIntInput
    price: FilterOperatorsIntInput
  }

  input SortInput {
    price: Int
    bedrooms: Int
  }

  input PaginationInput {
    limit: Int
    offset: Int
  }

  input GetAllApartmentsInput {
    filters: FiltersInput
    sort: SortInput
    pagination: PaginationInput
    search: String
  }

  input UpdateApartmentInput {
    name: String
    description: String
    location: String
    bedrooms: Int
    bathrooms: Int
    amenities: [String]
    price: Float
    available: Boolean
    reviews: [ApartmentReviewsInput]
  }

  input CreateApartmentInput {
    name: String!
    description: String!
    location: String!
    bedrooms: Int!
    bathrooms: Int!
    amenities: [String]!
    price: Float!
    available: Boolean!
    reviews: [ApartmentReviewsInput]
  }

  input DeleteApartmentInput {
    id: ID!
  }

  scalar Date

  extend type Mutation {
    createApartment(CreateApartmentInput: CreateApartmentInput!): Apartment
    uploadImages(useId:ID!): String
    updateApartment(UpdateApartmentInput: UpdateApartmentInput!): Apartment
    deleteApartment(DeleteApartmentInput: DeleteApartmentInput!): String
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map