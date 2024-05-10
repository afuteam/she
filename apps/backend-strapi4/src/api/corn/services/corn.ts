/**
 * corn service
 */

import { factories } from '@strapi/strapi';
const fs = require('fs/promises');
const path = require('path');

export default factories.createCoreService('api::corn.corn', ({ strapi }) => ({
  // 读取绝对路径的 allrepos ，写入数据库
  async readAllRepoFileAndUpdateDB() {
    const isExistById = async (id) => {
      return strapi.db.query('api::repos-singular.repos-singular').findOne({
        where: {
          id_self: id,
        },
      });
    };

    try {
      // 指定文件路径
      const filePath = path.resolve(process.env.ALL_REPOS_PATH_ABSOLUTE);

      // 读取文件内容
      const data = await fs.readFile(filePath, { encoding: 'utf8' });

      // 将文件内容转换为需要的格式
      const records = JSON.parse(data);

      if (Array.isArray(records)) {
        await Promise.all(
          records.map(async (record) => {
            const {
              id,
              description,
              name,
              name_with_namespace,
              path,
              path_with_namespace,
              created_at,
              default_branch,
              ssh_url_to_repo,
              http_url_to_repo,
              web_url,
              last_activity_at,
              creator_id,
            } = record;
            const data = {
              id_self: id,
              description,
              name,
              name_with_namespace,
              path,
              path_with_namespace,
              created_at_self: created_at,
              default_branch,
              ssh_url_to_repo,
              http_url_to_repo,
              web_url,
              last_activity_at,
              creator_id,
            };

            const isExist = await isExistById(id);

            if (!!isExist) {
              const data1 = {
                ...data,
                updatedAt: new Date(),
              };
              strapi.db
                .query('api::repos-singular.repos-singular')
                .update({ where: { id_self: id }, data: data1 });
            } else {
              const data1 = {
                ...data,
                publishedAt: new Date(),
              };
              strapi.db
                .query('api::repos-singular.repos-singular')
                .create({ data: data1 });
            }

          })
        );
        console.log('File processed and database updated.');
      }

    } catch (err) {
      console.error('Error processing file: ', err);
    }
  },
}));
