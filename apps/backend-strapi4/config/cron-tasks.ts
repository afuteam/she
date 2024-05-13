export default {
  '30 * * * * ?': async ({ strapi }) => { // 30 * * * * ? -> 30s来一次;  '0 0 * * *' ->每天午夜执行
    const t = new Date()
    console.log('cron task exec 10s => ', `${t.getHours()+':'+t.getMinutes()}`)
    await strapi.service('api::corn.corn').readAllRepoFileAndUpdateDB();
  },
};
