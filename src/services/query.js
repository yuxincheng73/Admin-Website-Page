export const query = () => {
  const queryStr = window.location.href.split('?')[1];
  const query = {};
  const queryArr = queryStr && queryStr.split('&').forEach((q) => {
    const splitValue = q.split('=');
    query[splitValue[0]] = splitValue[1];
  });
}