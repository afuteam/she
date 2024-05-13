export default {
  '10 * * * * ?': async ({ strapi }) => { // 10 * * * * ? -> 10s来一次;  '0 0 * * *' ->每天午夜执行
    const t = new Date()
    console.log('cron task exec 10s => ', `${t.getHours()+':'+t.getMinutes()}`)
    // await strapi.service('api::corn.corn').readAllRepoFileAndUpdateDB();
  },
};
