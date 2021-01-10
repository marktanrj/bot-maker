//clear message after clicking button
export const delMiddleware = `
exports.deleteCtxMessage = (ctx, next) => {
  ctx.deleteMessage()
  next()
}\n
    `;
