"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("../config"));
const app_1 = tslib_1.__importDefault(require("../types/app"));
const axios_1 = tslib_1.__importDefault(require("axios"));
class PaymentService extends app_1.default {
    constructor(props) {
        super(props);
        this.endpoint = 'https://api.paystack.co';
    }
    initiateTransaction(InitiateTransactionInput, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authenticate_user(userId);
            const { email } = InitiateTransactionInput;
            if (user.email !== email) {
                throw new Error('Wrong user');
            }
            try {
                const response = yield (0, axios_1.default)({
                    method: 'post',
                    url: `${this.endpoint}/transaction/initialize`,
                    headers: {
                        'Authorization': `Bearer ${config_1.default.paystack.secret_key}`
                    },
                    data: InitiateTransactionInput
                });
                return response.data;
            }
            catch (e) {
                throw new Error(`Failed to initialize transaction: ${e}`);
            }
        });
    }
    verifyTransaction(Reference, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authenticate_user(userId);
            try {
                const response = yield (0, axios_1.default)({
                    method: 'get',
                    url: `${this.endpoint}/transaction/verify/${Reference}`,
                    headers: {
                        'Authorization': `Bearer ${config_1.default.paystack.secret_key}`
                    }
                });
                const bookingId = response.data.data.metadata.bookingId;
                const transactionId = response.data.data.id;
                const reference = response.data.data.reference;
                const status = response.data.status;
                const main_status = response.data.data.status;
                const amount = response.data.data.amount;
                const startDate = response.data.data.paid_at;
                const booking = yield this.authenticate_booking(bookingId);
                if (status && main_status && booking) {
                    yield booking.updateOne({
                        $set: {
                            status: "CONFIRMED",
                            transactionId,
                            reference,
                            amount,
                            startDate,
                        }
                    });
                }
                else if (!status && !main_status) {
                    yield booking.updateOne({
                        $set: {
                            status: "REJECTED"
                        }
                    });
                }
                yield booking.save();
                const { data } = response;
                return { data, booking };
            }
            catch (e) {
                throw new Error(`Failed to verify transaction: ${e}`);
            }
        });
    }
    makePaymentToOwner(bookingId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authenticate_user(userId);
            const booking = yield this.authenticate_booking(bookingId);
            const { apartment } = booking;
            const _apartment = yield this.authenticate_apartment(apartment);
            const { owner } = _apartment;
            const _owner = yield this.models.User.findById(owner);
            if (!_owner) {
                throw new Error('Owner not found');
            }
            // making owner a transfer recipient to recieve payments
            try {
                const { profile, ownerPayment } = _owner;
                const response = yield (0, axios_1.default)({
                    method: 'post',
                    url: `${this.endpoint}/transferrecipient`,
                    headers: {
                        'Authorization': `Bearer ${config_1.default.paystack.secret_key}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "type": "ghipss",
                        "name": `${profile.firstname} ${profile.lastname}`,
                        "account_number": `${ownerPayment.accountNumber}`,
                        "bank_code": `${ownerPayment.bankCode}`,
                        "currency": "GHS"
                    }
                });
                //making transfer
                const recipient_code = response.data.data.recipient_code;
                const { amount } = booking;
                const data = {
                    "source": "balance",
                    "reason": "recieving payment for apartment",
                    "amount": ((95 / 100) * Number(amount)),
                    "recipient": recipient_code
                };
                const _response = yield (0, axios_1.default)({
                    method: 'post',
                    url: `${this.endpoint}/transfer`,
                    headers: {
                        'Authorization': `Bearer ${config_1.default.paystack.secret_key}`,
                        'Content-Type': 'application/json'
                    },
                    data: data
                });
                return _response.data;
            }
            catch (e) {
                throw new Error(`Error paying owner of apartment: ${e}`);
            }
        });
    }
}
exports.default = PaymentService;
//# sourceMappingURL=payment.js.map