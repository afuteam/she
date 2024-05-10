export default {
  myJob: {
    task: ({ strapi }) => {
      console.log('cron task exec')
    },
    options: {
      rule: "10 * * * * ?",
    },
  },
};
