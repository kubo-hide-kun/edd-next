module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator(`next api endpoint`, {
    description: `server配下に新たな next api のエンドポイントを追加します。`,
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '対象のエンドポイントのリソースの名前を入力してください。',
      },
      {
        type: 'input',
        name: 'path',
        message: '対象のエンドポイントのパス(例: "users/[userId]")を入力してください。',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `src/server/handlers/next-api/{{name}}/index.ts`,
        templateFile: `tools/generators/next-api/main.hbs`,
      },
      {
        type: 'add',
        path: `src/pages/api/{{path}}/index.ts`,
        templateFile: `tools/generators/next-api/path.hbs`,
      },
    ],
  });
  ['repositories', 'usecases'].forEach((target) => {
    plop.setGenerator(`server service ${target}`, {
      description: `server配下に新たな ${target} を追加します。`,
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: `対象の ${target} の名前を入力してください。`,
        },
      ],
      actions: [
        {
          type: 'append',
          path: `src/server/application/${target}/index.ts`,
          templateFile: `tools/generators/${target}/import.hbs`,
        },
        {
          type: 'add',
          path: `src/server/application/${target}/{{name}}/index.ts`,
          templateFile: `tools/generators/${target}/main.hbs`,
        },
      ],
    });
  });
};
