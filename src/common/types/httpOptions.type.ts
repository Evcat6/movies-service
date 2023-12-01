import { type ContentType, type HttpMethod } from '../enums/enums';

type HttpOptions = {
  method: HttpMethod;
  payload?: BodyInit | null;
  contentType?: ContentType;
  query?: Record<string, string | number | boolean>;
};

export { type HttpOptions };
