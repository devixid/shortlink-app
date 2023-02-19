import type { CookieValueTypes } from "cookies-next";
import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import { Cookie } from "@/helpers";
import { SendResponse } from "@/utils";

export default function getUID(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<{ uid: string | CookieValueTypes }>>
) {
  if (Cookie.has("uid", { req, res })) {
    return SendResponse(res, {
      status: "ok",
      status_code: 200,
      message: "Success",
      data: {
        uid: Cookie.getOne("uid", { req, res })
      }
    });
  }

  Cookie.set("uid", randomUUID(), {
    req,
    res
  });

  return SendResponse(res, {
    status: "ok",
    status_code: 200,
    message: "Success!",
    data: {
      uid: randomUUID()
    }
  });
}
