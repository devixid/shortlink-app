/* eslint-disable no-unused-vars */
export interface global {}

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var mongo = {
    connection: null,
    promise: null
  } as {
    connection: any;
    promise: any;
  };

  interface HttpResponse<T> {
    status: "ok" | "error/failed";
    status_code: number;
    error?: string;
    message: string;
    data?: T;
    length?: number;
    query?: {
      limit?: number;
      skip?: number;
    };
  }

  interface AssetPropTypes {
    className?: string;
    title?: string;
  }
}
