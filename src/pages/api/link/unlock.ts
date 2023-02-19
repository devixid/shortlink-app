import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "@/libs/db";
import { Link } from "@/models";
import { ApiError, SendResponse } from "@/utils";
import { createHmac } from "crypto";

interface ResponseData {
  forward_url?: string;
  slug: string;
  is_secret: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<ResponseData>>
) {
  if (req.method?.toUpperCase() === "POST") {
    try {
      await connectDB();

      const { key, slug } = req.body;

      if (!slug) throw new ApiError(400, "'slug' is required");
      if (!key) throw new ApiError(400, "'key' is required");

      const data = await Link.findOne({ "link.slug": slug });

      if (!data) throw new ApiError(404, "Link not found");

      const encryptKey = createHmac(
        "sha512",
        process.env.SECRET_KEY || "secret_key"
      )
        .update(key)
        .digest("hex");

      if (encryptKey !== data.secret_key)
        throw new ApiError(400, "Invalid key");

      const responseData = {
        forward_url: data.link.original_link,
        slug: data.link.slug,
        is_secret: data.is_secret
      };

      return SendResponse(res, {
        status: "ok",
        status_code: 200,
        message: "Success!",
        data: responseData
      });
    } catch (error: any) {
      if (error instanceof ApiError) {
        return SendResponse(res, {
          status: "error/failed",
          status_code: error.statusCode || 500,
          message: error.message || "Internal server error"
        });
      }

      return SendResponse(res, {
        status: "error/failed",
        status_code: 500,
        message: "Internal server error"
      });
    }
  }

  return SendResponse(res, {
    status: "error/failed",
    status_code: 404,
    message: "Endpoint not found!"
  });
}
