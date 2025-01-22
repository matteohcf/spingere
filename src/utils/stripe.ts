import _ from 'lodash';

export const mapNetworkQueryParams = (params: any) =>
  _.reduce(
    params,
    (result, value, key) => {
      if (params[key]) {
        if (_.isArray(params[key]) && params[key].length === 0) {
          return result;
        }
        let keyValue;
        if (_.isArray(params[key]) && params[key].length > 0) {
          keyValue = mapNetworkQueryParamsFromArray(key, value);
        } else {
          keyValue = `${key}=${value}`;
          if (key === 'per_page' && !params[key]) {
            return result;
          }
        }
        // means first cicle
        return result === '' ? result.concat(keyValue) : result.concat(`&${keyValue}`);
      } else {
        return result;
      }
    },
    '',
  );

const mapNetworkQueryParamsFromArray = (queryString, values) =>
  _.reduce(
    values,
    (result, v, i) => {
      result += `${queryString}=${v}${i === values.length - 1 ? '' : '&'}`;
      return result;
    },
    '',
  );
