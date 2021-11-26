"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.inputParameters = exports.endpointResultPaths = exports.supportedEndpoints = void 0;
const ea_bootstrap_1 = require("@chainlink/ea-bootstrap");
//import { NAME as AdapterName } from "../config";
// This should be filled in with a lowercase name corresponding to the API endpoint
exports.supportedEndpoints = ["price"];
exports.endpointResultPaths = {
    example: "price",
};
const customError = (data) => data.Response === "Error";
exports.inputParameters = {
    base: ["base", "from", "coin"],
    quote: ["quote", "to", "market"],
    resultPath: false,
};
const execute = async (request, _, config) => {
    const validator = new ea_bootstrap_1.Validator(request, exports.inputParameters);
    if (validator.error)
        throw validator.error;
    const jobRunID = validator.validated.id;
    // const base = validator.overrideSymbol(AdapterName);
    // const quote = validator.validated.data.quote;
    const url = `price`;
    //const resultPath = validator.validated.data.resultPath;
    const fsym = validator.validated.data.base.toUpperCase();
    const tsyms = validator.validated.data.quote.toUpperCase();
    const params = {
        fsym,
        tsyms,
        api_key: config.apiKey,
    };
    const options = { ...config.api, params, url };
    const response = await ea_bootstrap_1.Requester.request(options, customError);
    const result = ea_bootstrap_1.Requester.validateResultNumber(response.data, [tsyms]);
    return ea_bootstrap_1.Requester.success(jobRunID, ea_bootstrap_1.Requester.withResult(response, result), config.verbose);
};
exports.execute = execute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludC9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUErRDtBQUUvRCxrREFBa0Q7QUFFbEQsbUZBQW1GO0FBQ3RFLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUvQixRQUFBLG1CQUFtQixHQUFHO0lBQ2pDLE9BQU8sRUFBRSxPQUFPO0NBQ2pCLENBQUM7QUFRRixNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUM7QUFFaEQsUUFBQSxlQUFlLEdBQW9CO0lBQzlDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQzlCLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDO0lBQ2hDLFVBQVUsRUFBRSxLQUFLO0NBQ2xCLENBQUM7QUFFSyxNQUFNLE9BQU8sR0FBOEIsS0FBSyxFQUNyRCxPQUFPLEVBQ1AsQ0FBQyxFQUNELE1BQU0sRUFDTixFQUFFO0lBQ0YsTUFBTSxTQUFTLEdBQUcsSUFBSSx3QkFBUyxDQUFDLE9BQU8sRUFBRSx1QkFBZSxDQUFDLENBQUM7SUFDMUQsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztJQUUzQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUN4QyxzREFBc0Q7SUFDdEQsZ0RBQWdEO0lBQ2hELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUNwQix5REFBeUQ7SUFDekQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUUzRCxNQUFNLE1BQU0sR0FBRztRQUNiLElBQUk7UUFDSixLQUFLO1FBQ0wsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNO0tBQ3ZCLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFFL0MsTUFBTSxRQUFRLEdBQUcsTUFBTSx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDL0QsTUFBTSxNQUFNLEdBQUcsd0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUV0RSxPQUFPLHdCQUFTLENBQUMsT0FBTyxDQUN0QixRQUFRLEVBQ1Isd0JBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUN0QyxNQUFNLENBQUMsT0FBTyxDQUNmLENBQUM7QUFDSixDQUFDLENBQUM7QUFoQ1csUUFBQSxPQUFPLFdBZ0NsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RlciwgVmFsaWRhdG9yIH0gZnJvbSBcIkBjaGFpbmxpbmsvZWEtYm9vdHN0cmFwXCI7XG5pbXBvcnQgeyBDb25maWcsIEV4ZWN1dGVXaXRoQ29uZmlnLCBJbnB1dFBhcmFtZXRlcnMgfSBmcm9tIFwiQGNoYWlubGluay90eXBlc1wiO1xuLy9pbXBvcnQgeyBOQU1FIGFzIEFkYXB0ZXJOYW1lIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuXG4vLyBUaGlzIHNob3VsZCBiZSBmaWxsZWQgaW4gd2l0aCBhIGxvd2VyY2FzZSBuYW1lIGNvcnJlc3BvbmRpbmcgdG8gdGhlIEFQSSBlbmRwb2ludFxuZXhwb3J0IGNvbnN0IHN1cHBvcnRlZEVuZHBvaW50cyA9IFtcInByaWNlXCJdO1xuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRSZXN1bHRQYXRocyA9IHtcbiAgZXhhbXBsZTogXCJwcmljZVwiLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBSZXNwb25zZVNjaGVtYSB7XG4gIGRhdGE6IHtcbiAgICAvLyBTb21lIGRhdGFcbiAgfTtcbn1cblxuY29uc3QgY3VzdG9tRXJyb3IgPSAoZGF0YTogYW55KSA9PiBkYXRhLlJlc3BvbnNlID09PSBcIkVycm9yXCI7XG5cbmV4cG9ydCBjb25zdCBpbnB1dFBhcmFtZXRlcnM6IElucHV0UGFyYW1ldGVycyA9IHtcbiAgYmFzZTogW1wiYmFzZVwiLCBcImZyb21cIiwgXCJjb2luXCJdLFxuICBxdW90ZTogW1wicXVvdGVcIiwgXCJ0b1wiLCBcIm1hcmtldFwiXSxcbiAgcmVzdWx0UGF0aDogZmFsc2UsXG59O1xuXG5leHBvcnQgY29uc3QgZXhlY3V0ZTogRXhlY3V0ZVdpdGhDb25maWc8Q29uZmlnPiA9IGFzeW5jIChcbiAgcmVxdWVzdCxcbiAgXyxcbiAgY29uZmlnXG4pID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcihyZXF1ZXN0LCBpbnB1dFBhcmFtZXRlcnMpO1xuICBpZiAodmFsaWRhdG9yLmVycm9yKSB0aHJvdyB2YWxpZGF0b3IuZXJyb3I7XG5cbiAgY29uc3Qgam9iUnVuSUQgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmlkO1xuICAvLyBjb25zdCBiYXNlID0gdmFsaWRhdG9yLm92ZXJyaWRlU3ltYm9sKEFkYXB0ZXJOYW1lKTtcbiAgLy8gY29uc3QgcXVvdGUgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucXVvdGU7XG4gIGNvbnN0IHVybCA9IGBwcmljZWA7XG4gIC8vY29uc3QgcmVzdWx0UGF0aCA9IHZhbGlkYXRvci52YWxpZGF0ZWQuZGF0YS5yZXN1bHRQYXRoO1xuICBjb25zdCBmc3ltID0gdmFsaWRhdG9yLnZhbGlkYXRlZC5kYXRhLmJhc2UudG9VcHBlckNhc2UoKTtcbiAgY29uc3QgdHN5bXMgPSB2YWxpZGF0b3IudmFsaWRhdGVkLmRhdGEucXVvdGUudG9VcHBlckNhc2UoKTtcblxuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgZnN5bSxcbiAgICB0c3ltcyxcbiAgICBhcGlfa2V5OiBjb25maWcuYXBpS2V5LFxuICB9O1xuXG4gIGNvbnN0IG9wdGlvbnMgPSB7IC4uLmNvbmZpZy5hcGksIHBhcmFtcywgdXJsIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBSZXF1ZXN0ZXIucmVxdWVzdChvcHRpb25zLCBjdXN0b21FcnJvcik7XG4gIGNvbnN0IHJlc3VsdCA9IFJlcXVlc3Rlci52YWxpZGF0ZVJlc3VsdE51bWJlcihyZXNwb25zZS5kYXRhLCBbdHN5bXNdKTtcblxuICByZXR1cm4gUmVxdWVzdGVyLnN1Y2Nlc3MoXG4gICAgam9iUnVuSUQsXG4gICAgUmVxdWVzdGVyLndpdGhSZXN1bHQocmVzcG9uc2UsIHJlc3VsdCksXG4gICAgY29uZmlnLnZlcmJvc2VcbiAgKTtcbn07XG4iXX0=