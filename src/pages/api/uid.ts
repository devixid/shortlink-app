import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import { SendResponse } from "@/utils";

export default function getUID(
  _: NextApiRequest,
  res: NextApiResponse<HttpResponse<{ uid: string }>>
) {
  return SendResponse(res, {
    status: "ok",
    status_code: 200,
    message: "Success!",
    data: {
      uid: randomUUID()
    }
  });
}
