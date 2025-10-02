// import { BaseApiRequest, SignInRequest } from "@/types";
// import { fetchController } from "../fetch-controller";
// import { API_ENDPOINTS } from "../endpoints";

// export const AuthAPI = {
//   verify: async ({ queryString }: BaseApiRequest) => {
//     return await fetchController({
//       method: "GET",
//       endpoint: API_ENDPOINTS.auth.verify,
//       queryString,
//     });
//   },
//   signIn: async ({ queryString, payload }: BaseApiRequest<SignInRequest>) => {
//     return await fetchController({
//       method: "POST",
//       endpoint: API_ENDPOINTS.auth.signIn,
//       body: payload,
//       queryString,
//     });
//   },
//   logout: async ({ queryString }: BaseApiRequest) => {
//     return await fetchController({
//       method: "POST",
//       endpoint: API_ENDPOINTS.auth.logout,
//       queryString,
//     });
//   },
// };
