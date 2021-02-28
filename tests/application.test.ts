import dotenv from "dotenv";
dotenv.config({path: './test.env'});
import supertest from "supertest";
import app from '../src/app';
import {Request, Response, NextFunction} from 'express';
import {requestSanitizer} from "../src/config/globalMiddleware";
import {ApplicationModel} from "../src/models/ApplicationModel";
import "../src/services/rpa";
import '../src/services/queueing/consumer'
import {createToken} from "../src/services/databaseServices";


jest.mock("../src/services/rpa");
jest.mock("../src/services/queueing/producer",() => {
    return {
        default: jest.fn(),
        createChannel: jest.fn()
    }
});
jest.mock("../src/services/queueing/consumer");

describe('Application Submission Tests', () => {
    const applicationSubmissionRoute = `/forms/frontier/applications`;
    const confirmationRoute = (confirmationToken) => `/forms/frontier/applications/confirm/${confirmationToken}`

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('Should return Status 200 when there is no error', async () => {

        const response = await supertest(app)
            .post(applicationSubmissionRoute)
            .send({
                fullname: "test",
                lastname: "test",
                phoneno: "1234567",
                email: "email@example.com",
                location: "Accra",
                linkedin: "LinkedIN",
                resume: "link"
            })

        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({message: "Success"})
    })

    it("Should return 422 error status with message when key fields are missing", async () => {
        const response = await supertest(app)
            .post(applicationSubmissionRoute)
            .send({
                fullname: "test",
                lastname: "test",
                phoneno: "1234567",
                email: "email@example.com",
                location: "Accra",
                linkedin: "LinkedIN",
            })

        expect(response.status).toEqual(422);

        expect(response.body).toMatchObject({
            message: "Field 'resume' is missing from request body",
            status: 'error'
        })
    })

    it("Should remove unwanted fields from request body", () => {
        let mockRequest: Partial<Request> = {
            body: {
                firstname: "test",
                lastname: "test",
                phone: "1234567",
                location: "Accra",
                email: "email@example.com",
                linkedin: "LinkedIN",
                resume: "resume",
                extra: "extraField"
            },
            method: 'POST'
        };
        let mockResponse: Partial<Response>;
        let nextFunction: NextFunction = jest.fn();

        requestSanitizer(ApplicationModel)(mockRequest as Request, mockResponse as Response,nextFunction);
        expect(Object.keys(ApplicationModel)).toEqual(expect.arrayContaining(Object.keys(mockRequest.body)))
        expect(nextFunction).toHaveBeenCalled();
    })

    it('Should return token as json when confirmation route is accessed', async () => {
        const token = await createToken();

        const response = await supertest(app).get(confirmationRoute(token.payload));

        expect(response.status).toEqual(200);

        expect(response.body).toMatchObject({
            status: token.status,
            payload: token.payload
        });
    })
})