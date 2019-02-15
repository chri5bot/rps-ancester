// eslint-disable-next-line import/prefer-default-export
export const isAuthedResolver = resolver => (
  obj,
  args,
  context,
) => {
  if (!context.user) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return resolver(obj, args, context);
};
