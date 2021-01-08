export const generateCommandInvoker = ({
  invoker,
  cbFunctionName,
}: {
  invoker: string;
  cbFunctionName: string;
}): string => {
  const output = `
bot.command(${invoker}, ${cbFunctionName})
  `;
  return output;
};
