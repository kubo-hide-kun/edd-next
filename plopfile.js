module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
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
