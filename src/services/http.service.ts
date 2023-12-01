import { ENV } from '../common/config/env.config';
import { ContentType, HttpHeader, HttpMethod } from '../common/enums/enums';
import { HttpError } from '../common/exceptions/exceptions';
import { HttpApiResponse, HttpOptions } from '../common/types/types';

class Http {
  public load(url: string, options: HttpOptions): Promise<HttpApiResponse> {
    const {
      method = HttpMethod.GET,
      payload = null,
      contentType = ContentType.APPLICATION_JSON,
      query,
    } = options;
    const headers = this.getHeaders({
      contentType,
    });

    return fetch(this.getUrl(url, query), {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus.bind(this))
      .catch(this.throwError.bind(this)) as Promise<HttpApiResponse>;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException = await response.json().catch(() => ({
        message: response.statusText,
      }));

      throw new HttpError({
        status: response.status,
        message: parsedException?.message,
      });
    }

    return response;
  }

  private getHeaders({ contentType }: { contentType: ContentType }): Headers {
    const headers = new Headers();

    headers.append(HttpHeader.CONTENT_TYPE, contentType);

    headers.append(HttpHeader.AUTHORIZATION, `Bearer ${ENV.API.TOKEN}`);

    return headers;
  }

  private getUrl(
    url: string,
    query?: Record<string, string | number | boolean>
  ): string {
    return `${url}${query ? '?' + this.getQuery(query) : ''}`;
  }

  private getQuery(query: Record<string, string | number | boolean>): string {
    return Object.keys(query)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join('&');
  }

  private throwError(error: unknown): void {
    throw error;
  }
}

export { Http };
