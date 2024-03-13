# NESTLY Engine

The NESTLY Engine is the server-side component of the NESTLY apartment renting website. It is built using ExpressJS and Apollo Server.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [GraphQL Schema](#graphql-schema)
- [Contributing](#contributing)
- [License](#license)

## Overview

The NESTLY Engine serves as the backend for the apartment renting website. It handles requests from the client, interacts with the database, and implements the business logic of the application.

## Project Structure

The project structure of the NESTLY Engine is as follows:

- **src**: Contains the source code of the NestJS application.
  - **config**: Contains the application configuration (eg. PORT, NODE_ENV, MongoDB URI etc).
  - **graphql**: Contains GraphQL operations for handling client requests.
  - **middlewares**: Contains middlewares for decoding user from token , handling errors etc.
  - **models**: Contains database schemas.
  - **services**: Contains business logic services.
  - **types**: Contains typescript types.
  - **utils**: Contains other app utilities.
  - **start**: Contains app and apollo server initiation logic.

## Getting Started

### Prerequisites

Before running the NESTLY Engine, make sure you have the following installed:

- Node.js
- npm or Yarn
- MongoDB 

### Installation

1. Clone the repository:

`git clone https://github.com/jewtechx/nestly_engine.git`

2. Navigate to the `engine` directory:

`cd nestly_engine/engine`

3. Install dependencies:

`yarn install`

2. Add the following environment variables to the .env file:

```bash
NODE_ENV=development
PORT=8000
DEV_MONGO_URI=
TEST_MONGO_URI=
PROD_MONGO_URI=
TOKEN_EXPIRY=
LOGGER_LEVEL=
DEV_MAIL_USER=
DEV_MAIL_PASS=
DEV_MAIL_HOST=
DEV_MAIL_PORT=
DEV_MAIL_SECURE=

MAIL_USER=
MAIL_PASS=
MAIL_HOST=
MAIL_PORT=
MAIL_SECURE=

PAYSTACK_TEST_SECRET_KEY=
```

## Usage

To start the NESTLY Engine, run the following command:

npm run dev

The engine will start running on the specified port, and you can access the GraphQL endpoint in your browser at `http://localhost:80/graphql`.

## GraphQL Schema

This document provides detailed information about the GraphQL schema used in the NESTLY apartment renting website. It includes descriptions of all queries, mutations, types, and enums available in the schema.

### Queries

#### USER

_user_

Returns a verified user's details, including profile, settings, and rating.

```bash
# Query: user
query {
  user {
    _id
    username
    email
    type
    profile {
      avatar
      firstname
      lastname
      phoneNumber
      address
    }
    rating {
      ratedBy
      criteria
      score
      comment
    }
    settings {
      language
      theme
      notificationEnabled
      soundEnabled
      autoSaveInterval
      profileVisibility
      contactInfoVisibility
      locationSharingEnabled
      activityTrackingEnabled
      dataSharingEnabled
      dataRetentionPeriod
      twoFactorAuthEnabled
      dataEncryptionEnabled
    }
  }
}

```

_getUsersByType_

Returns a list of users grouped by their type (OWNER,RENTER).

```bash
# Query: getUsersByType
query {
  getUsersByType {
    _id
    users {
      _id
      username
      email
      type
      profile {
        avatar
        firstname
        lastname
        phoneNumber
        address
      }
      rating {
        ratedBy
        criteria
        score
        comment
      }
      settings {
        language
        theme
        notificationEnabled
        soundEnabled
        autoSaveInterval
        profileVisibility
        contactInfoVisibility
        locationSharingEnabled
        activityTrackingEnabled
        dataSharingEnabled
        dataRetentionPeriod
        twoFactorAuthEnabled
        dataEncryptionEnabled
      }
    }
  }
}

```

_getRecentUsers_

Returns a list of users who recently registered within the last month.

```bash
# Query: getRecentUsers
query {
  getRecentUsers {
    _id
    username
    email
    type
    profile {
      firstname
      lastname
      phoneNumber
      address
    }
    rating {
      ratedBy
      criteria
      score
      comment
    }
    settings {
      language
      theme
      notificationEnabled
      soundEnabled
      autoSaveInterval
      profileVisibility
      contactInfoVisibility
      locationSharingEnabled
      activityTrackingEnabled
      dataSharingEnabled
      dataRetentionPeriod
      twoFactorAuthEnabled
      dataEncryptionEnabled
    }
  }
}

```

_getAllUsers_

Returns a list of all users, including both verified and unverified users.

```bash
# Query: getAllUsers
query {
  getAllUsers {
    _id
    username
    email
    type
    verified
  }
}

```

_getAllVerifiedUsers_

Returns a list of all verified users.

```bash
# Query: getAllVerifiedUsers
query {
  getAllVerifiedUsers {
    _id
    username
    email
    type
    verified
    profile {
      avatar
      firstname
      lastname
      phoneNumber
      address
    }
    rating {
      ratedBy
      criteria
      score
      comment
    }
    settings {
      language
      theme
      notificationEnabled
      soundEnabled
      autoSaveInterval
      profileVisibility
      contactInfoVisibility
      locationSharingEnabled
      activityTrackingEnabled
      dataSharingEnabled
      dataRetentionPeriod
      twoFactorAuthEnabled
      dataEncryptionEnabled
    }
  }
}

```



#### APARTMENT

_getApartment_

Returns an specific apartment with the provided \_id

```bash
# Query: getApartment
query {
  getApartment(apartmentId: "exampleId") {
    _id
    owner
    name
    description
    location
    bedrooms
    bathrooms
    amenities
    price
    available
    Images
    reviews {
      rating
      comment
    }
  }
}

```

_getAllOwnerApartments_

Returns all apartments that belong to an owner

```bash
# Query: getAllOwnerApartments
query {
  getAllOwnerApartments {
    _id
    owner
    name
    description
    location
    bedrooms
    bathrooms
    amenities
    price
    available
    Images
    reviews {
      rating
      comment
    }
  }
}

```

_getAllApartments_

Returns all apartments based on query inputs

```bash
# Query: getAllApartments
query {
  getAllApartments(GetAllApartmentsInput: { filters: { bedrooms: { eq: 2 }, bathrooms: { gte: 2 }, price: { lte: 1500 } }, sort: { price: 1 }, pagination: { limit: 10, offset: 0 }, search: "exampleSearchString" }) {
    _id
    owner
    name
    description
    location
    bedrooms
    bathrooms
    amenities
    price
    available
    Images
    reviews {
      rating
      comment
    }
  }
}

```

#### BOOKING

_getApartmentBooking_

Returns bookings of an apartment and groups them by status

```bash
  # Query: getApartmentBooking
query {
  getApartmentBooking(GetApartmentBookingInput: { apartment: "exampleApartmentId"}) {
    
      apartment
      startDate
      endDate
      status
      notes
  }
}

```

### Mutations

#### USER

_createUser_

Creates a new unverified user.

```bash
# Mutation: createUser
mutation {
  createUser(CreateUnverifiedUserInput: { username: "example", email: "example@example.com", password: "password", type: RENTER, verified: false }) {
    _id
    username
    email
    type
    verified
  }
}

```

_verifyUser_

Verifies a user using their verification code from email.

```bash
# Mutation: verifyUser
mutation {
  verifyUser(VerifyUserInput: { id: "exampleId", verificationCode: "verificationCode" })
}


```

_createUserSession_

Creates a new user session and returns access and refresh tokens.

```bash
# Mutation: createUserSession
mutation {
  createUserSession(CreateUserSessionInput: { email: "example@example.com" }) {
    accessToken
    refreshToken
  }
}

```

_refreshToken_

Refreshes the access token using the refresh token.

```bash
# Mutation: refreshToken
mutation {
  refreshToken(RefreshTokenInput: { token: "exampleToken" }) {
    accessToken
  }
}

```

_loginUser_

Logs in a user and returns their details, including profile, settings, and rating

```bash
# Mutation: loginUser
mutation {
  loginUser(LoginUserInput: { email: "example@example.com", password: "password" }) {
    _id
    username
    email
    type
    verified
  }
}


```

_updateUser_

Edits user's info but makes the rating open to ulterations by the general users

```bash
# Mutation: updateUser
mutation {
  updateUser(UpdateUserInput: {
    username: "newUsername",
    email: "new@example.com",
    password: "newPassword",
    type: RENTER,
    verificationCode: "newVerificationCode",
    verified: true,
    profile: { firstname: "New", lastname: "User", phoneNumber: "1234567890", address: "New Address" },
    rating: [{ ratedBy: "userId", criteria: "exampleCriteria", score: 5, comment: "Example comment" }],
    settings: {
      language: EN,
      theme: LIGHT,
      notificationEnabled: true,
      soundEnabled: true,
      autoSaveInterval: 10,
      profileVisibility: PUBLIC,
      contactInfoVisibility: PUBLIC,
      locationSharingEnabled: true,
      activityTrackingEnabled: true,
      dataSharingEnabled: true,
      dataRetentionPeriod: 365,
      twoFactorAuthEnabled: true,
      dataEncryptionEnabled: true
    }
  }) {
    _id
    username
    email
    type
    verified
    profile {
      firstname
      lastname
      phoneNumber
      address
    }
    rating {
      ratedBy
      criteria
      score
      comment
    }
    settings {
      language
      theme
      notificationEnabled
      soundEnabled
      autoSaveInterval
      profileVisibility
      contactInfoVisibility
      locationSharingEnabled
      activityTrackingEnabled
      dataSharingEnabled
      dataRetentionPeriod
      twoFactorAuthEnabled
      dataEncryptionEnabled
    }
  }
}

```

_updateProfilePicture_

Updates profile picture of user

```bash
#mutation updateProfilePicture

mutation {
  updateProfilePicture(useId:"6def12d_eef11223.32"){
    avatar
  }
}
```

_deleteUser_

Deletes a user's account and returns a success message

```bash
# Mutation: deleteUser
mutation {
  deleteUser(DeleteUserInput: { id: "exampleId" })
}

```

_forgotPassword_

Initiates the forgot password process by sending a reset link to the user's email.

```bash
# Mutation: forgotPassword
mutation {
  forgotPassword(ForgotPasswordInput: { email: "example@example.com" })
}

```

_resetPassword_

Resets the user's password using the password reset code from email.

```bash
# Mutation: resetPassword
mutation {
  resetPassword(ResetPasswordInput: { id: "exampleId", passwordResetCode: "resetCode", newPassword: "newPassword" })
}
```

#### APARTMENT

_createApartment_

Creates a new apartment and returns details

```bash
# Mutation: createApartment
mutation {
  createApartment(CreateApartmentInput: { name: "New Apartment", description: "Description", location: "Location", bedrooms: 2, bathrooms: 2, amenities: ["Amenity1", "Amenity2"], price: 1500, available: true, reviews: [{ rating: 4, comment: "Example comment" }] }) {
    _id
    owner
    name
    description
    location
    bedrooms
    bathrooms
    amenities
    price
    available
    images{
      path
    }
    reviews {
      rating
      comment
    }
  }
}

```

_uploadImages_

Takes Id of apartment and looks for it images in the standalone file upload server and updates apartment details

```bash
# Mutation: uploadImages

mutation {
  uploadImages(useId:"65d6159b871a42135367ab2e")
}
```

_updateApartment_

Edits an apartment details and returns the result

```bash
# Mutation: updateApartment
mutation {
  updateApartment(UpdateApartmentInput: { name: "Updated Apartment", description: "Updated Description", location: "Updated Location", bedrooms: 3, bathrooms: 3, amenities: ["Updated Amenity1", "Updated Amenity2"], price: 2000, available: false, images: ["image1.jpg", "image2.jpg"], reviews: [{ rating: 5, comment: "Updated comment" }] }) {
    _id
    owner
    name
    description
    location
    bedrooms
    bathrooms
    amenities
    price
    available
    images{
      path
    }
    reviews {
      rating
      comment
    }
  }
}

```

_deleteApartment_

Deletes an apartment post

```bash
# Mutation: deleteApartment
mutation {
  deleteApartment(DeleteApartmentInput: { id: "exampleId" })
}

```

#### BOOKING

_createApartmentBooking_

Creates a new booking and returns the data

```bash
# Query: getApartmentBooking
query {
  getApartmentBooking(GetApartmentBookingInput: { apartment: "exampleApartmentId", pagination: { limit: 10, offset: 0 } }) {
    _id
    bookings {
      apartment
      startDate
      endDate
      status
      notes
    }
  }
}

```

_updateApartmentBooking_

Updates the details of a booking

```bash
 # Mutation: updateApartmentBooking
mutation {
  updateApartmentBooking(UpdateApartmentBookingInput: { bookingId: "exampleBookingId", startDate: "2024-02-20", endDate: "2024-02-25", status: CONFIRMED, notes: "Updated note" }) {
    apartment
    startDate
    endDate
    status
    notes
  }
}

```

_deleteApartmentBooking_

Deletes an apartment booking

```bash
# Mutation: deleteApartmentBooking
mutation {
  deleteApartmentBooking(DeleteApartmentBookingInput: { bookingId: "exampleBookingId" })
}

```
### PAYMENT

_initiateTransaction_

Start payment process and return a checkout url

```bash
# Mutation initiatePayment
mutation {
  initiateTransaction(InitiateTransactionInput: {
    email:"test@gmail.com",
    amount:"100000",
    })
}
```

__verifyTransaction__

verifies the status of the transaction

```bash
# Mutation verifyPayment
mutation {
  verifyTransaction(Reference:"0002385498XX1")
}
```

__makePaymentToOwner__

Transfers 95% of the amount of the rental to the owner of the apartment

```bash
# Mutation makePaymentToOwner
mutation {
  makePaymentToOwner(bookingId:"6ef23bededaad232af",userId:"6ef23bededaad232af2e2")
}
```


## Contributing

Contributions to the NESTLY Engine are welcome! Feel free to open issues or submit pull requests to help improve the engine.

## License

This project is licensed under the MIT License

## Author 
Jew Kofi Larbi Danquah