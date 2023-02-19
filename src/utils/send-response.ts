import { NextApiResponse } from "next";

export default function SendResponse<T>(
  res: NextApiResponse<HttpResponse<T>>,
  { status, status_code, message, data, error, length, query }: HttpResponse<T>
) {
  return res.status(status_code).json({
    status,
    status_code,
    message,
    data,
    error,
    length,
    query
  } as HttpResponse<T>);
}
