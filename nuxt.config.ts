// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: ['@nuxt/eslint'],
    eslint: {
        config: {
            stylistic: true
        }
    },
    runtimeConfig: {
        droneGithubClientSecret: process.env.DRONE_GITHUB_CLIENT_SECRET,
        droneRpcSecret: process.env.DRONE_RPC_SECRET,
        droneUserCreate: process.env.DRONE_USER_CREATE,

        public: {
            droneGithubServer: process.env.DRONE_GITHUB_SERVER,
            droneGithubClientId: process.env.DRONE_GITHUB_CLIENT_ID,
            droneServerHost: process.env.DRONE_SERVER_HOST,
            droneServerProto: process.env.DRONE_SERVER_PROTO,
            droneRpcProto: process.env.DRONE_RPC_PROTO,
            droneRpcHost: process.env.DRONE_RPC_HOST,
            droneRunnerCapacity: process.env.DRONE_RUNNER_CAPACITY,
        }
    }
})