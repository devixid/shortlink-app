import type { NextApiRequest, NextApiResponse } from "next";
import getMetaData from "metadata-scraper";

import connectDB from "@/libs/db";
import { Link } from "@/models";
import { ApiError, SendResponse } from "@/utils";

export default async function getMetadata(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<any>>
) {
  try {
    await connectDB();

    const { slug } = req.query;
    if (!slug) throw new ApiError(400, "'slug' is required");

    const data = await Link.findOne({ "link.slug": slug });
    if (!data) throw new ApiError(404, "Link not found");

    const metadata = await getMetaData(data.link.original_link)
      .then((result) => result)
      .catch(() => null);

    return SendResponse(res, {
      status: "ok",
      status_code: 200,
      message: "Success!",
      data: metadata
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
