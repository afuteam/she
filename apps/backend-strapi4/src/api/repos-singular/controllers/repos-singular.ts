/**
 * repos-singular controller
 */

import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::repos-singular.repos-singular')

export default factories.createCoreController('api::repos-singular.repos-singular', ({ strapi }) => ({

  // 重写前台触发的 post 方法
  // TODO 这里发送的都是 draft状态  如何 publish  ?
  async create(ctx) {

    const data = ctx.request.body.data;

    // 定义一个函数 单个执行是否存在，不存在插入，存在则根据id来更新
    const pickOneByName = async (name) => {
      return strapi.db.query('api::repos-singular.repos-singular').findOne({
        where: {
          name: name
        }
      })
    }

    if(Array.isArray(data)) {
      // 如果数据是数组，则使用 Promise.all 来并行处理所有创建操作
      const allRes = await Promise.all(
        data.map(async item => {
          // item.attributes.publishedAt = new Date()
          const itemInfoFromDB = await pickOneByName(item.name)
          if(!!itemInfoFromDB) {
            strapi.db.query('api::repos-singular.repos-singular').update({where: {id: itemInfoFromDB.id}, data: item});
          } else {
            strapi.db.query('api::repos-singular.repos-singular').create({data: item});
          }
          // await strapi.entityService.publish(itemInfoFromDB, { model: 'api::repos-singular.repos-singular' });
        })
      );
      return allRes;
    } else {
      let response = null
      const itemInfoFromDB = await pickOneByName(data.name);
      if(!!itemInfoFromDB) {
        response = await strapi.db.query('api::repos-singular.repos-singular').update({where: {id: itemInfoFromDB.id}, data});
      } else {
        response = await strapi.db.query('api::repos-singular.repos-singular').create({data});
      }

      return response;
    }


  },

}));
